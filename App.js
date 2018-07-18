import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import I18n from 'ex-react-native-i18n'

import Login from 'components/login/Login'

export default class App extends React.Component {
  componentWillMount() {
    I18n.locale = 'fr'
    I18n.initAsync();
  }

  render() {
    return (
      <View style={styles.container}>
        <Login />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20
  },
});
