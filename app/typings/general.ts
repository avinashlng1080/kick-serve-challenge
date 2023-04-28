import { SCREENS } from 'constants/screen'

import { NavigationProp } from '@react-navigation/native'

export type KSNavigation = NavigationProp<any, any>

export type RouteName = keyof typeof SCREENS
