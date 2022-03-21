import { useEffect, useState } from 'react'

const useResizeObserver = element => {
    const [resize, setResize] = useState(0)

    useEffect(() => {
        if(!element) return

        const resizeObserver = new ResizeObserver(() => {
            setResize(resize => resize+1)
        })

        resizeObserver.observe(element)
    }, [setResize, element])

    return resize
}

export default useResizeObserver