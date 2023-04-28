import { KSColors } from 'constants/theme'

import { amendFavorite } from '@database/actions'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import React, { useCallback, useState } from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    View,
    StyleProp,
    ViewStyle
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: KSColors.white
    }
})

type FavoriteIndicatorProps = {
    movieId: string
    posterPath: string
    title: string
    touchableStyles: StyleProp<ViewStyle>
    indicatorOn: boolean
}

const FavoriteIndicator = ({
    movieId,
    posterPath,
    title,
    touchableStyles,
    indicatorOn
}: FavoriteIndicatorProps) => {
    const [isFavorite, setIsFavorite] = useState(indicatorOn)
    const database = useDatabase()

    const handlePress = useCallback(async () => {
        const newFavorite = !isFavorite
        setIsFavorite(newFavorite)
        await amendFavorite(database, movieId, title, posterPath, newFavorite)
    }, [movieId, isFavorite, database, posterPath, title])

    return (
        <TouchableOpacity
            style={[styles.container, touchableStyles]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View>
                {isFavorite ? (
                    <Icon name="heart" size={25} color={KSColors.primary} />
                ) : (
                    <Icon name="heart-outline" size={25} color="black" />
                )}
            </View>
        </TouchableOpacity>
    )
}

export default FavoriteIndicator
