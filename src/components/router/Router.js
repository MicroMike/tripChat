import React from 'react'
import { connect } from 'react-redux'
import store from 'redux/store'

const Router = (props) => {
  const Component = props.currentComponent

  return (
    <Component onRouteChange={props.onRouteChange} />
  )
}

const mapStateToProps = ({ router }) => {
  return {
    currentComponent: router.currentComponent
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRouteChange: (component) => store.dispatch({
      type: component
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Router)