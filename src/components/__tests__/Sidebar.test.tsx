// src/components/__tests__/Sidebar.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../Sidebar';

test('renders sidebar with navigation links', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  );
  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('Team Management')).toBeInTheDocument();
  expect(getByText('Player Stats')).toBeInTheDocument();
  expect(getByText('Game Day')).toBeInTheDocument();
});
