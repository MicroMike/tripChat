import React from 'react';
import { Dimensions, StyleSheet, Text, KeyboardAvoidingView, ScrollView, View, Keyboard } from 'react-native';
import I18n from 'ex-react-native-i18n'

import Login from 'components/login/Login'

export default class App extends React.Component {
  state = {
    keyboardHeight: 0
  }

  componentWillMount() {
    I18n.locale = 'fr'
    I18n.initAsync();
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow(e) {
    this.setState({ keyboardHeight: e.endCoordinates.height })
  }

  _keyboardDidHide(e) {
    this.setState({ keyboardHeight: 0 })
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        minHeight: Dimensions.get('window').height - this.state.keyboardHeight,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 20
      }
    });

    return (
      // <KeyboardAvoidingView behavior="padding" >
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
        <View style={styles.container}>
          <Login />
        </View>
      </ScrollView>
      // </KeyboardAvoidingView>
    );
  }
}
