// src/components/__tests__/Footer.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../Footer';

test('renders footer with copyright', () => {
  const { getByText } = render(<Footer />);
  expect(getByText('© 2024 College Ball')).toBeInTheDocument();
});
