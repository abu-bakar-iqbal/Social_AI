import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Chat interface for AI interaction
function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { text: input, sender: 'user' }]);

    try {
      // Send message to backend
      const res = await axios.post('http://localhost:5000/chat', { message: input }, { withCredentials: true });
      setMessages([...messages, { text: input, sender: 'user' }, { text: res.data.reply, sender: 'bot' }]);
    } catch (error) {
      setMessages([...messages, { text: input, sender: 'user' }, { text: 'Error processing request', sender: 'bot' }]);
    }

    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`my-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Send
        </button>
      </div>
      <Link to="/dashboard" className="p-4 text-blue-500 hover:underline">
        Go to Dashboard
      </Link>
    </div>
  );
}

export default Chat;