import { KS_DB_MOVIE } from 'constants/database'

import { Database } from '@nozbe/watermelondb'
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider'
import withObservables from '@nozbe/with-observables'
import MovieCard from 'components/movie_card'
import MovieModel from 'database/model/movie'
import { getMovies } from 'network/client'
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'

// SOLUTION: keyExtractor by concatenating title and isFavorite, we make sure that the id actually changes and re-renders the list
const keyExtractor = (item: MovieModel) => `${item.title}-${item.isFavorite}`

const styles = StyleSheet.create({
    fullWidth: {
        width: '100%'
    },
    padded: {
        width: '90%'
    }
})

type KSListProps = {
    movies: MovieModel[]
}

const KSList = ({ movies }: KSListProps) => {
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

const enhanced = withObservables(
    [],
    ({ database }: { database: Database }) => ({
        movies: database
            .get<MovieModel>(KS_DB_MOVIE)
            .query()
            .observeWithColumns(['is_favorite']) // SOLUTION: observeWithColumns to re-render the list when is_favorite changes
    })
)

export default withDatabase(enhanced(KSList))
// export default KSList
