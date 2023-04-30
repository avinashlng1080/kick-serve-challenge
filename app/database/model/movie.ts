import { KS_DB_MOVIE } from 'constants/database'

import { field, text } from '@nozbe/watermelondb/decorators'
import Model from '@nozbe/watermelondb/Model'

export default class MovieModel extends Model {
    static table = KS_DB_MOVIE

    @text('genre_ids') genreIds!: string // a comma-separated list of genres

    @text('poster_path') posterPath!: string // image

    @text('release_date') releaseDate!: string // release year

    @text('title') title!: string //fixme: include tests and appropriate fields

    @field('vote_average') voteAverage!: number // rating

    @text('overview') overview!: string // overview

    @field('movie_id') movieId!: string // id from Rest API
    @field('is_favorite') isFavorite!: boolean
}
