import Login from 'components/login/Login'
import Profile from 'components/profile/Profile'

const initialState = {
  currentComponent: Login
}

const routerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        currentComponent: Login
      }

    case 'PROFILE':
      return {
        ...state,
        currentComponent: Profile
      }

    default:
      return state
  }
}

export default routerReducer