import React, { useEffect } from 'react';
import { ADDRECIPE, HACCP, HOME, USERADMIN, DASHBOARD } from '../config/routes';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export const Dashbord = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  //console.log('Dashboard.jsx, user:', user);
  useEffect(() => {
    if (user.isLoggedIn) {
      if (user.info.role == 'headchef') {
        navigate(ADDRECIPE);
      } else if (user.info.role == 'chef') {
        navigate(ADDRECIPE);
      }
    }
  }, [user]);

  return (
    <div>
      <Link to={ADDRECIPE}>
        <button>Add Recipe</button>
      </Link>
      <Link to={HACCP}>
        <button>HACCP</button>
      </Link>
      <Link to={USERADMIN}>
        <button>Administrar Usuarios</button>
      </Link>
      <Link to={HOME}></Link>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quas
        perspiciatis laborum quasi vitae quae cumque temporibus voluptates,
        asperiores odit, aut saepe adipisci? Similique, dolore in alias
        voluptates fugit officia?
      </p>
    </div>
  );
};
