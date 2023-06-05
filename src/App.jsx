import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import { Recipes } from './Pages/Recipes';
import { NotFound } from './Pages/NotFound';
import {
  ADDRECIPE,
  HACCP,
  HOME,
  LOGIN,
  REGISTER,
  USERADMIN,
  DASHBOARD,
  RECIPE,
} from './config/routes';
import { Haccp } from './Pages/haccp';
import { PivateRoute } from './components/Main/PrivateRoute/PivateRoute';
import { UserAdmin } from './Pages/UserAdmin';
import { Dashbord } from './Pages/Dashbord';
import { CreateUser } from './Pages/CreateUser';


const App = () => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Revisa si hi ha un token válid enmagatzemat al localStorage al carregar l'aplicación
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // Log in i enmagatzematge del Token
  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:3000/user/login', credentials);
      const token = response.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: LogOut
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path={LOGIN} element={<Login />} />
          <Route path={REGISTER} element={<Register />} />
          <Route path={RECIPE} element={<Recipes />} />
          <Route path={DASHBOARD} element={<PivateRoute />}>
            <Route index element={<Dashbord />} />
            <Route path={HACCP} element={<Haccp />} />
            <Route path={ADDRECIPE} element={<Recipes />} />
            <Route path={USERADMIN} element={<UserAdmin />} />
            <Route path={`${USERADMIN}/createuser`} element={<CreateUser token={token} isAuthenticated={isAuthenticated} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
