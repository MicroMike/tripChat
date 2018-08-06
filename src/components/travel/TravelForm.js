import React, { Component } from 'react'
import t from 'tcomb-form-native'
import I18n from 'i18n'

import radio from 'utils/form/radio'

export default TravelForm = (component) => {

  const Form = t.form.Form

  const state = component.state

  const travel = t.struct({
    type: t.String,
    travelId: t.String,
    dateStart: t.maybe(t.Date)
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

  const transformer = {
    format: value => value ? new Date(value) : null,
    parse: value => value ? new Date(value) : null
  }

  const options = {
    fields: {
      type: {
        label: I18n.t('travel.type.label'),
        stylesheet,
        template: radio({
          F: I18n.t('travel.type.flight'),
          T: I18n.t('travel.type.train'),
          B: I18n.t('travel.type.boat'),
        })
      },
      travelId: {
        label: I18n.t('travel.id')
      },
      dateStart: {
        label: I18n.t('travel.date'),
        mode: 'date',
        config: {
          format: date => new Date(date).toLocaleDateString('fr')
        },
        transformer
      }
    }
  }

  return (
    <Form
      type={travel}
      ref="form"
      onChange={onFormChange}
      options={options}
      value={state.form}
    />
  )
}