import { KSColors, KSFontWeights, KSSizes } from 'constants/theme'

import { StyleSheet } from 'react-native'

export const textStyles = StyleSheet.create({
    small: {
        fontSize: KSSizes.sm,
        color: KSColors.neutral,
        fontFamily: 'Ionicons'
    },
    paragraph: {
        fontSize: KSSizes.md,
        color: KSColors.neutral,
        marginBottom: 5,
        fontFamily: 'Ionicons'
    },
    h1: {
        fontSize: KSSizes.xxl,
        fontWeight: 'bold',
        color: KSColors.black,
        marginBottom: 8,
        fontFamily: 'Ionicons'
    },
    h2: {
        fontSize: KSSizes.xl,
        color: KSColors.black,
        fontWeight: 'bold',
        marginBottom: 16,
        fontFamily: 'Ionicons'
    },
    h3: {
        fontSize: KSSizes.lg,
        color: KSColors.black,
        fontWeight: 'bold',
        marginBottom: 8,
        fontFamily: 'Ionicons'
    },
    h4: {
        fontSize: KSSizes.md,
        color: KSColors.black,
        fontWeight: KSFontWeights.normal,
        marginBottom: 8,
        fontFamily: 'Ionicons'
    }
})

export const textInputStyles = StyleSheet.create({
    input: {
        backgroundColor: KSColors.light,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        fontSize: 14,
        width: 80
    }
})

export const containerStyles = {
    flex: 1,
    backgroundColor: '#ffffff'
}
