// src/pages/__tests__/PlayerStats.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import PlayerStats from '../PlayerStats';

jest.mock('axios');

test('renders player stats page and fetches players', async () => {
  const players = [
    { _id: '1', name: 'Player A', position: 'Guard', team: { name: 'Team A' }, stats: { points: 20 } },
    { _id: '2', name: 'Player B', position: 'Forward', team: { name: 'Team B' }, stats: { points: 15 } },
  ];
  axios.get.mockResolvedValue({ data: players });

  render(<PlayerStats />);

  expect(screen.getByText('Player Stats')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Player A')).toBeInTheDocument();
    expect(screen.getByText('Player B')).toBeInTheDocument();
  });
});

test('adds a new player', async () => {
  const players = [];
  const teams = [{ _id: '1', name: 'Team A' }];
  axios.get.mockImplementation(url => {
    if (url === 'http://localhost:5000/players') return Promise.resolve({ data: players });
    if (url === 'http://localhost:5000/teams') return Promise.resolve({ data: teams });
    return Promise.reject(new Error('not found'));
  });

  render(<PlayerStats />);

  fireEvent.change(screen.getByLabelText('Player Name'), { target: { value: 'Player C' } });
  fireEvent.change(screen.getByLabelText('Position'), { target: { value: 'Center' } });
  fireEvent.change(screen.getByLabelText('Stats (JSON format)'), { target: { value: '{"points": 25}' } });
  fireEvent.mouseDown(screen.getByLabelText('Team'));
  fireEvent.click(screen.getByText('Team A'));

  axios.post.mockResolvedValue({
    data: { _id: '3', name: 'Player C', position: 'Center', team: { name: 'Team A' }, stats: { points: 25 } }
  });

  fireEvent.click(screen.getByText('Add Player'));

  await waitFor(() => {
    expect(screen.getByText('Player C')).toBeInTheDocument();
  });
});
