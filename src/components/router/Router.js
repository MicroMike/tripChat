import React from 'react'
import { connect } from 'react-redux'

const Router = (props) => {
  const Component = props.currentComponent
  return (
    <Component />
  )
}

const mapStateToProps = ({ router }) => {
  return {
    currentComponent: router.currentComponent
  }
}

export default connect(mapStateToProps, null)(Router)