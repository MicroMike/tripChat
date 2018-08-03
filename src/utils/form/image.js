var React = require("react")
var { View, Text, Image, Button } = require("react-native")
import { ImagePicker } from 'expo'

function image(locals) {
  if (locals.hidden) {
    return null
  }

  var stylesheet = locals.stylesheet
  var formGroupStyle = stylesheet.formGroup.normal
  var controlLabelStyle = stylesheet.controlLabel.normal
  var helpBlockStyle = stylesheet.helpBlock.normal
  var errorBlockStyle = stylesheet.errorBlock
  var imageStyle = stylesheet.image || { margin: 20, borderRadius: 250, width: 250, height: 250 }

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error
    controlLabelStyle = stylesheet.controlLabel.error
    helpBlockStyle = stylesheet.helpBlock.error
  }

  var help = locals.help ? (
    <Text style={helpBlockStyle}>{locals.help}</Text>
  ) : null
  var error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 0.2
    })

    if (!result.cancelled) {
      locals.onChange(result.base64)
    }
  }

  locals.value = !locals.value
    ? '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'
    : locals.value

  return (
    <View style={formGroupStyle}>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        {
          locals.value &&
          <Image source={{ uri: `data:image/png;base64,${locals.value}` }} style={imageStyle} />
        }
        <Button
          title={locals.label}
          onPress={pickImage}
        />
        {help}
        {error}
      </View>
    </View>
  )
}

module.exports = image
