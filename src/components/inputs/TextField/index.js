import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import reactFastCompare from 'react-fast-compare'

const TextField = forwardRef( function TextField (props, ref) {
    /*------------------------------------PROPS--------------------------------*/
    let { className, label, value = '', onChange, placeholder, ...rest } = props
    
    /*------------------------------------STATE---------------------------------*/
    const [focused, setFocused] = useState(false)

    /*------------------------------------REFS--------------------------*/
    const textFieldRef = useRef()

    /*------------------------------------FUNCTIONS--------------------------*/
    const handleFocus = useCallback(() => {
        setFocused(focused => !focused)
    }, [])

    const handleChange = useCallback((e) => {
        onChange(e.target.value)
    }, [])

    /*------------------------------------EXTERNAL FUNCTIONS-------------------------------*/
    useImperativeHandle(ref, () => ({
        focus: () => textFieldRef.current.focus(),
        value,
    }), [textFieldRef, value])

    /*------------------------------------EFFECT-------------------------------*/
    useEffect(() => () => {}, [])

    /*------------------------------------RENDER-------------------------------*/
    className = className ? `${className} text_field_container` : 'text_field_container'
    
    !label && (className += ' no_label')
    if(value !== '' || focused) className += ' label_up'
    focused && (className += ' focused')
    
    return (
        <div className={className}>
            {label && <label className='text_field__label'>{label}</label>}
            <div className='text_field'>
                <input 
                    ref={textFieldRef}
                    className='text_field__input' 
                    onChange={handleChange} 
                    onFocus={handleFocus} 
                    onBlur={handleFocus}
                    placeholder={(focused || !label) ? placeholder:''}
                    {...{value, ...rest}}
                />
                <fieldset className='text_field__fieldset'>
                    <legend className='text_field__legend'>{label}</legend>
                </fieldset>
            </div>
        </div>
    )
})

export default memo(TextField, reactFastCompare)
