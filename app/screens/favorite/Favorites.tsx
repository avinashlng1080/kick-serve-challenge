import EmptyState from '@components/EmptyState'
import FavoriteCard from '@components/favorite_card'
import { SCREENS } from '@constants/screen'
import FavoriteModel from '@database/model/favorite'
import { containerStyles } from '@lib/styles'
import { KSNavigation } from '@typings/general'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

const keyExtractor = (item: FavoriteModel) => item.id

const styles = StyleSheet.create({
    container: {
        ...containerStyles,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fullWidth: {
        width: '100%'
    },
    padded: {
        width: '90%'
    },
    columnWrapperStyle: {
        marginTop: 20,
        justifyContent: 'space-around'
    }
})

type FavoritesProps = {
    navigation: KSNavigation
    favorites: FavoriteModel[]
}
const Favorites = ({ navigation, favorites }: FavoritesProps) => {
    const [isEmptyState, setIsEmptyState] = useState(favorites.length === 0)

    const renderFavoriteCard = useCallback(
        ({ item }: { item: FavoriteModel }) => {
            return (
                <FavoriteCard
                    movieId={item.movieId}
                    posterPath={item.posterPath}
                    title={item.movieTitle}
                />
            )
        },
        []
    )

    useEffect(() => {
        setIsEmptyState(favorites.length === 0)
    }, [favorites])

    return (
        <View style={styles.container}>
            {isEmptyState ? (
                <EmptyState
                    image={require('../../../assets/empty-favorites.jpg')}
                    title="You haven't liked any movie yet"
                    message="Why not try to find a movie you like?"
                    actionLabel="Go to Discover"
                    onAction={() => navigation.navigate(SCREENS.DISCOVER)}
                />
            ) : (
                <FlatList
                    contentContainerStyle={styles.fullWidth}
                    style={styles.padded}
                    data={favorites}
                    keyExtractor={keyExtractor}
                    renderItem={renderFavoriteCard}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapperStyle}
                />
            )}
        </View>
    )
}

export default Favorites
