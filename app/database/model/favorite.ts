import { KS_DB_FAVORITE } from '@constants/database'
import { field, text } from '@nozbe/watermelondb/decorators'
import Model from '@nozbe/watermelondb/Model'

export default class FavoriteModel extends Model {
    static table = KS_DB_FAVORITE

    @text('movie_title') movieTitle!: string

    @field('movie_id') movieId!: string // id from Rest API

    @text('poster_path') posterPath!: string // image
}
