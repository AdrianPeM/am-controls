import { forwardRef, memo, useMemo } from "react"
import reactFastCompare from 'react-fast-compare'

const Grid = (props, ref) => {
    let {
        className, style,
    } = props

    const {
        children, padding, margin, gap, columns, rows, autoColumns, autoRows,
        direction, itemsX, itemsY, contentX, contentY,
        centerContent, centerItems, w100, h100,
        ...rest
    } = props

    style = useMemo(() => {
        return {display: 'grid',
        padding: padding,
        margin: margin,
        gap: gap,
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
        gridAutoColumns: autoColumns,
        gridAutoRows: autoRows,
        gridAutoFlow: direction,
        justifyItems: itemsX,
        alignItems: itemsY,
        justifyContent: contentX,
        alignContent: contentY,
        placeContent: centerContent && 'center',
        placeItems: centerItems && 'center',
        width: w100 && '100%',
        height: h100 && '100%',
        ...style}
    }, [padding, margin, gap, columns, rows, autoColumns, autoRows,
        direction, centerContent, centerItems,
        itemsX, itemsY, contentX, contentY, w100, h100])

    className = className ? `${className} grid` : 'grid'
    
    return (
        <div ref={ref} {...{ className, style, ...rest }}>
            {children}
        </div>
    )
}

export default memo(forwardRef(Grid), reactFastCompare)