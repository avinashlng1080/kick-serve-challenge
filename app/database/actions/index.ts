import { KS_DB_MOVIE } from 'constants/database'

import { Database, Q } from '@nozbe/watermelondb'
import MovieModel from 'database/model/movie'
import { logError } from 'lib/log'

export const amendFavorite = async (
    database: Database,
    movieId: string,
    movieTitle: string,
    posterPath: string,
    isFavorite: boolean
) => {
    try {
        // find the movie record
        const records = await database
            .get<MovieModel>(KS_DB_MOVIE)
            .query(Q.where('movie_id', movieId), Q.take(1))

        const movieRecord = records?.[0]

        if (movieRecord) {
            await database.write(async () => {
                await movieRecord.update((movie: MovieModel) => {
                    movie.isFavorite = isFavorite
                })
            })
        }
    } catch (e) {
        logError('amendFavorite ', movieTitle, e)
    }
}
