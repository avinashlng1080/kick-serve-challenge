import { KS_DB_FAVORITE, KS_DB_MOVIE } from 'constants/database'

import { Relation } from '@nozbe/watermelondb'
import { field, relation, text } from '@nozbe/watermelondb/decorators'
import Model, { Associations } from '@nozbe/watermelondb/Model'

import FavoriteModel from './favorite'

export default class MovieModel extends Model {
    static table = KS_DB_MOVIE
    static associations: Associations = {
        [KS_DB_FAVORITE]: { type: 'has_many', foreignKey: 'movie_id' }
    }

    @text('genre_ids') genreIds!: string // a comma-separated list of genres

    @text('poster_path') posterPath!: string // image

    @text('release_date') releaseDate!: string // release year

    @text('title') title!: string //fixme: include tests and appropriate fields

    @field('vote_average') voteAverage!: number // rating

    @text('overview') overview!: string // overview

    @field('movie_id') movieId!: string // id from Rest API

    @relation(KS_DB_FAVORITE, 'movie_id') favorite!: Relation<FavoriteModel>
}
