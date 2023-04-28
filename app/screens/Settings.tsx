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
const EMPTY_ARR: number[] = []

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
    const [year, setYear] = useState(EMPTY_STRING) // todo: to be initailized from db
    const [sort, setSort] = useState(EMPTY_STRING) // todo: to be initailized from db
    const [minDuration, setMinDuration] = useState(EMPTY_STRING) // todo: to be initailized from db
    const [maxDuration, setMaxDuration] = useState(EMPTY_STRING) // todo: to be initailized from db
    const [genreIds, setGenreIds] = useState<number[]>(EMPTY_ARR) // todo: to be initailized from db

    const onYearSet = useCallback((val: string) => {
        setYear(val)
    }, [])

    const onSort = useCallback((sortBy: string) => {
        setSort(sortBy)
    }, [])

    const onGenreSelection = useCallback((ids: number[]) => {
        setGenreIds(ids)
    }, [])

    const onSetDuration = useCallback((min: string, max: string) => {
        setMinDuration(min)
        setMaxDuration(max)
    }, [])

    const onSave = useCallback(() => {
        //todo : save settings
    }, [])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={containerStyles}
        >
            <ScrollView
                contentContainerStyle={styles.contentContainerStyle}
                keyboardShouldPersistTaps={
                    Platform.OS === 'ios' ? 'handled' : 'always'
                }
            >
                <View style={styles.wrapper}>
                    <SortSection onSort={onSort} />
                    <GenreSection onGenreSelection={onGenreSelection} />
                    <Year onValueSet={onYearSet} />
                    <Runtime onSetDuration={onSetDuration} />
                </View>
            </ScrollView>
            <SaveButton onSave={onSave} />
        </KeyboardAvoidingView>
    )
}
