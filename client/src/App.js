import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Chat from './components/Chat';
import Dashboard from './components/Dashboard';
import './styles.css';

// Main app component with routing and authentication check
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    axios.get('http://localhost:5000/auth/check', { withCredentials: true })
      .then(res => setIsAuthenticated(res.data.authenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          {isAuthenticated ? <Redirect to="/chat" /> : <Login />}
        </Route>
        <Route exact path="/chat">
          {isAuthenticated ? <Chat /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/dashboard">
          {isAuthenticated ? <Dashboard /> : <Redirect to="/login" />}
        </Route>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;