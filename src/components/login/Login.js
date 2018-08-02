import React, { Component } from 'react'
import I18n from 'i18n'
import { StyleSheet, Text, View, Button, Keyboard } from 'react-native'
import t from 'tcomb-form-native'

import cFetch from 'utils/fetch'
import * as storage from 'utils/storage'
import loginForm from './form'

const Form = t.form.Form

class LoginForm extends Component {

  state = {
    login: true,
    form: {},
    emailAlreadyUsed: false,
    userNotFound: false,
    logged: true,
  }

  componentWillMount = () => {
    storage.removeData('account')
    storage.retrieveData('account', (err, value) => {
      if (value) {
        this.props.onRouteChange('PROFILE')
      }
      else {
        this.setState({ logged: false })
      }
    })
  }

  onFormChange = (form) => {
    this.setState({
      form,
      emailAlreadyUsed: false,
      userNotFound: false,
    })
  }

  handleSubmit = () => {
    if (this.refs.form.validate().errors.length > 0) {
      return
    }

    Keyboard.dismiss()
    const formValues = this.refs.form.getValue()

    if (this.state.login) {
      const url = `http://192.168.0.11:3000/api/login/${formValues.email}/${formValues.password}`
      cFetch(url)
        .then(response => {
          response.json().then(json => {
            if (json.user) {
              console.log('ok', formValues.remember)
              if (formValues.remember) {
                storage.storeData('account', json.user, () => { console.log(json.user) })
              }
              this.props.onRouteChange('PROFILE')
              return
            }
            this.setState({ userNotFound: true })
            this.refs.form.validate()
          })
        })
      return
    }

    cFetch('http://192.168.0.11:3000/api/putUser', JSON.stringify(formValues))
      .then(response => {
        if (!response.ok) {
          response.json().then(json => {
            if (json.already) {
              this.setState({ emailAlreadyUsed: true })
              this.refs.form.validate()
            }
          })
          return
        }
        this.props.onRouteChange('PROFILE')
      })
  }

  switchForm = () => {
    this.setState({
      login: !this.state.login,
      emailAlreadyUsed: false,
      userNotFound: false,
    })
  }

  renderForm = () => {
    const form = loginForm(this)

    return <Form
      type={this.state.login ? form.Login : form.Signin}
      ref="form"
      onChange={this.onFormChange}
      options={form.options}
      value={this.state.form}
    />
  }

  loginLabel = (reverse) => {
    const label = reverse ? this.state.login : !this.state.login
    return label ? I18n.t('login.signup') : I18n.t('login.signin')
  }

  render = () => {
    return !this.props.logged && (
      <View>
        {this.renderForm()}
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

export default LoginForm
