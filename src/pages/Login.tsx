// src/pages/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button } from '@mui/material';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { username, password });
      setToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
        <Button type="submit" variant="contained" color="primary">Login</Button>
      </form>
    </Container>
  );
}

export default Login;
