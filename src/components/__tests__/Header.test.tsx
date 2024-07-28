// src/components/__tests__/Header.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import Header from '../Header';

test('renders header with title', () => {
  const { getByText } = render(<Header />);
  expect(getByText('College Ball')).toBeInTheDocument();
});
