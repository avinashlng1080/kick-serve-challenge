import { KS_DB_MOVIE } from '@constants/database'
import MovieModel from '@database/model/movie'
import { FieldMapper, KS_DB_TABLES, OperationType } from '@typings/database'

import type { Database, Model } from '@nozbe/watermelondb'

export const transformMovieRecord = (
    action: OperationType,
    database: Database,
    rawMovie: DiscoverMovie,
    recordMovie?: MovieModel
): Promise<MovieModel> => {
    const fieldsMapper = (movie: MovieModel) => {
        movie.movieId = `${rawMovie.id}`
        movie.genreIds = rawMovie.genre_ids.join(',')
        movie.posterPath = rawMovie.poster_path
        movie.releaseDate = rawMovie.release_date
        movie.title = rawMovie.title
        movie.voteAverage = rawMovie.vote_average
        movie.overview = rawMovie.overview
        movie.isFavorite = rawMovie.overview ?? false
        //todo: should we add the is_favorite field here?
    }

    return prepareBaseRecord(
        action,
        database,
        KS_DB_MOVIE,
        rawMovie,
        fieldsMapper as FieldMapper,
        recordMovie
    ) as Promise<MovieModel>
}
//
// export const transformFavoriteRecord = (
//     action: OperationType,
//     database: Database,
//     raw: DiscoverMovie, // fixme: ???
//     record?: MovieModel
// ): Promise<MovieModel> => {
//     const fieldsMapper = (fav: FavoriteModel) => {
//         fav.movieId = raw.id
//         fav.movieTitle = raw.title
//     }
//
//     return prepareBaseRecord(
//         action,
//         database,
//         KS_DB_FAVORITE,
//         raw,
//         fieldsMapper as FieldMapper,
//         record
//     ) as Promise<MovieModel>
// }
//
// type SettingsKey = keyof typeof KS_SETTINGS_IDENTIFIERS
//
// export const transformSettingRecord = (
//     action: OperationType,
//     database: Database,
//     raw: SettingsKey,
//     record?: MovieModel
// ): Promise<MovieModel> => {
//     const fieldsMapper = (setting: SettingModel) => {
//         setting.key = raw.key
//         setting.value = raw.key
//     }
//
//     return prepareBaseRecord(
//         action,
//         database,
//         KS_DB_FAVORITE,
//         raw,
//         fieldsMapper as FieldMapper,
//         record
//     ) as Promise<MovieModel>
// }
//
// export const transformGenreRecord = (
//     action: OperationType,
//     database: Database,
//     raw: SettingsKey, // fixme: ???
//     record?: GenreModel
// ): Promise<GenreModel> => {
//     const fieldsMapper = (setting: SettingModel) => {
//         setting.key = raw.key
//         setting.value = raw.key
//     }
//
//     return prepareBaseRecord(
//         action,
//         database,
//         KS_DB_FAVORITE,
//         raw,
//         fieldsMapper as FieldMapper,
//         record
//     ) as Promise<GenreModel>
// }

export const prepareBaseRecord = async (
    action: OperationType,
    database: Database,
    tableName: KS_DB_TABLES,
    rawMovie: DiscoverMovie,
    fieldsMapper: FieldMapper,
    record?: Model
): Promise<Model> => {
    if (action === OperationType.UPDATE && record) {
        return record.prepareUpdate(() => fieldsMapper(record))
    }

    return database.collections.get(tableName!).prepareCreate(fieldsMapper)
}
