import { textInputStyles } from '@lib/styles'
import React, { useEffect, useState } from 'react'
import { TextInput, TextInputProps } from 'react-native'

type KSInputProps = {
    textInputProps?: Partial<TextInputProps>
    validator: (val: string) => boolean

    onValueSet: (val: string) => void
}

const EMPTY_VALUE = ''
const KSInput = ({ textInputProps, validator, onValueSet }: KSInputProps) => {
    const [val, setVal] = useState(
        textInputProps?.value ? textInputProps?.value : EMPTY_VALUE
    )
    const [isValid, setIsValid] = useState(1)

    useEffect(() => {
        const hasValidValue = validator(val)
        if (val.length > 0) {
            setIsValid(hasValidValue ? 1 : -1)
            onValueSet(hasValidValue ? val : '')
        }
    }, [val, validator, onValueSet])

    return (
        <TextInput
            style={[
                textInputStyles.input,
                isValid === -1 && val !== '' && { backgroundColor: 'red' }
            ]}
            value={val}
            keyboardType="number-pad"
            onChangeText={setVal}
            {...textInputProps}
        />
    )
}

export default KSInput
