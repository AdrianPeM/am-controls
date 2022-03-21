import { useEffect, useState } from 'react'

import { useOnResizeWindow } from 'hooks'

import { screenSizes } from 'scripts/generalVariables'

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState('')

    const checkscreenSizes = () => {

        if (window.matchMedia(`(min-width: ${screenSizes['4k']}px)`).matches)
            return screenSize !== screenSizes['$4k'] ? setScreenSize(screenSizes['$4k']) : null

        if (window.matchMedia(`(min-width: ${screenSizes['tv']}px)`).matches)
            return screenSize !== screenSizes['tv'] ? setScreenSize(screenSizes['tv']) : null

        if (window.matchMedia(`(min-width: ${screenSizes['desktop']}px)`).matches)
            return screenSize !== screenSizes['desktop'] ? setScreenSize(screenSizes['desktop']) : null


        if (window.matchMedia(`(min-width: ${screenSizes['laptop']}px)`).matches)
            return screenSize !== screenSizes['laptop'] ? setScreenSize(screenSizes['laptop']) : null

        if (window.matchMedia(`(min-width: ${screenSizes['tablet']}px)`).matches)
            return screenSize !== screenSizes['tablet'] ? setScreenSize(screenSizes['tablet']) : null

        return screenSize !== screenSizes['mobile'] ? setScreenSize(screenSizes['mobile']) : null
    }

    useOnResizeWindow(() => {
        checkscreenSizes()
    }, [screenSize])

    useEffect(() => {
        checkscreenSizes()
    }, [])

    return screenSize
}

export default useScreenSize