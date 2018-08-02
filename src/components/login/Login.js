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
    form: {
      gender: 'M'
    },
    emailAlreadyUsed: false,
    userNotFound: false,
    logged: true,
    image: null
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

    cFetch('http://192.168.13.164:3000/api/putUser', JSON.stringify(formValues))
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

  loginLabel = (reverse) => {
    const label = reverse ? this.state.login : !this.state.login
    return label ? I18n.t('login.signup') : I18n.t('login.signin')
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 0.2
    });

    const { width, height } = result
    console.log(width + 'x' + height)

    if (!result.cancelled) {
      this.setState({ image: result.base64 });
    }
  }

  renderPicButton = () => (
    !this.state.login &&
    <View style={{ alignItems: 'center' }}>
      <Button
        title="Pick an image from camera roll"
        onPress={this.pickImage}
      />
      {this.state.image &&
        <Image source={{ uri: `data:image/jpeg;base64,${this.state.image}` }} style={{ width: 300, height: 300 }} />}
    </View>
  )

  render = () => {
    return !this.state.logged && (
      <View>
        {LoginForm(this)}
        {this.renderPicButton()}
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
