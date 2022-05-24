import Grid from 'components/containers/Grid'
import React, { Fragment, memo, useCallback, useRef, useState } from 'react'
import reactFastCompare from 'react-fast-compare'

const generateObject = array => {
    const result = {}
    for(const key of array) {
        result[key] = false
    }
    return result
}

const RadioButton = (props) => {
    const {
        gap = '1em',
        columns,
        rows,
        direction = 'row',
        onChange,
        inputs = [],
        labels = {},
        likert = false,
    } = props

    const [value, setValue] = useState(generateObject(inputs))

    const currentValue = useRef('')

    const handleChange = useCallback((inputName) => {
        if (inputName === currentValue.current) return

        const currentInput = currentValue.current !== '' ? currentValue.current : ''
        const lastValue = currentInput !== '' ? { [currentInput]: false } : {}
        
        setValue(value => ({ ...value, ...lastValue, [inputName]: true }))
        typeof onChange === 'function' && onChange(inputName)
        
        currentValue.current = inputName
    }, [setValue, onChange])

    return (
        <Grid centerItems className='radio_button' {...{ columns, direction, gap, rows }}>
            {inputs.map(inputName => (
                <Fragment key={inputName}>
                    {labels[inputName] && <p>{labels[inputName]}</p>}
                    <div
                        className={`radio_button__input${value[inputName] ? ' checked' : ''}`}
                        onClick={() => handleChange(inputName)}>
                        <div className={`radio_button__circle${likert ? ` size__${Math.abs(inputName)+1}`:''}`} />
                    </div>
                </Fragment>
            ))}
        </Grid>
    )
}

export default memo(RadioButton, reactFastCompare)