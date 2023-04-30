import MovieModel from 'database/model/movie'

export const movieComparator = (raw: DiscoverMovie, record: MovieModel) => {
    // returns true if raw.id === record.movieId
    return `${raw.id}` === record.movieId
}
