interface KSColor {
  light: string
  neutral: string
  black: string
  white: string
  primary: string
}

interface KSFontWeight {
  normal: string
  bold: string
}

interface KSSize {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  xxl: number
}

interface KSTextStyle {
  [key: string]: {
    fontSize: number
    color: string
    fontWeight?: string
    marginBottom?: number
  }
}

interface KSContainerStyle {
  flex: number
  backgroundColor: string
}
