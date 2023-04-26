import { KSColors, KSFontWeights, KSSizes } from 'constants/theme'

import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
    Animated,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableHighlight
} from 'react-native'

import Value = Animated.Value

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: KSColors.black,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        backgroundColor: KSColors.white,
        borderTopColor: KSColors.light,
        borderTopWidth: 1,
        paddingHorizontal: 30,
        paddingVertical: 16
    },
    buttonText: {
        color: KSColors.white,
        fontSize: KSSizes.md,
        fontWeight: KSFontWeights.bold
    }
})
type SaveButtonProps = {
    offSet: Value
}
const SaveButton = ({ offSet }: SaveButtonProps) => {
    const navigation = useNavigation()

    return (
        <Animated.View
            style={[
                styles.buttonContainer,
                Platform.OS === 'ios' && Boolean(offSet) && { bottom: offSet } //fixme: test on physical Android phone
            ]}
        >
            <SafeAreaView>
                <TouchableHighlight
                    activeOpacity={0.7}
                    underlayColor={KSColors.neutral}
                    style={styles.button}
                    onPress={() => {
                        //fixme: save settings
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </SafeAreaView>
        </Animated.View>
    )
}

export default SaveButton
