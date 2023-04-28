import { SCREENS } from 'constants/screen'

import { KSNavigation } from '@typings/general'
import React, { useCallback } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
    container: {
        marginRight: 20
    }
})

type FilterMovieProps = {
    navigation: KSNavigation
}

const FilterMovie = ({ navigation }: FilterMovieProps) => {
    const handlePress = useCallback(() => {
        return navigation.navigate(SCREENS.SETTINGS)
    }, [navigation])

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Ionicons name="filter-outline" size={24} color="black" />
        </TouchableOpacity>
    )
}

export default FilterMovie
