export const makeQueryString = (params: any) => {
    const validParams: Record<string, any> = {}
    for (const key in params) {
        if (
            params[key] !== undefined &&
            params[key] !== null &&
            params[key] !== ''
        ) {
            // Use encodeURIComponent to encode the parameter value
            validParams[key] = encodeURIComponent(params[key])
        }
    }
    const searchParams = new URLSearchParams(validParams)
    return searchParams.toString()
}
