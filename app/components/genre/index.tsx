import { KSColors, KSSizes } from 'constants/theme'

import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  selectedGenre: {
    backgroundColor: KSColors.primary,
    borderColor: KSColors.primary
  },
  genre: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderColor: KSColors.black,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center'
  },
  selectedGenreText: {
    color: KSColors.white
  }
})

const Genre = ({ name, selected, onSelect }: OptionProps) => {
  return (
    <TouchableOpacity
      style={[styles.genre, selected ? styles.selectedGenre : undefined]}
      activeOpacity={0.7}
      onPress={onSelect}
    >
      <Text style={[selected ? styles.selectedGenreText : undefined]}>
        {name}
      </Text>
      {selected && (
        <Icon
          name="close-outline"
          size={KSSizes.lg}
          color={KSColors.white}
          testID="close-icon"
        />
      )}
    </TouchableOpacity>
  )
}

export default Genre
