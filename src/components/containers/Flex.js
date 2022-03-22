import React, { forwardRef, memo, useMemo } from 'react'
import reactFastCompare from 'react-fast-compare'

const Flex = (props, ref) => {
    let { className, } = props

    const {
        children, style, padding, margin, direction,
        align, justify, wrap, w100, h100,
        ...rest
    } = props

    const newStyle = useMemo(() => ({
        display: 'flex',
        padding,
        margin,
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap && 'wrap',
        width: w100 && '100%',
        height: h100 && '100%',
        ...style
    }), [padding, margin, direction, align, justify, wrap, w100, h100, style])

    className = className ? `${className} grid` : 'grid'

    return (
        <div ref={ref} {...{ ...rest, className, style: newStyle }}>
            {children}
        </div>
    )
}

export default memo(forwardRef(Flex), reactFastCompare)