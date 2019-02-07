import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    value,
    onChange,
    type,
    reset
  }
}

export const excludeReset = (fieldObject) => {
  const { reset, ...rest } = fieldObject
  return rest
}

