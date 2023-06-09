//src/components/__tests/example.test.js
//import '@testing-library/jest-dom'
import { test, expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react'

import { LoginForm } from '../components/LoginForm/LoginForm';

// function sum(a, b) {
//   return a + b;
// }

// test('add 2 numbers', () => {
//   expect(sum(2, 3)).toEqual(5);
// });

// describe('something truthy and falsy', () => {
//   it('true to be true', () => {
//     expect(true).toBe(true);
//   });

//   it('false to be false', () => {
//     expect(false).toBe(false);
//   });
// });



  test('should render a nickname input', () => {
    render(<LoginForm />)
    const labelNickname = screen.findAllByText('User name')
    expect(labelNickname).toBeDefined()
  })

  // test('should have a label User name', () => {
  //   render(<LoginForm />)
  //   const labelNickname = screen.getByLabelText('User name')
  //   expect(labelNickname).toBe('User name')
  // })

  test('should show login form', () => {
    render(<LoginForm />)
    const inputLabel = screen.getAllByLabelText('Username')
    expect(inputLabel[0]).toBe('User name')
    // Events and assertions...
  })