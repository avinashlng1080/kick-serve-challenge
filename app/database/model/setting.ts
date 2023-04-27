import { KS_DB_SETTING } from 'constants/database'

import { text } from '@nozbe/watermelondb/decorators'
import Model from '@nozbe/watermelondb/Model'

export default class SettingModel extends Model {
    static table = KS_DB_SETTING

    @text('key') genre!: string

    @text('value') sortBy!: string
}
