import React from 'react'
import t from 'tcomb-form-native'
import I18n from 'i18n'
import { View, Text, Switch } from 'react-native'

const stylesheet = t.form.Form.stylesheet

const transformer = {
  format: value => value ? value : null,
  parse: value => value ? value.trim() : null
}

export default (component) => {

  const state = component.state

  const emailError = () => {
    const email = state.form.email

    if (!email) {
      return false
    }

    if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(email)) {
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
  const checkboxStyle = {
    checkbox: {
      normal: { position: 'absolute', right: 0 }
    }
  }

  const form = {
    options: {
      fields: {
        email: {
          label: I18n.t('login.email.label'),
          error: emailError,
          onChange: component.reset,
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
        gender: {
          label: I18n.t('login.gender.label')
        },
        remember: {
          stylesheet: {
            ...stylesheet,
            ...checkboxStyle
          }
        }
      },
    },

    Login: t.struct({
      email: Email,
      password: t.String,
      remember: t.Boolean
    }),

    Signin: t.struct({
      email: Email,
      username: t.String,
      password: t.String,
      // gender: t.enums({
      //   M: I18n.t('login.gender.male'),
      //   F: I18n.t('login.gender.female')
      // })
    })
  }

  return form
}