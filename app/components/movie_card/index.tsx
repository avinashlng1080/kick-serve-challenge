import { KS_DB_FAVORITE } from '@constants/database'
import MovieModel from '@database/model/movie'
import { Database, Q } from '@nozbe/watermelondb'
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider'
import withObservables from '@nozbe/with-observables'
import FavoriteModel from 'database/model/favorite'

import MovieCard from './movie_card'

const enhanced = withObservables(
    ['movie'],
    ({ movie, database }: { movie: MovieModel; database: Database }) => ({
        favorite: database
            .get<FavoriteModel>(KS_DB_FAVORITE)
            .query(Q.where('movie_id', movie.movieId))
            .observe()
    })
)

export default withDatabase(enhanced(MovieCard))
