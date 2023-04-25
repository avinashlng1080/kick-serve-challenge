import EmptyState from '@components/EmptyState'
import { containerStyles } from '@lib/styles'
import React from 'react'
import { View } from 'react-native'

type DiscoverProps = {
  navigation: any //todo: avoid type any
}
const Discover = ({ navigation }: DiscoverProps) => {
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

export default Discover
