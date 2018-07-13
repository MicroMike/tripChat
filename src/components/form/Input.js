import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import I18n from 'i18n'

class Input extends Component {
  state = {
    value: null
  }
  
  render = () => {
    
    const {
      label,
      required
    } = this.props
    
    const errorMessage = I18n.t('error.required')
    console.log(I18n.locale)
    return (
      <View>
        <FormLabel>{label}</FormLabel>
        <FormInput onChangeText={(val) => {this.setState({value: val})}} />
        <FormValidationMessage>{required && this.state.value === '' ? errorMessage : ''}</FormValidationMessage>
      </View>
    )
  }
}

export default Input