import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileScreen = ({ history }) => {
  const [accessToken, setAccessToken] = useState('');
  const [userDetails, setUserDetails] = useState({});

  const fetchUserDetails = async () => {
    try {
      const storedAccessToken = localStorage.getItem('access_token');
      if (storedAccessToken) {
        setAccessToken(storedAccessToken);

        // Uncomment the following lines when you want to fetch user details
        // const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
        //   headers: {
        //     Authorization: `Bearer ${storedAccessToken}`
        //   }
        // });
        // setUserDetails(response.data);
      } else {
        console.log('No access token found.');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    history.push('/Login');
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name: {userDetails.name}</p>
      <p>Email: {userDetails.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ProfileScreen;
