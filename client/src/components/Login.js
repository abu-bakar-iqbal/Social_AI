import React from 'react';
import { Link } from 'react-router-dom';

// Login component with OAuth buttons (mock for Instagram)
function Login() {
  const handleInstagramLogin = () => {
    // Redirect to backend OAuth route (mock)
    window.location.href = 'http://localhost:5000/auth/instagram';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Login to SocialAIPlatform</h2>
        <button
          onClick={handleInstagramLogin}
          className="bg-pink-500 text-white px-4 py-2 rounded mb-4 w-full hover:bg-pink-600"
        >
          Login with Instagram
        </button>
        <Link to="/chat" className="text-blue-500 hover:underline">
          Skip to Chat (Demo)
        </Link>
      </div>
    </div>
  );
}

export default Login;