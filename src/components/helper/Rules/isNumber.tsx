const isNumber = (data: { value: any }) => {
    let value = data.value
    value = value.trim()
    return !isNaN(value) ? true : 'must be all numbers'
  }
  
  export default isNumber
  