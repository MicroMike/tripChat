import React, { Component } from 'react'
import { View, Text, Button, Image } from 'react-native'
import { ImagePicker } from 'expo'
// import loginForm from './form'

export default class Profile extends Component {

  state = {
    image: null
  };

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

  render = () => {
    const { image } = this.state

    return (
      <View>
        <Button
          title="Pick an image from camera roll"
          onPress={this.pickImage}
        />
        {image &&
          <Image source={{ uri: 'data:image/jpeg;base64,' + image }} style={{ width: 300, height: 300 }} />}
      </View>
    )
  }
}