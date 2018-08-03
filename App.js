import React from 'react'
import { Dimensions, StyleSheet, ScrollView, View, Keyboard } from 'react-native'
import I18n from 'ex-react-native-i18n'
import { Provider, connect } from 'react-redux';

import store from 'redux/store'
import Loading from 'components/loading/Loading'
import Router from 'components/router/Router'

class App extends React.Component {
  state = {
    keyboardHeight: 0
  }

  componentWillMount() {
    I18n.locale = 'fr'
    I18n.initAsync()
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this))
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
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
        backgroundColor: '#fff',
        minHeight: Dimensions.get('window').height - this.state.keyboardHeight,
        justifyContent: 'center',
        padding: 20
      }
    })

    return (
      <Provider store={store} >
        <View style={{
          height: Dimensions.get('window').height - this.state.keyboardHeight
        }}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
            <View style={styles.container} >
              <Router />
            </View>
          </ScrollView>
          <Loading />
        </View>
      </Provider>
    )
  }
}

export default App