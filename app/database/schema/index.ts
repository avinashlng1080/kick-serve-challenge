import {
    KS_DB_FAVORITE,
    KS_DB_GENRE,
    KS_DB_MOVIE,
    KS_DB_SETTING
} from '@constants/database'
import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const KS_SCHEMA = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: KS_DB_MOVIE, // todo: id from Rest API should overwrite native id for each movie record
            columns: [
                { name: 'genre_ids', type: 'string' }, // a comma-separated list of genres
                { name: 'poster_path', type: 'string' }, // image
                { name: 'release_date', type: 'string' }, // release year
                { name: 'title', type: 'string', isIndexed: true }, //fixme: include tests and appropriate fields
                { name: 'vote_average', type: 'number' }, // rating
                { name: 'overview', type: 'string' }, // overview
                { name: 'movie_id', type: 'number' } // id from Rest API
            ]
        }),
        tableSchema({
            name: KS_DB_FAVORITE, // might seem redundant but it's not; we can augment this table with more fields in the future
            columns: [
                { name: 'movie_title', type: 'string' },
                { name: 'movie_id', type: 'number' }
            ]
        }),
        tableSchema({
            name: KS_DB_SETTING, // key-value settings, see KS_SETTINGS_IDENTIFIERS
            columns: [
                { name: 'key', type: 'string' },
                { name: 'value', type: 'string' }
            ]
        }),
        tableSchema({
            name: KS_DB_GENRE,
            columns: [
                { name: 'genre', type: 'string', isIndexed: true },
                { name: 'genre_id', type: 'string', isIndexed: true }
            ]
        })
    ]
})
