/**
 * Throws an error with the specified message if the value is falsy, an array of length 0, or an empty string, otherwise returns the value.
 * @template T The type of the value to check.
 * @param {T | unknown[]} value The value to check.
 * @param {string} errorMessage The error message to throw if the value is falsy, an array of length 0, or an empty string.
 * @returns {T} The value if it is truthy.
 * @throws {Error} Thrown if the value is falsy, an array of length 0, or an empty string.
 *
 * @example
 * // Check if value is falsy or an empty string
 * const stringValue = guard(
 *   '',
 *   'stringValue is empty'
 * );
 *
 * @example
 * // Check if value is falsy or an array of length 0
 * const emptyArray = guard(
 *   [],
 *   'emptyArray is empty'
 * );
 *
 * @example
 * // Check if value is falsy or an empty object
 * const emptyObject = guard(
 *   {},
 *   'emptyObject is empty'
 * );
 *
 * @example
 * // Check if value is null
 * const nullValue = guard(
 *   null,
 *   'nullValue is null'
 * );
 *
 * @example
 * // Check if value is undefined
 * const undefinedValue = guard(
 *   undefined,
 *   'undefinedValue is undefined'
 * );
 *
 * @example
 * // Check if value is NaN
 * const nanValue = guard(
 *   NaN,
 *   'nanValue is NaN'
 * );
 *
 * @example
 * // Check if value is truthy
 * const truthyValue = guard(
 *   'hello world',
 *   'truthyValue is falsy'
 * );
 */
export const guard = <T>(value: T | unknown[], errorMessage: string): T => {
    if (
        value === null ||
        value === undefined ||
        (typeof value === 'number' && isNaN(value)) ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'string' && value.trim() === '')
    ) {
        throw new Error(errorMessage)
    }
    return value as T
}
