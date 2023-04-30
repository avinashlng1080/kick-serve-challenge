import EmptyState from '@components/EmptyState'
import { SCREENS } from '@constants/screen'
import MovieModel from '@database/model/movie'
import { containerStyles } from '@lib/styles'
import { getMovies } from '@network/client'
import NetInfo from '@react-native-community/netinfo'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import KSList from './ks_list'
const keyExtractor = (item: MovieModel) => item.id

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
const Discover = ({ navigation, movies, favoriteIds }: DiscoverProps) => {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1) //fixme to be initialized with value from db

    // NETWORK REACHABILITY - we fetch the movies once we get back internet connection
    useEffect(() => {
        const netListner = NetInfo.addEventListener((state) => {
            if (state.isConnected) {
                getMovies()
            }
        })

        return () => netListner()
    }, [])

    const fetchNextPage = useCallback(() => {
        setLoading(true)
        const nextPage = page + 1
        getMovies(
            undefined,
            undefined,
            nextPage,
            undefined,
            undefined,
            undefined
        )
        setPage(nextPage)
        setLoading(false)
    }, [page])

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
                <KSList movies={movies} favoriteIds={favoriteIds} />
            )}
        </View>
    )
}

export default Discover
