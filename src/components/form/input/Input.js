import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

const Input = () => {
  <View>
    <FormLabel>Name</FormLabel>
    <FormInput onChangeText={()=>{}}/>
    <FormValidationMessage>Error message</FormValidationMessage>
  </View>
}

export default Input