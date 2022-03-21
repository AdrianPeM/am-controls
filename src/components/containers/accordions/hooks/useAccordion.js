import { useCallback, useRef, useState } from 'react'
import { useResizeObserver } from "hooks"

const useAccordion = () => {

    /*------------------------------------STATE--------------------------------*/
    const [isOpen, setIsOpen] = useState(false)

    /*------------------------------------REFS--------------------------------*/
    const contentRef = useRef()

    /*------------------------------------FUNCTIONS--------------------------------*/
    const getContentSize = useCallback(() => contentRef.current.scrollHeight, [])

    const toggleAccordion = useCallback(() => {
        setIsOpen(isOp => !isOp)
    }, [setIsOpen])

    /*------------------------------------EFFECT--------------------------------*/
    useResizeObserver(contentRef.current)
    
    return { isOpen, toggleAccordion, getContentSize, contentRef }

}

export default useAccordion