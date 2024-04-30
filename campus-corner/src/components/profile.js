import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const [email, setEmail] = useState('');
  const location = useLocation();
  const userId = location.state.userId; // Assuming you pass userId from the Sidebar component

  useEffect(() => {
    axios.get(`/api/user/${userId}`)
      .then(response => {
        const userData = response.data;
        setEmail(userData.email);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {email}</p>
    </div>
  );
}
