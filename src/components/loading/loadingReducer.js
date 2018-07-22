const initialState = {
  displayLoading: false
}

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DISPLAY_LOADING':
      return {
        ...state,
        displayLoading: true
      }
    case 'HIDE_LOADING':
      return {
        ...state,
        displayLoading: false
      }

    default:
      return state
  }
}

export default loadingReducer