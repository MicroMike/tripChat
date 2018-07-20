import React, { Component } from 'react'
import I18n from 'i18n';
import { StyleSheet, Text, View, Button, Keyboard } from 'react-native';
import t from 'tcomb-form-native';

import cFetch from 'utils/fetch'
import loginForm from './form'

const Form = t.form.Form;

class LoginForm extends Component {
  state = {
    login: true,
    form: {},
    emailAlreadyUsed: false,
  }

  handleSubmit = () => {
    Keyboard.dismiss()
    
    if (this.refs.form.validate().errors.length > 0) {
      return
    }

    if (this.state.login) {
      const url = `http://192.168.13.164:3000/api/login/${this.state.form.email}/${this.state.form.password}`
      cFetch(url)
        .then(response => {
          response.json().then(json => {
            if (json.user) {
              alert('ok')
              return
            }
            alert('nope')
          })
        })
      return
    }

    cFetch('http://192.168.13.164:3000/api/putUser', JSON.stringify(this.refs.form.getValue()))
      .then(response => {
        if (!response.ok) {
          response.json().then(json => {
            if (json.already) {
              this.setState({ emailAlreadyUsed: true })
            }
          })
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  switchForm = () => {
    this.setState({
      login: !this.state.login
    })
  }

  renderForm = () => {
    const form = loginForm(this)

    return <Form
      type={this.state.login ? form.Login : form.Signin}
      ref="form"
      onChange={form => this.setState({ form })}
      options={form.options}
      value={this.state.form}
    />
  }

  loginLabel = (reverse) => {
    const label = reverse ? this.state.login : !this.state.login
    return label ? I18n.t('login.signup') : I18n.t('login.signin')
  }

  render = () => (
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

const styles = StyleSheet.create({
  switch: {
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#000',
    marginTop: 20,
    paddingTop: 10,
  },
});

export default LoginForm