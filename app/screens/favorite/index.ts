import { KS_DB_MOVIE } from '@constants/database'
import { Database, Q } from '@nozbe/watermelondb'
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider'
import withObservables from '@nozbe/with-observables'
import MovieModel from 'database/model/movie'

import Favorites from './favorites'

const enhanced = withObservables(
    [],
    ({ database }: { database: Database }) => ({
        favorites: database
            .get<MovieModel>(KS_DB_MOVIE)
            .query(Q.where('is_favorite', true))
            .observeWithColumns(['movie_id', 'movie_title', 'poster_path'])
    })
)

export default withDatabase(enhanced(Favorites))
