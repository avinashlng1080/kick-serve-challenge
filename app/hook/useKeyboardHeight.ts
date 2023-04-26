import { useRef, useEffect } from 'react'
import { Animated, Keyboard, KeyboardEvent, Platform } from 'react-native'

const useKeyboardHeight = () => {
    const keyboardHeight = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const keyboardWillShow = (e: KeyboardEvent) => {
            Animated.timing(keyboardHeight, {
                duration: e.duration,
                toValue: e.endCoordinates.height,
                useNativeDriver: false
            }).start()
        }

        const keyboardWillHide = (e: KeyboardEvent) => {
            Animated.timing(keyboardHeight, {
                duration: e.duration,
                toValue: 0,
                useNativeDriver: false
            }).start()
        }

        const keyboardWillShowSub = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            keyboardWillShow
        )
        const keyboardWillHideSub = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            keyboardWillHide
        )

        return () => {
            keyboardWillHideSub.remove()
            keyboardWillShowSub.remove()
        }
    }, [keyboardHeight])

    return keyboardHeight
}
export default useKeyboardHeight
