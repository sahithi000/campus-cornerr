// Signup.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';// Import the CSS file for styling

export default function Signup() {
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
}
