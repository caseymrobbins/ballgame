// src/pages/Register.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button } from '@mui/material';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/auth/register', { username, password });
      alert('User registered successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
        <Button type="submit" variant="contained" color="primary">Register</Button>
      </form>
    </Container>
  );
}

export default Register;
