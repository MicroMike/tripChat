import React, { Component } from 'react'
import { View, Button, Keyboard } from 'react-native'
import I18n from 'i18n'

import TravelForm from './TravelForm'
import * as storage from 'utils/storage'
import cFetch from 'utils/fetch'

export default class Travel extends Component {

  state = {
    form: {},
  }

  handleSubmit = () => {
    if (this.refs.form.validate().errors.length > 0) {
      return
    }

    Keyboard.dismiss()
    const formValues = this.refs.form.getValue()

    storage.retrieveData('user', user => {
      const postValues = {
        ...formValues,
        userId: user.userId,
      }
      const url = `http://192.168.13.164:3000/api/putTravel/`
      cFetch(url, postValues)
        .then(response => {
          response.json().then(json => {
            if (json.already) {
              console.log('already')
            }
            if (json.done) {
              console.log('done')
            }
          })
        })
    })
  }

  render = () => {
    return (
      <View>
        {TravelForm(this)}
        <Button
          title={I18n.t('commons.continue')}
          onPress={this.handleSubmit.bind(this)}
        />
      </View>
    )
  }
}