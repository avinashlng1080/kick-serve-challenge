import { KSColors, KSSizes } from 'constants/theme'

import React, { useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: KSColors.light,
    borderBottomWidth: 1
  }
})
const SortOption = ({ name, selected, onSelect }: OptionProps) => {
  const onPress = useCallback(() => {
    onSelect(name)
  }, [name, onSelect])

  return (
    <TouchableOpacity
      style={styles.sortOption}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text>{name}</Text>
      <Icon
        name={selected ? 'checkmark-circle' : 'ellipse-outline'}
        size={KSSizes.xxl}
        color={selected ? KSColors.primary : KSColors.black}
      />
    </TouchableOpacity>
  )
}

export default SortOption
