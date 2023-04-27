import {
    KS_DB_FAVORITE,
    KS_DB_GENRE,
    KS_DB_MOVIE,
    KS_DB_SETTING
} from 'constants/database'

import { Model } from '@nozbe/watermelondb'

export enum OperationType {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE'
}

export type FieldMapper = (model: Model) => void

export type KS_DB_TABLES =
    | typeof KS_DB_MOVIE
    | typeof KS_DB_FAVORITE
    | typeof KS_DB_SETTING
    | typeof KS_DB_GENRE
