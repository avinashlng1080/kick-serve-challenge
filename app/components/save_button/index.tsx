import { KSColors, KSFontWeights, KSSizes } from 'constants/theme'

import useKeyboardHeight from '@hook/useKeyboardHeight'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import {
    Animated,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native'

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
    onSave: () => void
}
const SaveButton = ({ onSave }: SaveButtonProps) => {
    const navigation = useNavigation()

    // Handling the appearance of the Software Keyboard and sticking the Save button just to the top of the keyboard
    const keyboardHeight = useKeyboardHeight()

    const goBack = useCallback(() => {
        //todo: await here and save page to 1 in the db
        onSave()
        return navigation.goBack()
    }, [navigation, onSave])

    return (
        <View
            style={[
                styles.buttonContainer
                // Platform.OS === 'ios' &&
                //     Boolean(keyboardHeight) && { bottom: keyboardHeight } //fixme: test on physical Android phone
            ]}
        >
            <SafeAreaView>
                <TouchableHighlight
                    activeOpacity={0.7}
                    underlayColor={KSColors.neutral}
                    style={styles.button}
                    onPress={goBack}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </SafeAreaView>
        </View>
    )
}

export default SaveButton
