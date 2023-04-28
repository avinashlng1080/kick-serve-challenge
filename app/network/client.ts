import DBHandler from '@database/handler'
import { logInfo } from '@lib/log'
import { makeQueryString } from '@lib/url'
import { create } from 'apisauce'
import Config from 'react-native-config'

const API_KEY: string | undefined = Config.API_KEY
const baseURL: string | undefined = Config.API_BASE_URL

const api = create({
    baseURL: baseURL,
    headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
    }
})

const maxTime = 'with_runtime.gte'
const minTime = 'with_runtime.lte'

export const getMovies = async (
    durationMax?: number,
    durationMin?: number,
    page?: number,
    sort_by?: string,
    with_genres?: string, // Comma separated value of genre ids that you want to include in the results
    year?: number
) => {
    const params = {
        [maxTime]: durationMax,
        [minTime]: durationMin,
        page: page,
        sort_by: sort_by,
        with_genres: with_genres,
        year: year
    }
    const queryString = makeQueryString(params)
    const route = `/discover/movie?api_key=${API_KEY}&${queryString}`
    const response = await api.get(route)

    if (response.ok) {
        const movies = response?.data?.results
        if (movies.length) {
            const movieHandler = await DBHandler.handleMovies(movies)
            return movieHandler
        }
    }
}
