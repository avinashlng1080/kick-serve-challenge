import React from 'react'
import { View } from 'react-native'

import { containerStyles } from '../../lib/styles'
import EmptyState from '../components/EmptyState'

export default function Discover({ navigation }) {
  return (
    <View style={containerStyles}>
      <EmptyState
        image={require('../../assets/empty-discover.jpg')}
        title="No results found"
        message="Try adjusting the settings"
        actionLabel="Go to Settings"
        onAction={() => navigation.navigate('Settings')}
      />
    </View>
  )
}
