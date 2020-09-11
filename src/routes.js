import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import login from './pages/login'
import register from './pages/register'
import userDashboard from './pages/user/dashboard'
import userAlter from './pages/user/userAlter'
import adminDashboard from './pages/admin/dashboard'
import usersList from './pages/admin/usersList'
import usersAlter from './pages/admin/usersAlter'

const appNavigation = createStackNavigator({
  login: {
    screen: login,
  },
  cadastro: {
    screen: register,
  },
  usuario: {
    screen: userDashboard,
  },
  perfil: {
    screen: userAlter,
  },
  administrador: {
    screen: adminDashboard,
  },

  alterar: {
    screen: usersAlter,
  },
},

)

const Routes = createAppContainer(appNavigation)
export default Routes
