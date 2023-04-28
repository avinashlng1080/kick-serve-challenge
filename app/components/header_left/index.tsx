import { KSColors, KSSizes } from 'constants/theme'

import React, { useCallback } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { KSNavigation } from 'typings/general'

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 5
    }
})

type HeaderLeftProp = {
    navigation: KSNavigation
    canGoBack: boolean
}
const HeaderLeft = ({ navigation, canGoBack }: HeaderLeftProp) => {
    const goBack = useCallback(() => {
        return navigation.goBack()
    }, [navigation])

    if (!canGoBack) {
        return null
    }

    return (
        <TouchableOpacity style={styles.button} onPress={goBack}>
            <Icon
                name="chevron-back"
                size={KSSizes.xxl}
                color={KSColors.black}
            />
        </TouchableOpacity>
    )
}

export default HeaderLeft
