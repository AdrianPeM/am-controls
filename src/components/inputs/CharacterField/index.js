import React, { createRef, forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

const CharacterField = (props, ref) => {
    //--------------------PROPS--------------------
    const {
        length = 1,
        value = '',
        onChange = () => { }
    } = props

    const lengthArray = [...Array(length).keys()]

    //--------------------STATE--------------------
    const [inputValue, setValue] = useState([...value])

    //--------------------REF--------------------
    const inputsRef = useRef(lengthArray.map(() => createRef()))

    //--------------------FUNCTIONS--------------------
    const cursorToEnd = (i) => {
        setTimeout(() => {
            document.activeElement.setSelectionRange(1, 1)
        }, 30)
    }

    const handleFocus = (e) => {
        if (inputValue.length === length) {
            inputsRef.current[length - 1].current.focus()
            return
        }

        inputsRef.current[inputValue.length].current.focus()
    }

    const handleChange = (v, i) => {
        setValue(val => {
            val[i] = v.toUpperCase()
            if (i === length - 1 && v === '') val.pop()
            onChange(val)
            return val
        })

        inputsRef.current[i].current.value = inputsRef.current[i].current.value.toUpperCase()

        if (i === length - 1) return

        inputsRef.current[i + 1].current.focus()
    }

    const handleDelete = (e, i) => {
        if (e.target.value === '' && (e.key === 'Backspace' || e.key === 'Delete')) {
            if (i === 0) return e.preventDefault()

            setValue(val => {
                val.pop()
                onChange(val)
                return val
            })

            inputsRef.current[i - 1].current.value = ''
            inputsRef.current[i - 1].current.focus()
            return
        }

        if (e.target.value !== '' && i === length - 1 && e.key !== 'Backspace' && e.key !== 'Delete')
            return e.preventDefault()
    }

    const handlePaste = async (e) => {
        try {
            e.preventDefault()
            const text = await navigator.clipboard.readText()

            inputsRef.current.map((ref, i) => {
                ref.current.value = text[i]
                setValue(val => {
                    val[i] = text[i]
                    return val
                })
            })
            
            onChange(text.slice(0, length))

            e.target.blur()
        } catch (error) {
            console.log(error)
        }
    }

    const handleReset = useCallback(() => {
        inputsRef.current.forEach(ref => { 
            ref.current.value = ''
            setValue(val => {
                val.pop()
                return val
            })
        })
        onChange('')
        
    }, [inputsRef, onChange])
    
    //--------------------IMPERATIVEHANDLE--------------------
    useImperativeHandle(ref, () => ({
        reset: handleReset
    }), [handleReset])
    
    //--------------------EFFECT--------------------
    useEffect(() => {
        if (value !== '')
            inputsRef.current.map((ref, i) => { ref.current.value = value[i] })

        return () => { }
    }, [])

    //--------------------RENDER--------------------
    const inputs = useMemo(() => lengthArray.map((i) => {
        return <input
            key={i}
            className='character_field__input'
            ref={inputsRef.current[i]}
            type='text'
            maxLength={1}
            onClick={cursorToEnd}
            onFocus={handleFocus}
            onPaste={handlePaste}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleDelete(e, i)}
        />
    }), [length])

    return (
        <div className='character_field'>
            {inputs}
        </div>
    )
}

export default memo(forwardRef(CharacterField))
