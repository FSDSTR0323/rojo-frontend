import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Recipes } from './pages/Recipes';
import { NotFound } from './pages/NotFound';
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
import { PrivateRoute } from './components/Main/PrivateRoute/PrivateRoute';
import { UserAdmin } from './Pages/UserAdmin';
import { Dashbord } from './Pages/Dashbord';

function App() {
  return (
    <>
      <Routes>
        <Route path={HOME} element={<Home />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER} element={<Register />} />
        <Route path={RECIPE} element={<Recipes />} />
        <Route
          path={DASHBOARD}
          element={
            <PrivateRoute>
              <Dashbord />
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
          path={ADDRECIPE}
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
    </>
  );
}

export default App;
