import FilterMovie from '@components/filter_movie'
import HeaderLeft from '@components/header_left'
import { SCREENS } from '@constants/screen'
import { KSColors } from '@constants/theme'
import DBManager from '@database/manager'
import { getIconName } from '@lib/general'
import { Database } from '@nozbe/watermelondb'
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Discover from '@screens/discover'
import Favorites from '@screens/favorite'
import Settings from '@screens/Settings'
import { KSNavigation } from '@typings/general'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const tabOptions = ({ route }: { route: any }) => ({
    tabBarActiveTintColor: KSColors.primary,
    tabBarInactiveTintColor: KSColors.neutral,
    tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => {
        const iconName = getIconName(route.name, focused)
        return <Icon name={iconName} size={20} color={color} />
    }
})

const stackOptions = ({
    route,
    navigation
}: {
    route: any
    navigation: KSNavigation
}) => ({
    title: route.params?.name,
    headerBackVisible: false,
    headerLeft: ({ canGoBack }: { canGoBack: boolean }) => {
        return <HeaderLeft canGoBack={canGoBack} navigation={navigation} />
    }
})

function headerRight(navigation: KSNavigation) {
    return <FilterMovie navigation={navigation} />
}

function MainTab() {
    return (
        <Tab.Navigator screenOptions={tabOptions}>
            <Tab.Screen
                name={SCREENS.DISCOVER}
                component={Discover}
                options={({ navigation }) => ({
                    headerTitle: `${SCREENS.DISCOVER}`,
                    headerRight: () => headerRight(navigation)
                })}
            />
            <Tab.Screen
                name={SCREENS.FAVORITES}
                component={Favorites}
                options={() => ({
                    headerTitle: `${SCREENS.FAVORITES}`
                })}
            />
        </Tab.Navigator>
    )
}

function App() {
    const [database, setDatabase] = useState<Database | undefined>(undefined)

    useEffect(() => {
        const db = DBManager.getDatabase()
        if (db) {
            setDatabase(db)
        }
    }, [database])

    const Root = (
        <NavigationContainer>
            <Stack.Navigator screenOptions={stackOptions}>
                <Stack.Screen
                    name="MainTab"
                    component={MainTab}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={SCREENS.SETTINGS}
                    component={Settings}
                    options={() => ({
                        headerTitle: `${SCREENS.SETTINGS}`
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )

    if (database) {
        return (
            <SafeAreaProvider>
                <DatabaseProvider database={database}>{Root}</DatabaseProvider>
            </SafeAreaProvider>
        )
    }

    return <SafeAreaProvider>{Root}</SafeAreaProvider>
}

export default App
