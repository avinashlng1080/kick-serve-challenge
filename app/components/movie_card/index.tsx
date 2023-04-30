import { KS_DB_MOVIE } from '@constants/database'
import MovieModel from '@database/model/movie'
import { Database, Q } from '@nozbe/watermelondb'
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider'
import withObservables from '@nozbe/with-observables'
import { switchMap } from 'rxjs/operators'

import MovieCard from './movie_card'

const enhanced = withObservables(
    ['movie'],
    ({ movie, database }: { movie: MovieModel; database: Database }) => ({
        movie: database
            .get<MovieModel>(KS_DB_MOVIE)
            .query(Q.where('movie_id', movie.movieId))
            .observe()
            .pipe(switchMap((movie) => movie))
    })
)

export default withDatabase(enhanced(MovieCard))
