import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginScreen = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
        email: 'john@mail.com',
        password: 'changeme'
      });

      setAccessToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);

      history.push('/TodoList', { accessToken });
    } catch (error) {
      setLoginError('Something went wrong');
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p style={{ color: 'red' }}>{loginError}</p>
    </div>
  );
};

export default LoginScreen;
