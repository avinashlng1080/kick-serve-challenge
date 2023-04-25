import GenreSection from '@components/genre_section'
import Runtime from '@components/runtime'
import SaveButton from '@components/save_button'
import Year from '@components/year'
import { containerStyles } from '@lib/styles'
import React, { useMemo } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    gap: 30
  }
})

export default function Settings() {
  const insets = useSafeAreaInsets()

  const screenStyle = useMemo(
    () => [
      containerStyles,
      {
        paddingBottom: insets.bottom
      }
    ],
    [insets.bottom]
  )

  return (
    <View style={screenStyle}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <GenreSection />
        <Year />
        <Runtime />
      </ScrollView>
      <SaveButton />
    </View>
  )
}
