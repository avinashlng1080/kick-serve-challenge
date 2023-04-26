import { logError } from '@lib/log'
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import FavoriteModel from 'database/model/favorite'
import GenreModel from 'database/model/genre'
import MovieModel from 'database/model/movie'
import SettingModel from 'database/model/setting'

import migrations from '../migration'
import { KS_SCHEMA } from '../schema'

class DBManager {
    public database: Database | undefined

    public init = async () => {
        await this.createDatabase()
    }
    private createDatabase = async () => {
        try {
            const adapter = new SQLiteAdapter({
                schema: KS_SCHEMA,
                // (You might want to comment it out for development purposes -- see Migrations documentation)
                migrations,
                dbName: 'MoviesOnTheGo',
                // (recommended option, should work flawlessly out of the box on iOS. On Android,
                // additional installation steps have to be taken - disable if you run into issues...)
                jsi: true /* Platform.OS === 'ios' */,
                onSetUpError: (error) => {
                    // Database failed to load -- offer the user to reload the app or log out
                    logError('Database failed to load', error)
                }
            })

            const database = new Database({
                adapter,
                modelClasses: [
                    SettingModel,
                    FavoriteModel,
                    MovieModel,
                    GenreModel
                ]
            })
            this.database = database
            return database
        } catch (e) {
            logError(
                'An error occurred while creating a database in the DBManager',
                e
            )
        }
    }
}

export default new DBManager()
