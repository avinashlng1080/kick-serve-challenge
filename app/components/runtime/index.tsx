import KSInput from '@components/ks_input'
import { KSColors } from '@constants/theme'
import { textStyles } from '@lib/styles'
import { validateDuration } from '@lib/time'
import React, { useCallback, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
    runtime: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    }
})

type RunTimeProps = {}
//todo: UX to show a toast indicating the user that a max of 300 minutes is allowed
const EMPTY_VALUE = ''
const RunTime = ({}: RunTimeProps) => {
    const [minDuration, setMinDuration] = useState(EMPTY_VALUE)
    const [maxDuration, setMaxDuration] = useState(EMPTY_VALUE)

    const validateMinMax = useCallback((min: string, max: string) => {
        // you can have only min or only max, or both
        if ((min && !max) || (!min && max)) {
            return true
        }

        if (min && max) {
            const isValid = parseInt(min, 10) <= parseInt(max, 10)
            if (!isValid) {
                return Alert.alert(
                    'Invalid duration',
                    'The From value cannot be higher than the To value',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                console.log('>>>  here')
                                setMinDuration(EMPTY_VALUE)
                                setMaxDuration(EMPTY_VALUE)
                            }
                        }
                    ]
                )
            }
        }
    }, [])

    return (
        <View>
            <Text style={textStyles.h2}>Runtime</Text>
            <View style={styles.runtime}>
                <KSInput // if this value is empty, we default it to 0
                    textInputProps={{
                        maxLength: 3,
                        placeholder: 'From',
                        placeholderTextColor: KSColors.neutral,
                        onEndEditing: () => {
                            validateMinMax(minDuration, maxDuration)
                        },
                        value: minDuration
                    }}
                    validator={validateDuration}
                    onValueSet={setMinDuration}
                />
                <Text style={textStyles.small}>-</Text>
                <KSInput // if this value is empty, we default it to 300 min to prevent too many movies from showing up...we can find the max runtime of a movie and set it to that
                    textInputProps={{
                        maxLength: 3,
                        placeholder: 'To',
                        placeholderTextColor: KSColors.neutral,
                        onEndEditing: () => {
                            validateMinMax(minDuration, maxDuration)
                        },
                        value: maxDuration
                    }}
                    validator={validateDuration}
                    onValueSet={setMaxDuration}
                />
                <Text style={textStyles.small}>minutes</Text>
            </View>
        </View>
    )
}

export default RunTime
