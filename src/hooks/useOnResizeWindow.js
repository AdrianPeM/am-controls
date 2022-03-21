import {useEffect} from 'react'

const useOnResizeWindow = (callback, v = []) => {
    const onResize = e => {
        callback(e)
    }
    
    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, v)
}

export default useOnResizeWindow