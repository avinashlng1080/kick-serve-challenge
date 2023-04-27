import { KS_DB_MOVIE } from '@constants/database'
import DBManager from '@database/manager'
import MovieModel from '@database/model/movie'
import { transformMovieRecord } from '@database/transformer'
import {
    createMapByKey,
    getCreateOrUpdateRecords,
    getExistingRecords
} from '@lib/database'
import { guard } from '@lib/guard'
import { logError } from '@lib/log'
import { KS_DB_TABLES, OperationType } from '@typings/database'

import type { Database, Model } from '@nozbe/watermelondb'
class DatabaseHandler {
    /**
     * batchRecords: Accepts an instance of Database (either Default or Server) and an array of
     * prepareCreate/prepareUpdate 'models' and executes the actions on the database.
     * @param database
     * @param {Model[]} models
     * @returns {Promise<void>}
     */
    batchRecords = async (
        database: Database,
        models: Model[]
    ): Promise<void> => {
        try {
            if (models.length > 0) {
                await database.write(async (writer) => {
                    await writer.batch(models)
                })
            }
        } catch (e) {
            logError('batchRecords error ', e as Error)
        }
    }

    prepareRecords = async <T extends Model>(
        database: Database,
        tableName: KS_DB_TABLES,
        createRaws: DiscoverMovie[], // raw data from API //fixme: add proper type here
        updateRaws: DiscoverMovie[], // raw data from API
        updateRecordMap: Map<number | string, Model>,
        transformer: any //fixme: add proper type here
    ): Promise<T[]> => {
        let preparedRecords: Array<Promise<T>> = []

        // create operation
        if (createRaws?.length) {
            const recordPromises = createRaws.map((createRecord: any) => {
                return transformer(OperationType.CREATE, database, createRecord)
            })
            preparedRecords = preparedRecords.concat(recordPromises)
        }

        // // update operation
        if (updateRaws?.length) {
            const recordPromises = updateRaws.map((updraw) => {
                const existingRecord = updateRecordMap.get(updraw.id)
                return transformer(
                    OperationType.UPDATE,
                    database,
                    updraw,
                    existingRecord
                )
            })

            preparedRecords = preparedRecords.concat(recordPromises)
        }

        const results = (await Promise.all(preparedRecords)) as T[]

        return results
    }

    async handleMovies(movies: DiscoverMovie[]): Promise<Model[]> {
        try {
            // early guard to throw against empty movies array
            guard(movies, 'handleMovies - Empty movies array')
            const database = await DBManager.getDatabase()
            // early guard to throw against database not being initialized
            guard(database, 'handleMovies - Database not initialized')

            // each movie has a unique id, so we create a map as it provides constant time complexity for lookups
            const moviesMap: Map<number | string, DiscoverMovie> =
                createMapByKey(movies, (movie) => movie.id)

            // retrieve existing records from the KS_DB_MOVIE table
            const existingMovies = await getExistingRecords<MovieModel>(
                database,
                KS_DB_MOVIE
            )

            const { createRaws, updateRaws, updateRecordMap } =
                getCreateOrUpdateRecords(movies, existingMovies, moviesMap)

            const models = await this.prepareRecords(
                database!,
                KS_DB_MOVIE,
                createRaws,
                updateRaws,
                updateRecordMap,
                transformMovieRecord
            )

            if (models?.length) {
                await this.batchRecords(database!, models)
            }

            return models
        } catch (e) {
            logError('handleMovies', e as Error)
            return []
        }
    }
}

export default new DatabaseHandler()
