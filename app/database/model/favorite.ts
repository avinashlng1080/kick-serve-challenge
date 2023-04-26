import { KS_DB_FAVORITE, KS_DB_MOVIE } from 'constants/database'

import { relation, text } from '@nozbe/watermelondb/decorators'
import Model, { Associations } from '@nozbe/watermelondb/Model'

import MovieModel from './movie'

import type { Relation } from '@nozbe/watermelondb'

export default class FavoriteModel extends Model {
    static table = KS_DB_FAVORITE

    static associations: Associations = {
        [KS_DB_MOVIE]: { type: 'belongs_to', key: 'id' }
    }

    @text('movie_title') movieTitle!: string
    @relation(KS_DB_MOVIE, 'id') movie!: Relation<MovieModel>
}
