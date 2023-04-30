import FavoriteIndicator from '@components/favorite_indicator/index'
import PosterImage from '@components/poster_image'
import Rating from '@components/rating'
import { convertToFiveStars, getReleasedYear } from '@lib/general'
import { textStyles } from '@lib/styles'
import MovieModel from 'database/model/movie'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const POSTER_WIDTH = 330 / 2
const POSTER_HEIGHT = 490 / 2

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        width: '90%',
        marginVertical: 10
    },
    imageContainer: {
        height: POSTER_HEIGHT,
        width: POSTER_WIDTH,
        borderRadius: 15,
        overflow: 'hidden'
    },
    movieDesc: {
        flexDirection: 'column',
        paddingTop: 20,
        paddingLeft: 20,
        flex: 1
    },
    title: {
        ...textStyles.h3,
        paddingRight: 10,
        marginBottom: 8
    },
    favorite: {
        position: 'absolute',
        right: 5,
        top: 5
    },
    posterContainer: {
        alignItems: 'center'
    }
})

type MovieCardProps = {
    movie: MovieModel
}
const MovieCard = ({ movie }: MovieCardProps) => {
    const { posterPath, title, movieId, voteAverage, releaseDate } = movie

    return (
        <View style={styles.mainContainer}>
            <View style={styles.posterContainer}>
                <PosterImage posterPath={posterPath} />
                <FavoriteIndicator
                    indicatorOn={movie.isFavorite}
                    movieId={movieId}
                    title={title}
                    posterPath={posterPath}
                    touchableStyles={styles.favorite}
                />
            </View>
            <View style={styles.movieDesc}>
                <Text
                    style={styles.title}
                    numberOfLines={2}
                    ellipsizeMode={'tail'}
                >
                    {title}
                </Text>
                <Rating rating={convertToFiveStars(voteAverage)} />
                <Text style={textStyles.paragraph}>
                    Horror, Mystery, Thriller
                </Text>
                <Text style={textStyles.paragraph}>
                    {getReleasedYear(releaseDate)}
                </Text>
            </View>
        </View>
    )
}

export default MovieCard
