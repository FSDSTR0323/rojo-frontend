export const HOME = '/'
export const LOGIN = '/login'
export const REGISTER = '/register'
export const RECIPES = '/recipes'
export const RECIPE = '/recipe/:recipeId'
export const DASHBOARD = '/dashboard'
export const ADDRECIPE = '/recipes/add'
export const USERS = '/users'

export const PERMISSIONS = {
  DASHBOARD_READ: 'dashboard.read',
  USER_CREATE: 'user.create',
  USER_READ: 'user.read',
  USER_UPDATE: 'user.update',
  USER_DELETE: 'user.delete',
  RECIPE_CREATE: 'recipe.create',
  RECIPE_READ: 'recipe.read',
  RECIPE_UPDATE: 'recipe.update',
  RECIPE_DELETE: 'recipe.delete',
  VALIDATION_CREATE: 'validation.create',
  VALIDATION_READ: 'validation.read',
  VALIDATION_DELETE: 'validation.delete',
  HACCP_READ: 'haccp.read',
  CUSTOMER_READ: 'customer.read',
  CUSTOMER_UPDATE: 'customer.update'
}

export const PERMISSIONS_CONFIG = {
  [DASHBOARD]: PERMISSIONS.DASHBOARD_READ,
  [USERS]: PERMISSIONS.USER_READ,
  [RECIPES]: PERMISSIONS.RECIPE_READ,
  [RECIPE]: PERMISSIONS.RECIPE_UPDATE,
  [ADDRECIPE]: PERMISSIONS.RECIPE_CREATE
}

export const PUBLIC_PAGES = [REGISTER, LOGIN]

export const PRIVATE_PAGES = [DASHBOARD, RECIPES, USERS]

export const DEFAULT_LOGGED_IN_URL = RECIPES
