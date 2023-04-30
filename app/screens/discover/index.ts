import { KS_DB_FAVORITE, KS_DB_MOVIE } from '@constants/database'
import MovieModel from '@database/model/movie'
import { Database } from '@nozbe/watermelondb'
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider'
import withObservables from '@nozbe/with-observables'
import FavoriteModel from 'database/model/favorite'
import { of as of$ } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import DiscoverScreen from './discover'

const enhanced = withObservables(
    [],
    ({ database }: { movies: MovieModel[]; database: Database }) => ({
        movies: database.get<MovieModel>(KS_DB_MOVIE).query().observe(),
        favoriteIds: database
            .get<FavoriteModel>(KS_DB_FAVORITE)
            .query()
            .observeWithColumns(['movie_id', 'movie_title'])
            .pipe(
                switchMap((favorites: FavoriteModel[]) =>
                    of$(
                        favorites.map(
                            (favorite: FavoriteModel) => favorite.movieId
                        )
                    )
                )
            )
    })
)

export default withDatabase(enhanced(DiscoverScreen))
