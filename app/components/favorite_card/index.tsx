import PosterImage from '@components/poster_image'
import { textStyles } from '@lib/styles'
import FavoriteIndicator from 'components/favorite_indicator'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const POSTER_WIDTH = (500 / 1170) * 100
const POSTER_HEIGHT = (750 / 2532) * 100

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        width: `${POSTER_WIDTH}%`,
        alignItems: 'center'
    },
    posterImageContainer: {
        width: `${POSTER_WIDTH}%`,
        height: `${POSTER_HEIGHT}%`
    },
    posterContainer: {
        alignItems: 'center'
    },
    movieDesc: {
        flexDirection: 'column'
    },
    title: {
        ...textStyles.h3,
        // paddingRight: 10,
        marginVertical: 8
        // flex: 1
    },
    favorite: {
        position: 'absolute',
        right: 10,
        top: 10
    }
})

type FavoriteCardProps = {
    movieId: string
    posterPath: string

    title: string
}
const FavoriteCard = ({ posterPath, title, movieId }: FavoriteCardProps) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.posterContainer}>
                <PosterImage posterPath={posterPath} />
                <FavoriteIndicator
                    touchableStyles={styles.favorite}
                    posterPath={posterPath}
                    indicatorOn={true} // true as it is showing in the favorite screen
                    movieId={movieId}
                    title={title}
                />
            </View>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>
                {title}
            </Text>
        </View>
    )
}

export default FavoriteCard
