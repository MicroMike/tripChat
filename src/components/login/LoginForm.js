import React, { Component } from 'react'
import t from 'tcomb-form-native'
import I18n from 'i18n'

export default LoginForm = (component) => {

  const Form = t.form.Form

  const reset = () => (
    component.setState({
      emailAlreadyUsed: false,
      userNotFound: false,
    })
  )

  const state = component.state

  const emailError = () => {
    const { email } = state.form

    if (!email) {
      return false
    }

    if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(email.trim())) {
      return I18n.t('login.email.emailInvalid')
    }

    if (state.emailAlreadyUsed) {
      return I18n.t('login.email.emailAlreadyUsed')
    }

    if (state.userNotFound) {
      return I18n.t('login.email.userNotFound')
    }

    return false
  }

  const Email = t.refinement(t.String, () => !emailError())

  const login = t.struct({
    email: Email,
    password: t.String,
    remember: t.Boolean
  })

  const signin = t.struct({
    email: Email,
    username: t.String,
    password: t.String,
  })

  const transformer = {
    format: value => value ? value.trim() : null,
    parse: value => value ? value.trim() : null
  }

  const onFormChange = (form) => {
    reset()
    component.setState({
      form
    })
  }

  const stylesheet = {
    ...Form.stylesheet,
    checkbox: {
      normal: { position: 'absolute', right: 0 }
    }
  }

  const options = {
    fields: {
      email: {
        label: I18n.t('login.email.label'),
        error: emailError,
        onChange: reset,
        transformer
      },
      username: {
        label: I18n.t('login.username'),
        transformer
      },
      password: {
        label: I18n.t('login.password'),
        password: true,
        secureTextEntry: true
      },
      remember: {
        stylesheet
      }
    }
  }

  return (
    <Form
      type={state.login ? login : signin}
      ref="form"
      onChange={onFormChange}
      options={options}
      value={state.form}
    />
  )
}