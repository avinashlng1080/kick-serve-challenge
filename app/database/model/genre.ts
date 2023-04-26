import { KS_DB_GENRE } from 'constants/database'

import { text } from '@nozbe/watermelondb/decorators'
import Model from '@nozbe/watermelondb/Model'

export default class GenreModel extends Model {
    static table = KS_DB_GENRE

    @text('name') name!: string
}
