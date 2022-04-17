import { Location, useLocation } from 'react-router-dom'
import { RegisterMode } from './useLessonQuery'
import { useLayoutEffect, useState } from 'react'

function getMode(location: Location): RegisterMode {
    return location.pathname === '/my_webinars' ? 'registered' : 'unregistered'
}

const useUrlQuery = () => {
    const location = useLocation()
    const [mode, setMode] = useState<RegisterMode>(() => getMode(location))
    useLayoutEffect(() => {
        const newMode = getMode(location)
        setMode(newMode)
    }, [location])
    return {
        mode,
    }
}

export default useUrlQuery
