import EmptyState from '@components/EmptyState'
import MovieCard from '@components/movie_card'
import { SCREENS } from '@constants/screen'
import MovieModel from '@database/model/movie'
import { containerStyles } from '@lib/styles'
import { getMovies } from '@network/client'
import NetInfo from '@react-native-community/netinfo'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'

const keyExtractor = (item: MovieModel) => item.id

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
    }
})

type DiscoverProps = {
    navigation: any //todo: avoid type any
    movies: MovieModel[]
}
const Discover = ({ navigation, movies }: DiscoverProps) => {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1) //fixme to be initialized with value from db

    // NETWORK REACHABILITY - we fetch the movies once we get back internet connection
    useEffect(() => {
        const netListner = NetInfo.addEventListener((state) => {
            if (state.isConnected) {
                getMovies()
            }
        })

        return () => netListner()
    }, [])

    const fetchNextPage = useCallback(() => {
        setLoading(true)
        const nextPage = page + 1
        getMovies(
            undefined,
            undefined,
            nextPage,
            undefined,
            undefined,
            undefined
        )
        setPage(nextPage)
        setLoading(false)
    }, [page])

    const renderMovieCard = useCallback(({ item }: { item: MovieModel }) => {
        return <MovieCard movie={item} />
    }, [])

    useEffect(() => {
        // retrieves all movies - without filter for the time being
        getMovies()
    }, [])

    return (
        <View style={styles.container}>
            {movies.length === 0 ? (
                <EmptyState
                    image={require('../../../assets/empty-discover.jpg')}
                    title="No results found"
                    message="Try adjusting the settings"
                    actionLabel="Go to Settings"
                    onAction={() => navigation.navigate(SCREENS.SETTINGS)}
                />
            ) : (
                <FlatList
                    contentContainerStyle={styles.fullWidth}
                    style={styles.padded}
                    data={movies}
                    keyExtractor={keyExtractor}
                    renderItem={renderMovieCard}
                    onEndReached={fetchNextPage}
                    onEndReachedThreshold={0.8}
                    ListFooterComponent={
                        <ActivityIndicator animating={loading} />
                    }
                />
            )}
        </View>
    )
}

export default Discover
