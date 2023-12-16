import React, { useEffect, useState } from 'react'
import { UseDebounce } from '~/utils/interface'

const UseDebounce = ({ value, delay }: UseDebounce) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}

export default UseDebounce
