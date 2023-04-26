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
                { name: 'vote_average', type: 'string' }, // rating
                { name: 'overview', type: 'string' } // overview
            ]
        }),
        tableSchema({
            name: KS_DB_FAVORITE, // might seem redundant but it's not; we can augment this table with more fields in the future
            columns: [{ name: 'movie_title', type: 'string' }]
        }),
        tableSchema({
            name: KS_DB_SETTING,
            columns: [
                { name: 'genre', type: 'string' },
                { name: 'sort_by', type: 'string' },
                { name: 'year', type: 'string' },
                { name: 'minDuration', type: 'string' },
                { name: 'maxDuration', type: 'string' }
            ]
        }),
        tableSchema({
            name: KS_DB_GENRE,
            columns: [{ name: 'name', type: 'string', isIndexed: true }]
        })
    ]
})
