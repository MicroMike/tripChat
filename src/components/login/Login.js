import React, { Component } from 'react'
import I18n from 'i18n';
import { StyleSheet, Text, View, Button } from 'react-native';
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
  }

  handleSubmit = () => {
    const value = this.refs.form.getValue();
    console.log('value: ', value);
  }

  switchForm = () => {
    this.setState({
      login: !this.state.login
    })
  }

  renderForm = () => {
    return this.state.login
      ? <Form type={Login} ref="form" options={options} />
      : <Form type={Signin} ref="form" options={options} />
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
        style={styles.button}
      >
        {this.loginLabel(true)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    padding: 20
  },
});

export default LoginForm