import { KSColors, KSFontWeights, KSSizes } from 'constants/theme'

import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: KSColors.black,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  buttonContainer: {
    backgroundColor: KSColors.white,
    borderTopColor: KSColors.light,
    borderTopWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 16
  },
  buttonText: {
    color: KSColors.white,
    fontSize: KSSizes.md,
    fontWeight: KSFontWeights.bold
  }
})
type SaveButtonProps = {}
const SaveButton = ({}: SaveButtonProps) => {
  const navigation = useNavigation()
  return (
    <View style={styles.buttonContainer}>
      <TouchableHighlight
        activeOpacity={0.7}
        underlayColor={KSColors.neutral}
        style={styles.button}
        onPress={() => {
          navigation.goBack()
        }}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
    </View>
  )
}

export default SaveButton
