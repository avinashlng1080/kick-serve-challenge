import { KSColors, KSFontWeights, KSSizes } from 'constants/theme'

import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image'

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 200,
    marginBottom: 10
  },
  title: {
    fontSize: KSSizes.xl,
    color: KSColors.black,
    fontWeight: KSFontWeights.bold,
    marginBottom: 0
  },
  message: {
    marginTop: 0,
    fontSize: KSSizes.md,
    color: KSColors.neutral,
    marginBottom: 14
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 10
  },
  button: {
    backgroundColor: KSColors.black,
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 16
  },
  buttonText: {
    color: KSColors.white,
    fontSize: KSSizes.md,
    fontWeight: KSFontWeights.bold
  }
})

type EmptyStateProps = {
  image: ImageSourcePropType
  title: string
  message: string
  actionLabel: string
  onAction: () => void
}
export default function EmptyState({
  image,
  title,
  message,
  actionLabel,
  onAction
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => onAction()}
      >
        <Text style={styles.buttonText}>{actionLabel}</Text>
      </TouchableOpacity>
    </View>
  )
}
