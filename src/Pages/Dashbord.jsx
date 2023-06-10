import React, { useEffect } from 'react';
import { ADDRECIPE, HACCP, HOME, USERADMIN, DASHBOARD } from '../config/routes';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export const Dashbord = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  console.log('Dashboard.jsx, user:', user);
  useEffect(() => {
    if (user.isLoggedIn) {
      if (user.info.role == 'headchef') {
        navigate(ADDRECIPE);
      } else if (user.info.role == 'chef') {
        navigate(ADDRECIPE);
      } else {
        navigate(HOME);
      }
    }
  }, [user]);

  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quas
        perspiciatis laborum quasi vitae quae cumque temporibus voluptates,
        asperiores odit, aut saepe adipisci? Similique, dolore in alias
        voluptates fugit officia?
      </p>
    </div>
  );
};
