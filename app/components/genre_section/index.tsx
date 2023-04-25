import { textStyles } from 'lib/styles'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Genre from '../genre'

const styles = StyleSheet.create({
  genreList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  }
})
//todo: lose the empty View in favor of fragments ?
type GenreSectionProps = {}
const GenreSection = ({}: GenreSectionProps) => {
  return (
    <View>
      <Text style={textStyles.h2}>Genres</Text>
      <View style={styles.genreList}>
        <Genre name="Action" selected={false} />
        <Genre name="Adventure" selected={false} />
        <Genre name="Animation" selected={false} />
      </View>
    </View>
  )
}

export default GenreSection
