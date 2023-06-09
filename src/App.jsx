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
        <Route path={DASHBOARD} element={<PrivateRoute />}>
          <Route index element={<Dashbord />} />
          <Route path={HACCP} element={<Haccp />} />
          <Route path={ADDRECIPE} element={<Recipes />} />
          <Route path={USERADMIN} element={<UserAdmin />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
