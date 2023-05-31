import React from 'react';
import { ADDRECIPE, HACCP, HOME, USERADMIN } from '../config/routes';
import { Link } from 'react-router-dom';

export const Dashbord = () => {
  return (
    <div>
      <Link to={ADDRECIPE}>
        <button>Add Recipe</button>
      </Link>
      <Link to={HACCP}>
        <button>HACCP</button>
      </Link>
      <Link to={USERADMIN}>
        <button>Create User</button>
      </Link>
      <Link to={HOME}></Link>
    </div>
  );
};
