import React, { memo } from 'react'
import reactFastCompare from 'react-fast-compare'

import useAccordion from './hooks/useAccordion'
import AccordionLayout from './AccordionLayout'

const Accordion = (props) => {
    /*------------------------------------PROPS--------------------------------*/
    let { className } = props
    const { children, title, toggleElement } = props

    /*------------------------------------HOOKS--------------------------------*/
    const { isOpen, contentRef, getContentSize, toggleAccordion } = useAccordion()

    /*------------------------------------RENDER--------------------------------*/
    const contentStyles = { height: isOpen ? `${getContentSize()}px` : 0 }
    className = className ? `${className} accordion` : 'accordion'

    return <AccordionLayout {...{
        children,
        className,
        contentRef,
        contentStyles,
        isOpen,
        title,
        toggleAccordion,
        toggleElement
    }} />
}

export default memo(Accordion, reactFastCompare)
