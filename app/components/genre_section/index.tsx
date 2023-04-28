import { textStyles } from '@lib/styles'
import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Genre from '../genre'

const styles = StyleSheet.create({
    genreList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10
    }
})

type GenreSectionProps = {
    onGenreSelection: (genreIds: number[]) => void
}

const GenreSection = ({ onGenreSelection }: GenreSectionProps) => {
    const [selectedGenres, setSelectedGenres] = useState(new Set())

    const onSelect = useCallback(
        (selectedGenre: string) => {
            const newSelection = new Set(selectedGenres) // a new set so that React recognizes a state change
            if (newSelection.has(selectedGenre)) {
                newSelection.delete(selectedGenre)
            } else {
                newSelection.add(selectedGenre)
            }
            setSelectedGenres(newSelection)
            onGenreSelection(Array.from(newSelection) as number[])
            // return newSelection

            // setSelectedGenres((prevSelectedGenres) => {
            //     const newSelection = new Set(prevSelectedGenres) // a new set so that React recognizes a state change
            //     if (newSelection.has(selectedGenre)) {
            //         newSelection.delete(selectedGenre)
            //     } else {
            //         newSelection.add(selectedGenre)
            //     }
            //     return newSelection
            // })
        },
        [selectedGenres, onGenreSelection]
    )

    return (
        <View>
            <Text style={textStyles.h2}>Genres</Text>
            <View style={styles.genreList}>
                <Genre
                    name="Action"
                    selected={selectedGenres.has('Action')}
                    onSelect={onSelect}
                />
                <Genre
                    name="Adventure"
                    selected={selectedGenres.has('Adventure')}
                    onSelect={onSelect}
                />
                <Genre
                    name="Animation"
                    selected={selectedGenres.has('Animation')}
                    onSelect={onSelect}
                />
            </View>
        </View>
    )
}

export default GenreSection
