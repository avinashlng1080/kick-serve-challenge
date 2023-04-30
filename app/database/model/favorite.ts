import { KS_DB_FAVORITE, KS_DB_MOVIE } from '@constants/database'
import MovieModel from '@database/model/movie'
import { Relation } from '@nozbe/watermelondb'
import { field, relation, text } from '@nozbe/watermelondb/decorators'
import Model, { Associations } from '@nozbe/watermelondb/Model'

export default class FavoriteModel extends Model {
    static table = KS_DB_FAVORITE

    static associations: Associations = {
        [KS_DB_MOVIE]: { type: 'belongs_to', key: 'movie_id' }
    }

    @text('movie_title') movieTitle!: string

    @field('movie_id') movieId!: string // id from Rest API

    @text('poster_path') posterPath!: string // image

    @relation(KS_DB_MOVIE, 'id') movie!: Relation<MovieModel>
}
