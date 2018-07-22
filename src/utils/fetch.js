import { connect } from 'react-redux'

import { displayLoading, hideLoading } from 'components/loading/loadingActions'
import store from 'redux/store'

export default cFetch = (url, body) => {
  const delay = setTimeout(() => {
    store.dispatch(displayLoading())
  }, 500)

  const promise = fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  })

  promise
    .then(() => {
      clearTimeout(delay)
      store.dispatch(hideLoading())
    })
    .catch((e) => {
      console.log(e)
    })

  return promise
}