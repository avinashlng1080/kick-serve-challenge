import GenreSection from '@components/genre_section'
import Runtime from '@components/runtime'
import SaveButton from '@components/save_button'
import SortSection from '@components/sort_section'
import Year from '@components/year'
import { containerStyles } from '@lib/styles'
import useKeyboardHeight from 'hook/useKeyboardHeight'
import React, { useCallback, useState } from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View
} from 'react-native'

const EMPTY_STRING = ''

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 30,
        paddingVertical: 30,
        gap: 30
    },
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingBottom: Platform.OS === 'ios' ? 150 : 50 // Add extra padding at the bottom for the iOS keyboard
    }
})

//todo: make the screen scroll to the selected text input
export default function Settings() {
    const [year, setYear] = useState(EMPTY_STRING)

    const onYearSet = useCallback((val: string) => {
        setYear(val)
    }, [])

    // Handling the appearance of the Software Keyboard and sticking the Save button just to the top of the keyboard
    const keyboardHeight = useKeyboardHeight()

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[containerStyles]}
        >
            <ScrollView
                contentContainerStyle={styles.contentContainerStyle}
                keyboardShouldPersistTaps={
                    Platform.OS === 'ios' ? 'handled' : 'always'
                }
            >
                <View style={styles.wrapper}>
                    <SortSection />
                    <GenreSection />
                    <Year onValueSet={onYearSet} />
                    <Runtime />
                </View>
            </ScrollView>
            <SaveButton offSet={keyboardHeight} />
        </KeyboardAvoidingView>
    )
}
