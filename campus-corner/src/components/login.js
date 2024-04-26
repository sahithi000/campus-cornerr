// Login.js
import React from 'react';
import { Link } from 'react-router-dom';
// App.js
import '../App.css';
 // Import the CSS file for styling

export default function Login() {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Login</button>
      </form>
      <p>No account? <Link to="/signup">Signup</Link></p>
      <p>No account? <Link to="/home">Home</Link></p>
    </div>
  );
}
