import React from 'react';
import { OwnerForm } from '../components/SignUp/OwnerForm';
import Header from '../components/Header/Header';

export const Register = () => {
  return (
    <div>
      <Header />
      <h1>Register Page</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum is simply dummy text of the printing and
        typesetting industry.{' '}
      </p>
      <OwnerForm />
    </div>
  );
};
