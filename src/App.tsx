import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Recipes } from './pages/Recipes'
import { Recipe } from './pages/Recipe'
import { NotFound } from './pages/NotFound'
import {
  HOME,
  LOGIN,
  REGISTER,
  USERS,
  DASHBOARD,
  RECIPES,
  RECIPE,
  ADDRECIPE
} from './config/routes'
import { PrivateRoutes } from './components/Main/Routing/PrivateRoutes'
import { UserAdmin } from './pages/UserAdmin'
import { Dashboard } from './pages/Dashboard'
import CreateRecipe from './pages/CreateRecipe'
import Header from './components/Main/Header/Header'
import Footer from './components/Main/Footer/Footer'

function App () {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={DASHBOARD} element={<Dashboard />} exact />
          <Route path={RECIPES} element={<Recipes />} />
          <Route path={RECIPE} element={<Recipe />} />
          <Route path={ADDRECIPE} element={<CreateRecipe />} exact />
          <Route path={USERS} element={<UserAdmin />} exact />
        </Route>
        <Route path={HOME} element={<Home />} exact />
        <Route path={LOGIN} element={<Login />} exact />
        <Route path={REGISTER} element={<Register />} exact />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
