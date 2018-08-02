import store from 'redux/store'
import { displayLoading, hideLoading } from 'components/loading/loadingActions'

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
    .catch((error) => {
      console.log(error)
    })

  return promise
}