


export const useHexes = () => {
  const formatHex = (hex: string) => {
    if (hex?.toString()?.length === 9) {
      return hex?.slice(0, -2)
    } else if (hex?.toString()?.length === 7) {
      return hex
    }
    return new Error('Invalid hex color')
  }

  const AddMidOpacity = (hex: string) => {
    return formatHex(hex) + '52'
  }

  const AddLightOpacity = (hex: string) => {
    return formatHex(hex) + '1a'
  }

  const AddDeepOpacity = (hex: string) => {
    return formatHex(hex) + ""
  }
  return {
    AddMidOpacity,
    AddLightOpacity,
    AddDeepOpacity
  }
}