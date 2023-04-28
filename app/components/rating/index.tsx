import { KSColors } from 'constants/theme'

import React from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

type StarRatingProps = {
    rating: number
    size?: number
    color?: string
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    }
})
const StarRating = ({
    rating,
    size = 20,
    color = KSColors.primary
}: StarRatingProps) => {
    const fullStars = Math.floor(rating)
    const halfStars = Math.round(rating - fullStars)
    const emptyStars = 5 - fullStars - halfStars

    const renderStar = (type: string) => {
        if (type === 'full') {
            return <Icon name="star" size={size} color={color} />
        } else if (type === 'half') {
            return <Icon name="star-half" size={size} color={color} />
        } else {
            return <Icon name="star-outline" size={size} color={color} />
        }
    }

    return (
        <View style={styles.container}>
            {Array(fullStars)
                .fill(fullStars)
                .map((_, index) => (
                    <View key={`full-${index}`}>{renderStar('full')}</View>
                ))}
            {Array(halfStars)
                .fill(halfStars)
                .map((_, index) => (
                    <View key={`half-${index}`}>{renderStar('half')}</View>
                ))}
            {Array(emptyStars)
                .fill(emptyStars)
                .map((_, index) => (
                    <View key={`empty-${index}`}>{renderStar('empty')}</View>
                ))}
        </View>
    )
}

export default StarRating
