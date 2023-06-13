import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { LoginForm } from '../components/LoginForm/LoginForm';

test('should render a user name input', async () => {
  render(<LoginForm />);
  const labelNickname = await screen.findByText('User name');
  expect(labelNickname).toBeDefined();
  expect(labelNickname).toHaveTextContent('User name');
});
