import Grid from 'components/containers/Grid'
import React, { Fragment, memo, useCallback, useRef, useState } from 'react'
import reactFastCompare from 'react-fast-compare'

const RadioButton = (props) => {
    const {
        gap = '0.25em',
        columns,
        rows,
        direction = 'row',
        onChange,
        inputs = {},
        labels = {},
    } = props

    const [value, setValue] = useState(inputs)

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
            {Object.keys(inputs).map(inputName => (
                <Fragment key={`frag-${inputName}`}>
                    {labels[inputName] && <p key={`lbl-${inputName}`}>{labels[inputName]}</p>}
                    <div key={inputName} className={`radio_button__input${value[inputName] ? ' checked' : ''}`} onClick={() => handleChange(inputName)}>
                        <div className='radio_button__circle' />
                    </div>
                </Fragment>
            ))}
        </Grid>
    )
}

export default memo(RadioButton, reactFastCompare)