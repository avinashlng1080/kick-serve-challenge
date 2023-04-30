import withObservables from '@nozbe/with-observables'
import MovieCard from 'components/movie_card'
import MovieModel from 'database/model/movie'
import React, { useCallback } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import { of as of$, combineLatest } from 'rxjs'

import DiscoverScreen from './discover'

const enhanced = withObservables(
    ['movies', 'favoriteIds'],
    ({ movies, favoriteIds }) => ({
        movies: of$(movies),
        favoriteIds: of$(favoriteIds)
    })
)
const keyExtractor = (item: MovieModel) => item.id

const KSList = ({ movies, favoriteIds }) => {
    const renderMovieCard = useCallback(({ item }: { item: MovieModel }) => {
        return <MovieCard movie={item} key={item.title} />
    }, [])

    return (
        <FlatList
            extraData={favoriteIds}
            // contentContainerStyle={styles.fullWidth}
            // style={styles.padded}
            data={movies}
            keyExtractor={keyExtractor}
            renderItem={renderMovieCard}
            // onEndReached={fetchNextPage}
            // onEndReachedThreshold={0.8}
            // ListFooterComponent={<ActivityIndicator animating={loading} />}
        />
    )
}
export default enhanced(KSList)
