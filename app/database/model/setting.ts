import { KS_DB_SETTING } from 'constants/database'

import { text } from '@nozbe/watermelondb/decorators'
import Model from '@nozbe/watermelondb/Model'

export default class SettingModel extends Model {
    static table = KS_DB_SETTING

    @text('genre') genre!: string

    @text('sort_by') sortBy!: string

    @text('year') year!: string

    @text('minDuration') minDuration!: string

    @text('maxDuration') maxDuration!: string
}
