import KSInput from '@components/ks_input'
import { textStyles } from '@lib/styles'
import { validateDate } from '@lib/time'
import React from 'react'
import { Text, View } from 'react-native'

const yearInputProps = {
    maxLength: 4,
    placeholder: '1990'
}

type YearProps = {
    onValueSet: (val: string) => void
}
const Year = ({ onValueSet }: YearProps) => {
    return (
        <View>
            <Text style={textStyles.h2}>Year</Text>
            <KSInput
                textInputProps={yearInputProps}
                validator={validateDate}
                onValueSet={onValueSet}
            />
        </View>
    )
}

export default Year
