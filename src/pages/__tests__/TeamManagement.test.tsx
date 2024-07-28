// src/pages/__tests__/TeamManagement.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import TeamManagement from '../TeamManagement';

jest.mock('axios');

test('renders team management page and fetches teams', async () => {
  const teams = [
    { _id: '1', name: 'Team A', mascot: 'Mascot A', colors: ['Red', 'White'] },
    { _id: '2', name: 'Team B', mascot: 'Mascot B', colors: ['Blue', 'Black'] },
  ];
  axios.get.mockResolvedValue({ data: teams });

  render(<TeamManagement />);

  expect(screen.getByText('Team Management')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Team A')).toBeInTheDocument();
    expect(screen.getByText('Team B')).toBeInTheDocument();
  });
});

test('adds a new team', async () => {
  const teams = [];
  axios.get.mockResolvedValue({ data: teams });

  render(<TeamManagement />);

  fireEvent.change(screen.getByLabelText('Team Name'), { target: { value: 'Team C' } });
  fireEvent.change(screen.getByLabelText('Mascot'), { target: { value: 'Mascot C' } });
  fireEvent.change(screen.getByLabelText('Colors (comma separated)'), { target: { value: 'Green, Yellow' } });

  axios.post.mockResolvedValue({
    data: { _id: '3', name: 'Team C', mascot: 'Mascot C', colors: ['Green', 'Yellow'] }
  });

  fireEvent.click(screen.getByText('Add Team'));

  await waitFor(() => {
    expect(screen.getByText('Team C')).toBeInTheDocument();
  });
});
