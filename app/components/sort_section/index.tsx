import { textStyles } from '@lib/styles'
import React, { useCallback, useState } from 'react'
import { Text, View } from 'react-native'

import SortOption from '../sort_options'

type SortSectionProps = {
    onSort: (name: string) => void
}
const SortSection = ({ onSort }: SortSectionProps) => {
    const [sortBy, setSortBy] = useState('')

    const onSelect = useCallback(
        (name: string) => {
            setSortBy(name)
            onSort(name)
        },
        [onSort]
    )

    return (
        <View>
            <Text style={textStyles.h2}>Sort by</Text>
            <View>
                <SortOption
                    name="Popularity"
                    selected={sortBy === 'Popularity'}
                    onSelect={onSelect}
                />
                <SortOption
                    name="Rating"
                    selected={sortBy === 'Rating'}
                    onSelect={onSelect}
                />
                <SortOption
                    name="Newest First"
                    selected={sortBy === 'Newest First'}
                    onSelect={onSelect}
                />
                <SortOption
                    name="Oldest First"
                    selected={sortBy === 'Oldest First'}
                    onSelect={onSelect}
                />
            </View>
        </View>
    )
}

export default SortSection
