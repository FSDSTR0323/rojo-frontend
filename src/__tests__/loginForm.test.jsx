import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { LoginForm } from '../components/LoginForm/LoginForm';

describe('should render a form to login', () => {
  test('should render a user name input', async () => {
    render(<LoginForm />);
    const nicknameLabel = await screen.findByText('User name');
    expect(nicknameLabel).toBeDefined();
    expect(nicknameLabel).toHaveTextContent('User name');
  });

  test('should render a password input', async () => {
    render(<LoginForm />);
    const passwordLabel = await screen.findByText('Password');
    expect(passwordLabel).toBeDefined();
    expect(passwordLabel).toHaveTextContent('Password');
  });

  test('should render a Login Button', async () => {
    render(<LoginForm />);
    const passwordLabel = await screen.findByText('Login');
    expect(passwordLabel).toBeDefined();
    expect(passwordLabel).toHaveTextContent('Login');
  });
});
