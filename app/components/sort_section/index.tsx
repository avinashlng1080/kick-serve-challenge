import { textStyles } from 'lib/styles'
import React from 'react'
import { Text, View } from 'react-native'

import SortOption from '../sort_options'

type SortSectionProps = {}
const SortSection = ({}: SortSectionProps) => {
  return (
    <View>
      <Text style={textStyles.h2}>Sort by</Text>
      <View>
        <SortOption name="Popularity" selected={true} />
        <SortOption name="Rating" selected={false} />
        <SortOption name="Newest First" selected={false} />
        <SortOption name="Oldest First" selected={false} />
      </View>
    </View>
  )
}

export default SortSection
