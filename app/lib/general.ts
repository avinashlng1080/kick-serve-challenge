import { SCREENS } from 'constants/screen'

import { logError } from 'lib/log'
import { RouteName } from 'typings/general'

export const getReleasedYear = (date: string) => {
    let year
    try {
        year = new Date(date).getFullYear()
        return year
    } catch (err) {
        logError(err) // Output: Invalid Date
        return ''
    }
}

export const convertToFiveStars = (rating: number) => {
    // Ensure rating is between 1 and 10
    rating = Math.max(1, Math.min(10, rating))
    const scaledRating = ((rating - 1) / 9) * 5
    return Math.round(scaledRating * 2) / 2
}

export const getIconName = (
    routeName: (typeof SCREENS)[RouteName],
    focused: boolean
) => {
    const iconSet = {
        [SCREENS.HOME]: ['home', 'home-outline'], // fixme: why do we have home screen?
        [SCREENS.DISCOVER]: ['compass', 'compass-outline'],
        [SCREENS.FAVORITES]: ['heart', 'heart-outline']
    }

    const [focusedIcon, unfocusedIcon] = iconSet[routeName] || []
    return focused ? focusedIcon : unfocusedIcon
}
