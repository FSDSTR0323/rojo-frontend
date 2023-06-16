import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Recipes } from './pages/Recipes';
import { NotFound } from './pages/NotFound';
import {
  HACCP,
  HOME,
  LOGIN,
  REGISTER,
  USERADMIN,
  DASHBOARD,
  RECIPES,
} from './config/routes';
import { Haccp } from './Pages/haccp';
import { PrivateRoute } from './components/Main/PrivateRoute/PrivateRoute';
import { UserAdmin } from './Pages/UserAdmin';
import { Dashboard } from './Pages/Dashboard';
import Header from './components/Header/Header';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path={LOGIN} element={<Login />} />
          <Route path={REGISTER} element={<Register />} />
          <Route path={RECIPES} element={<Recipes />} />
          <Route
            path={DASHBOARD}
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path={HACCP}
            element={
              <PrivateRoute>
                <Haccp />
              </PrivateRoute>
            }
          />
          <Route
            path={RECIPES}
            element={
              <PrivateRoute>
                <Recipes />
              </PrivateRoute>
            }
          />
          <Route
            path={USERADMIN}
            element={
              <PrivateRoute>
                <UserAdmin />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
