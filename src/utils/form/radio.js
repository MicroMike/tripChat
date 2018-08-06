var React = require("react")
var { View, Text, Switch } = require("react-native")

function radio(values) {

  return (locals) => {
    if (locals.hidden) {
      return null
    }

    var stylesheet = locals.stylesheet
    var formGroupStyle = stylesheet.formGroup.normal
    var controlLabelStyle = stylesheet.controlLabel.normal
    var checkboxStyle = stylesheet.checkbox.normal
    var helpBlockStyle = stylesheet.helpBlock.normal
    var errorBlockStyle = stylesheet.errorBlock

    if (locals.hasError) {
      formGroupStyle = stylesheet.formGroup.error
      controlLabelStyle = stylesheet.controlLabel.error
      // checkboxStyle = stylesheet.checkbox.error
      helpBlockStyle = stylesheet.helpBlock.error
    }

    var label = locals.label ? (
      <Text style={controlLabelStyle}>{locals.label}</Text>
    ) : null
    var help = locals.help ? (
      <Text style={helpBlockStyle}>{locals.help}</Text>
    ) : null
    var error =
      locals.hasError && locals.error ? (
        <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
          {locals.error}
        </Text>
      ) : null

    return (
      <View style={formGroupStyle}>
        {label}
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginBottom: 10
        }}>
          {Object.entries(values).map(arr => {
            const key = arr[0]
            const radioLabel = arr[1]
            return (
              <View key={key} style={{
                width: '50%', marginTop: 5, marginBottom: 5
              }}>
                <Text style={helpBlockStyle}>{radioLabel}</Text>
                <Switch
                  accessibilityLabel={locals.label}
                  ref="input"
                  disabled={locals.disabled}
                  onTintColor={locals.onTintColor}
                  thumbTintColor={locals.thumbTintColor}
                  tintColor={locals.tintColor}
                  style={{
                    ...checkboxStyle,
                    right: 15
                  }}
                  onValueChange={value => locals.onChange(key)}
                  value={locals.value === key}
                />
              </View>
            )
          })}
          {help}
          {error}
        </View>
      </View>
    )
  }
}

module.exports = radio
