import React, { useEffect } from 'react';
import { RECIPES, HACCP, HOME, USERADMIN } from '../config/routes';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import DashboardButtons from '../components/Buttons/DashboardButtons';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  useEffect(() => {
    if (user.isLoggedIn) {
      if (user.info.role == 'headchef') {
        navigate(RECIPES);
      } else if (user.info.role == 'chef') {
        navigate(RECIPES);
      }
    }
  }, [user]);

  return (
    <div>
      <DashboardButtons />
      {/* <Link to={RECIPES}>
        <button>Recipes</button>
      </Link>
      <Link to={HACCP}>
        <button>HACCP</button>
      </Link>
      <Link to={USERADMIN}>
        <button>Administrar Usuarios</button>
      </Link>
      <Link to={HOME}></Link> */}

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quas
        perspiciatis laborum quasi vitae quae cumque temporibus voluptates,
        asperiores odit, aut saepe adipisci? Similique, dolore in alias
        voluptates fugit officia?
      </p>
    </div>
  );
};
