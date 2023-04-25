import { textInputStyles, textStyles } from 'lib/styles'
import React from 'react'
import { Text, TextInput, View } from 'react-native'

const Year = () => {
  //todo: maybe forwardRef to get the value of the input
  return (
    <View>
      <Text style={textStyles.h2}>Year</Text>
      <TextInput
        keyboardType="number-pad"
        style={textInputStyles.input}
        maxLength={4}
      />
    </View>
  )
}

export default Year
