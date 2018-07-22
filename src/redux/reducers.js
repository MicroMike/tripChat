import { combineReducers } from 'redux'

// Import Reducers
import router from 'components/router/routerReducer'
import loading from 'components/loading/loadingReducer'

// Combine all reducers into one root reducer
export default combineReducers({
  router,
  loading,
})
