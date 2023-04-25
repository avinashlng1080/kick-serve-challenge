import { KSColors } from 'constants/theme'

import { textInputStyles, textStyles } from 'lib/styles'
import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const styles = StyleSheet.create({
  runtime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  }
})

type RunTimeProps = {}
const RunTime = ({}: RunTimeProps) => {
  return (
    <View>
      <Text style={textStyles.h2}>Runtime</Text>
      <View style={styles.runtime}>
        <TextInput
          keyboardType="number-pad"
          style={textInputStyles.input}
          placeholder="From"
          placeholderTextColor={KSColors.neutral}
          maxLength={3}
        />
        <Text style={textStyles.small}>-</Text>
        <TextInput
          keyboardType="number-pad"
          style={textInputStyles.input}
          placeholder="To"
          placeholderTextColor={KSColors.neutral}
          maxLength={3}
        />
        <Text style={textStyles.small}>minutes</Text>
      </View>
    </View>
  )
}

export default RunTime
