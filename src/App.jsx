import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Login } from './Pages/Login'
import { Register } from './Pages/Register'
import Recipes from './Pages/Recipes'
import { NotFound } from './Pages/NotFound'
import { ADDRECIPE, HACCP, HOME, LOGIN, REGISTER, USERADMIN, DASHBOARD, RECIPE } from './config/routes'
import { Haccp } from './Pages/haccp'
import { PivateRoute } from './components/Main/PrivateRoute/PivateRoute'
import { UserAdmin } from './Pages/UserAdmin'
import { Dashbord } from './Pages/Dashbord'

function App() {  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path={LOGIN} element={<Login />} />
          <Route path={REGISTER} element={<Register />} />
          <Route path={RECIPE} element={<Recipes />} />
          <Route path={DASHBOARD} element={<PivateRoute />} >
            <Route index element={<Dashbord /> } />
            <Route path={HACCP} element={<Haccp />} />
            <Route path={ADDRECIPE} element={<Recipes />} />
            <Route path={USERADMIN} element={<UserAdmin />} />
          </Route>
          <Route path='*' element={<NotFound />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
