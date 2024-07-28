// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import Home from './pages/Home';
import TeamManagement from './pages/TeamManagement';
import PlayerStats from './pages/PlayerStats';
import GameDay from './pages/GameDay';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

function PrivateRoute({ children, ...rest }) {
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  if (!token) {
    return <Login setToken={(token) => { setToken(token); localStorage.setItem('token', token); }} />;
  }

  return (
    <Router>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Container style={{ marginLeft: 240 }}>
        <Switch>
          <PrivateRoute path="/" exact>
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/team-management">
            <TeamManagement />
          </PrivateRoute>
          <PrivateRoute path="/player-stats">
            <PlayerStats />
          </PrivateRoute>
          <PrivateRoute path="/game-day">
            <GameDay />
          </PrivateRoute>
          <Route path="/login" component={() => <Login setToken={setToken} />} />
          <Route path="/register" component={Register} />
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
