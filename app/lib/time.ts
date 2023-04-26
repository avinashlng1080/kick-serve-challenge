const minYear = 1895 // 1895 is the year the first movie was recorded
const maxYear = new Date().getFullYear()

export const convertToFourDigitYear = (twoDigitYear: number) => {
    const minYearLastTwoDigits = minYear % 100
    const maxYearLastTwoDigits = maxYear % 100
    const century = Math.floor(minYear / 100)

    if (
        twoDigitYear >= minYearLastTwoDigits &&
        twoDigitYear <= maxYearLastTwoDigits
    ) {
        return century * 100 + twoDigitYear
    } else {
        return (century + 1) * 100 + twoDigitYear
    }
}

/**
 * Validates a date input string by checking if it's a 2-digit or 4-digit year,
 * if it contains only digits, and whether it falls within the minYear and maxYear constraints.
 *
 * @param {string} value - The input value representing the year.
 * @returns {boolean} - Returns true if the input is a valid 2-digit or 4-digit year
 *                      consisting only of digits and within the minYear and maxYear constraints,
 *                      and false otherwise.
 *
 * @example
 * // Using the minYear and maxYear values 1895 and 2023:
 * validateDate('14'); // Returns true (corresponds to 1914)
 * validateDate('2022'); // Returns true
 * validateDate('1890'); // Returns false
 * validateDate('abcd'); // Returns false
 * validateDate('12345'); // Returns false
 * validateDate('20,22'); // Returns false
 * validateDate('20 22'); // Returns false
 * validateDate('20.22'); // Returns false
 * validateDate('20-22'); // Returns false
 */
export const validateDate = (value: string) => {
    const numberValue = Number(value)

    // Check if the input contains invalid characters
    if (!/^\d+$/.test(value)) {
        return false
    }

    if (isNaN(numberValue)) {
        return false
    } else if (value.length === 2) {
        const fourDigitYear = convertToFourDigitYear(numberValue)
        return fourDigitYear >= minYear && fourDigitYear <= maxYear
    } else if (value.length === 4) {
        const fourDigitYear = numberValue
        if (fourDigitYear < minYear || fourDigitYear > maxYear) {
            return false
        }
    } else {
        return false
    }
    return true
}

/**
 Validates if the given duration value is valid, it should be a positive integer between 1 and 300 (inclusive).
 @param {string} value - The input string value to be validated as a duration.
 @returns {boolean} - Returns a boolean value indicating whether the input value is a valid duration or not.
 @example
 validateDuration("10");  // Returns true
 validateDuration("-1"); // Returns false
 validateDuration("0"); // Returns false
 */
export const validateDuration = (value: string) => {
    if (!/^\d+$/.test(value)) {
        return false
    }

    const isValid =
        /^([1-9][0-9]*|0)$/.test(value) &&
        parseInt(value, 10) >= 1 &&
        parseInt(value, 10) <= 300
    return isValid
}
