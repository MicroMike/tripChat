import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Permissions, Camera, MediaLibrary, ImagePicker } from 'expo'

// Expo.MediaLibrary.getAlbumsAsync()

export default class Profile extends Component {

  state = {
    hasCameraPermission: null,
    hasCameraRollPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { statusCamera } = await Permissions.askAsync(Permissions.CAMERA);
    const { statusCameraRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    this.setState({
      hasCameraPermission: statusCamera === 'granted',
      hasCameraRollPermission: statusCameraRoll === 'granted'
    });
  }

  render = () => {
    if (this.state.hasCameraRollPermission) {
      console.log(Expo.MediaLibrary.getAlbumsAsync())
    }

    ImagePicker.launchImageLibraryAsync(options)

    return (
      <View>
        <Text>Haha!</Text>
      </View>
    )
  }
}