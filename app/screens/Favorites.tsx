import EmptyState from '@components/EmptyState'
import { containerStyles } from '@lib/styles'
import React from 'react'
import { View } from 'react-native'

type FavoritesProps = {
  navigation: any //todo: avoid type any
}
const Favorites = ({ navigation }: FavoritesProps) => {
  return (
    <View style={containerStyles}>
      <EmptyState
        image={require('../../assets/empty-favorites.jpg')}
        title="You haven't liked any movie yet"
        message="Why not try to find a movie you like?"
        actionLabel="Go to Discover"
        onAction={() => navigation.navigate('Discover')}
      />
    </View>
  )
}

export default Favorites
