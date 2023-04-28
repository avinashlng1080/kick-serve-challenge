import { KS_DB_FAVORITE } from '@constants/database'
import { Database } from '@nozbe/watermelondb'
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider'
import withObservables from '@nozbe/with-observables'
import FavoriteModel from 'database/model/favorite'

import Favorites from './favorites'

const enhanced = withObservables(
    [],
    ({ database }: { database: Database }) => ({
        favorites: database
            .get<FavoriteModel>(KS_DB_FAVORITE)
            .query()
            .observeWithColumns(['movie_id', 'movie_title', 'poster_path'])
    })
)

export default withDatabase(enhanced(Favorites))
