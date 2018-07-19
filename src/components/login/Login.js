import React, { Component } from 'react'
import I18n from 'i18n';
import { StyleSheet, Text, View, Button, Keyboard } from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Login = t.struct({
  email: t.String,
  password: t.String,
});

const Signin = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
  gender: t.enums({
    M: I18n.t('login.gender.male'),
    F: I18n.t('login.gender.female')
  })
  // terms: t.Boolean
});

const options = {
  fields: {
    email: {
      label: I18n.t('login.email')
    },
    username: {
      label: I18n.t('login.username')
    },
    password: {
      label: I18n.t('login.password')
    },
    gender: {
      label: I18n.t('login.gender.label')
    },
  },
};

class LoginForm extends Component {
  state = {
    login: true,
    form: {}
  }

  handleSubmit = () => {
    Keyboard.dismiss()
    fetch('http://192.168.13.164:3000/api/putUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.refs.form.getValue()),
    })
      .then((response) => {
        console.log(response)
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
    return <Form
      type={this.state.login ? Login : Signin}
      ref="form"
      onChange={form => this.setState({ form })}
      options={options}
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
        onPress={this.handleSubmit}
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