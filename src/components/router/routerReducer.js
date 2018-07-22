import Login from 'components/login/Login'

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

    default:
      return state
  }
}

export default routerReducer