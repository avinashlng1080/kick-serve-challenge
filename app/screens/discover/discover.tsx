import EmptyState from '@components/EmptyState'
import { SCREENS } from '@constants/screen'
import MovieModel from '@database/model/movie'
import { containerStyles } from '@lib/styles'
import { getMovies } from '@network/client'
import NetInfo from '@react-native-community/netinfo'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import KSList from './ks_list'

const styles = StyleSheet.create({
    container: {
        ...containerStyles,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fullWidth: {
        width: '100%'
    },
    padded: {
        width: '90%'
    }
})

type DiscoverProps = {
    navigation: any //todo: avoid type any
    movies: MovieModel[]
    favoriteIds: string[]
}
const Discover = ({ navigation, movies }: DiscoverProps) => {
    // NETWORK REACHABILITY - we fetch the movies once we get back internet connection
    useEffect(() => {
        const netListner = NetInfo.addEventListener((state) => {
            if (state.isConnected) {
                getMovies()
            }
        })

        return () => netListner()
    }, [])

    useEffect(() => {
        // retrieves all movies - without filter for the time being
        getMovies()
    }, [])

    return (
        <View style={styles.container}>
            {movies.length === 0 ? (
                <EmptyState
                    image={require('../../../assets/empty-discover.jpg')}
                    title="No results found"
                    message="Try adjusting the settings"
                    actionLabel="Go to Settings"
                    onAction={() => navigation.navigate(SCREENS.SETTINGS)}
                />
            ) : (
                <KSList />
            )}
        </View>
    )
}

export default Discover
