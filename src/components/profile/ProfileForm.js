import React, { Component } from 'react'
import t from 'tcomb-form-native'
import I18n from 'i18n'

import radio from 'utils/form/radio'
import image from 'utils/form/image'

export default ProfileForm = (component) => {

  const Form = t.form.Form

  const state = component.state

  const userInfo = t.struct({
    avatar: t.String,
    gender: t.String,
  })

  const onFormChange = (form) => {
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
      gender: {
        label: ' ',//I18n.t('profile.gender.label'),
        stylesheet,
        template: radio({
          M: I18n.t('profile.gender.male'),
          F: I18n.t('profile.gender.female'),
        })
      },
      avatar: {
        label: I18n.t('profile.picture'),
        template: image
      }
    }
  }

  return (
    <Form
      type={userInfo}
      ref="form"
      onChange={onFormChange}
      options={options}
      value={state.form}
    />
  )
}