import React, { cloneElement, isValidElement, memo } from 'react'
import reactFastCompare from 'react-fast-compare'

import AwesomeAnimation from 'components/imagery/AwesomeAnimation'

const AccordionLayout = (props) => {
    const {
        children,
        className,
        contentRef,
        contentStyles,
        isOpen,
        title,
        toggleAccordion,
        toggleElement,
    } = props

    return (
        <div className={`${className}${ isOpen ? ' open' : ''}`}>
            {isValidElement(toggleElement) ?
                cloneElement(toggleElement, {onClick: toggleAccordion})
                :
                <div className='accordion_title' onClick={toggleAccordion}>
                    <p className='accordion_title__text'>{title}</p>
                    <div className='title__arrow'>
                        <AwesomeAnimation hover size='2em' icon='angle-down' animation={isOpen ? 'upDown' : 'downUp'} />
                    </div>
                </div>
            }
            <div style={contentStyles} className='accordion__content_container' >
                <div ref={contentRef} className='accordion__content' >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default memo(AccordionLayout, reactFastCompare)
