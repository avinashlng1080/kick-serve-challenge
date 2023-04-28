import React from 'react'
import { StyleSheet } from 'react-native'
import Config from 'react-native-config'
import FastImage from 'react-native-fast-image'

const POSTER_WIDTH = 330 / 2
const POSTER_HEIGHT = 490 / 2
const API_IMAGE_URL: string | undefined = Config.API_IMAGE_URL

const styles = StyleSheet.create({
    imageContainer: {
        height: POSTER_HEIGHT,
        width: POSTER_WIDTH,
        borderRadius: 15,
        overflow: 'hidden'
    }
})

type PosterImageProps = {
    posterPath: string
}
const PosterImage = ({ posterPath }: PosterImageProps) => {
    if (!API_IMAGE_URL) {
        return null
    }

    //NOTE: The below url can be moved into the env file
    const posterUrl = `${API_IMAGE_URL}${posterPath}`
    return (
        <FastImage
            style={styles.imageContainer}
            source={{
                uri: posterUrl,
                priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.contain}
            defaultSource={require('../../../assets/placeholder.png')}
        />
    )
}

export default PosterImage
