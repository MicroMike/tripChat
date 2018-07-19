import React from 'react';
import { Dimensions, StyleSheet, Text, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import I18n from 'ex-react-native-i18n'

import Login from 'components/login/Login'

export default class App extends React.Component {
  componentWillMount() {
    I18n.locale = 'fr'
    I18n.initAsync();
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" >
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always" >
          <View style={styles.container}>
            <Login />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Dimensions.get('window').height,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20
  }
});
