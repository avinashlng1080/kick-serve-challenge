import { KS_DB_TABLES } from '@typings/database'
import MovieModel from 'database/model/movie'

/**
 * Creates a Map object from an array of objects with a specified key function.
 * @template T The type of objects in the array.
 * @param {T[]} array The array of objects to convert to a Map.
 * @param {(item: T) => number | string} key The function that extracts the key from each object in the array.
 * @returns {Map<number | string, T>} A Map object with the specified key function.
 */
export const createMapByKey = <T>(
    array: T[],
    key: (item: T) => number | string
): Map<number | string, T> => {
    const map = new Map<number | string, T>()
    for (const item of array) {
        map.set(key(item), item)
    }
    return map
}

/**
 * Returns an array of existing records of the specified type from a database.
 * @template T The type of objects in the database.
 * @param {any} database The database object.
 * @param {KS_DB_TABLES} tableName  Targets only registered tables
 * @returns {Promise<T[]>} A promise that resolves to an array of objects of the specified type.
 */
export const getExistingRecords = async <T>(
    database: any,
    tableName: KS_DB_TABLES
): Promise<T[]> =>
    (await database.collections.get(tableName).query().fetch()) as T[]

type CreateOrUpdateType = {
    createRaws: DiscoverMovie[]
    updateRaws: DiscoverMovie[]
    updateRecordMap: Map<number | string, MovieModel>
}
export const getCreateOrUpdateRecords = (
    movies: DiscoverMovie[],
    movieRecords: MovieModel[],
    movieRawMap: Map<number | string, DiscoverMovie>
): CreateOrUpdateType => {
    const createRaws: DiscoverMovie[] = []
    const updateRaws: DiscoverMovie[] = []
    const updateRecordMap: Map<number | string, MovieModel> = new Map()

    if (movieRecords.length === 0) {
        // no existing movies in the database => create operation
        return {
            createRaws: movies,
            updateRaws: [],
            updateRecordMap
        }
    }

    movieRecords.forEach((movie) => {
        if (movieRawMap.has(movie.movieId)) {
            // movie already exists in the database => update operation
            updateRaws.push(movieRawMap.get(movie.movieId)!)
            updateRecordMap.set(movie.movieId, movie)
        } else {
            // movie does not exist in the database => create operation
            createRaws.push(movieRawMap.get(movie.movieId) as DiscoverMovie)
        }
    })

    return { createRaws, updateRaws, updateRecordMap }
}
