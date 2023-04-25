import { KSColors, KSSizes } from 'constants/theme'

import { SCREENS } from '@constants/screen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Settings from '@screens/Settings'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import Discover from 'screens/Discover'
import Favorites from 'screens/Favorites'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

type RouteName = keyof typeof SCREENS

//todo: review the TS typings properly in this file https://reactnavigation.org/docs/typescript/
const getIconName = (
  routeName: (typeof SCREENS)[RouteName],
  focused: boolean
) => {
  const iconSet = {
    [SCREENS.HOME]: ['home', 'home-outline'],
    [SCREENS.DISCOVER]: ['compass', 'compass-outline'],
    [SCREENS.FAVORITES]: ['heart', 'heart-outline']
  }

  const [focusedIcon, unfocusedIcon] = iconSet[routeName] || []
  return focused ? focusedIcon : unfocusedIcon
}

const tabOptions = ({ route }: { route: any }) => ({
  tabBarActiveTintColor: KSColors.primary,
  tabBarInactiveTintColor: KSColors.neutral,
  tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => {
    // fixme: needed?
    const iconName = getIconName(route.name, focused)
    return <Icon name={iconName} size={20} color={color} />
  }
})

const stackOptions = ({
  route,
  navigation
}: {
  route: any
  navigation: any
}) => ({
  title: route.params?.name,
  headerBackVisible: false,
  headerLeft: ({ canGoBack }: { canGoBack: boolean }) => {
    // fixme: needed?
    if (!canGoBack) {
      return null
    }

    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={KSSizes.xxl} color={KSColors.black} />
      </TouchableOpacity>
    )
  }
})

function Main() {
  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{ headerTitle: 'Discover' }}
      />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  )
}

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={stackOptions}>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 5
  }
})

export default App
