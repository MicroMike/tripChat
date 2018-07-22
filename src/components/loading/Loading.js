import React from 'react'
import { Dimensions, View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Dimensions.get('window').height,
    backgroundColor: '#a1a1a1',
    justifyContent: 'center',
    padding: 20
  }
})

const Loading = (props) => (
  props.displayLoading &&
  <View style={styles.container}>
    <Text>Loading...</Text>
  </View >
)

const mapStateToProps = ({ loading }) => {
  return { displayLoading: loading.displayLoading }
}

export default connect(mapStateToProps, null)(Loading)