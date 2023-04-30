import { KS_DB_MOVIE } from '@constants/database'
import MovieModel from '@database/model/movie'
import { Database } from '@nozbe/watermelondb'
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider'
import withObservables from '@nozbe/with-observables'

import DiscoverScreen from './discover'

const enhanced = withObservables(
    [],
    ({ database }: { movies: MovieModel[]; database: Database }) => ({
        movies: database.get<MovieModel>(KS_DB_MOVIE).query().observe()
    })
)

export default withDatabase(enhanced(DiscoverScreen))
