import React from 'react'
import I18n from 'i18n';
import { StyleSheet, Text, View } from 'react-native';

import Input from 'components/form/Input'
import Button from 'components/form/Button'

const Login = () => (
  <View>
    <Input label={I18n.t('login.firstname')} required />
    <Input label={I18n.t('login.lastname')} required />
    <Input label={I18n.t('login.email')} required />
    <Button title={I18n.t('login.signup')} />
  </View>
)

export default Login