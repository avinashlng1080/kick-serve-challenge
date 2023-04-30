import MovieCard from 'components/movie_card'
import MovieModel from 'database/model/movie'
import { getMovies } from 'network/client'
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'

const keyExtractor = (item: MovieModel) => item.title
const styles = StyleSheet.create({
    fullWidth: {
        width: '100%'
    },
    padded: {
        width: '90%'
    }
})
const KSList = ({ movies, favoriteIds }) => {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1) //fixme to be initialized with value from db

    const renderMovieCard = useCallback(({ item }: { item: MovieModel }) => {
        return <MovieCard movie={item} key={item.title} />
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

    return (
        <FlatList
            extraData={favoriteIds}
            contentContainerStyle={styles.fullWidth}
            style={styles.padded}
            data={movies}
            keyExtractor={keyExtractor}
            renderItem={renderMovieCard}
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.8}
            ListFooterComponent={<ActivityIndicator animating={loading} />}
        />
    )
}
export default KSList
