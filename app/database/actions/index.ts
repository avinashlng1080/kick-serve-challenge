import { KS_DB_FAVORITE } from 'constants/database'

import { Database, Q } from '@nozbe/watermelondb'
import FavoriteModel from 'database/model/favorite'
import { logError } from 'lib/log'

export const amendFavorite = async (
    database: Database,
    movieId: string,
    movieTitle: string,
    posterPath: string,
    isFavorite: boolean
) => {
    try {
        if (!isFavorite) {
            // remove from favorite table
            const favRecord = await database
                .get<FavoriteModel>(KS_DB_FAVORITE)
                .query(Q.where('movie_id', movieId))

            if (favRecord?.[0]) {
                await database.write(async () => {
                    await favRecord?.[0].destroyPermanently()
                })
            }
            return
        }

        const newFavorite = await database.write(async () => {
            const favRecord = await database
                .get<FavoriteModel>(KS_DB_FAVORITE)
                .create((fav) => {
                    fav.movieId = movieId
                    fav.movieTitle = movieTitle
                    fav.posterPath = posterPath
                })

            return favRecord
        })
    } catch (e) {
        logError('amendFavorite ', movieTitle, e)
    }
}
