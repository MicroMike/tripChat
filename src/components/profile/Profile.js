import React, { Component } from 'react'
import { View, Button, Keyboard } from 'react-native'
import I18n from 'i18n'

import ProfileForm from './ProfileForm'
import * as storage from 'utils/storage'
import cFetch from 'utils/fetch'

export default class Profile extends Component {

  state = {
    form: {
      gender: 'M',
    },
  };

  handleSubmit = () => {
    this.props.onRouteChange('PROFILE')

    if (this.refs.form.validate().errors.length > 0) {
      return
    }

    Keyboard.dismiss()
    const formValues = this.refs.form.getValue()

    storage.retrieveData('user', user => {
      const postValues = {
        userId: user._id,
        ...formValues,
      }
      const url = `http://192.168.13.164:3000/api/putUserInfo/`
      cFetch(url, postValues)
        .then(response => {
          response.json().then(json => {
            if (json.done) {
              storage.updateData('user', formValues, () => {
                this.props.onRouteChange('TRAVEL')
              })
            }
          })
        })
    })
  }

  render = () => {
    const { avatar, gender } = this.state.form
    return (
      <View>
        {ProfileForm(this)}
        {avatar && gender &&
          <Button
            title={I18n.t('commons.continue')}
            onPress={this.handleSubmit.bind(this)}
          />
        }
      </View>
    )
  }
}