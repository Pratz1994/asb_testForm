const isMinMax = (data: { value: string; config: any }) => {
    const value = data.value.trim()
    const config = data.config
    const limit = config.minmax_limit
    const suffix = config.minmax_suffix
    const nullAllow = config.allow_null ? true : false
    if (nullAllow && value.length < 1) return true
    return value.length === limit ? true : 'must be ' + limit + ' ' + suffix
  }
  
  export default isMinMax
  