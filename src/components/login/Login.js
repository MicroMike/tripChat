import React, { Component } from 'react'
import I18n from 'i18n'
import { StyleSheet, Text, View, Button, Keyboard, Image } from 'react-native'
import { ImagePicker } from 'expo'

import cFetch from 'utils/fetch'
import * as storage from 'utils/storage'
import LoginForm from './LoginForm'

class Login extends Component {

  state = {
    login: true,
    form: {},
    emailAlreadyUsed: false,
    userNotFound: false,
    logged: true,
  }

  componentWillMount = () => {
    // storage.removeData('remember')
    storage.retrieveData('remember', remember => {
      console.log('remember ' + remember)
      if (remember) {
        this.redirect()
      }
      else {
        this.setState({ logged: false })
      }
    })
  }

  redirect = () => {
    storage.retrieveData('user', user => {
      if (user && !user.gender) {
        this.props.onRouteChange('PROFILE')
      }
      else if (user) {
        this.props.onRouteChange('TRAVEL')
      }
    })
  }

  handleSubmit = () => {
    if (this.refs.form.validate().errors.length > 0) {
      return
    }

    Keyboard.dismiss()
    const formValues = this.refs.form.getValue()

    if (this.state.login) {
      const url = `http://192.168.13.164:3000/api/login/${formValues.email}/${formValues.password}`
      cFetch(url)
        .then(response => {
          response.json().then(json => {
            if (json.user) {
              console.log('ok', formValues.remember)
              if (formValues.remember) {
                storage.storeData('remember', true, () => { })
              }
              storage.storeData('user', json.user, () => { this.redirect() })
            }
            else {
              this.setState({ userNotFound: true })
              this.refs.form.validate()
            }
          })
        })
      return
    }

    cFetch('http://192.168.13.164:3000/api/putUser', formValues)
      .then(response => {
        response.json().then(json => {
          if (json.already) {
            this.setState({ emailAlreadyUsed: true })
            this.refs.form.validate()
            return
          }
          if (json.user) {
            storage.storeData('user', json.user, () => {
              this.props.onRouteChange('PROFILE')
            })
          }
        })
      })
  }

  switchForm = () => {
    this.setState({
      login: !this.state.login,
      emailAlreadyUsed: false,
      userNotFound: false,
    })
  }

  loginLabel = (reverse) => {
    const label = reverse ? this.state.login : !this.state.login
    return label ? I18n.t('login.signup') : I18n.t('login.signin')
  }

  render = () => {
    return !this.state.logged && (
      <View>
        {LoginForm(this)}
        <Button
          title={this.loginLabel()}
          onPress={this.handleSubmit.bind(this)}
        />
        <Text
          onPress={this.switchForm}
          style={styles.switch}
        >
          {this.loginLabel(true)}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  switch: {
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#000',
    marginTop: 20,
    paddingTop: 10,
  },
})

export default Login
