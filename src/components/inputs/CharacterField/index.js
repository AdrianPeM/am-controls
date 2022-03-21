import React, { createRef, forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

const generateArray = length => [...Array(parseInt(length)).keys()]

const CharacterField = (props, ref) => {
    //--------------------PROPS--------------------
    let { className } = props
    const {
        length = 1,
        initValue = '',
        onChange = () => {}
    } = props

    const lengthArray = useMemo(() => generateArray(length), [length])

    //--------------------STATE--------------------
    const [value, setValue] = useState(initValue.split('', initValue.length))

    //--------------------REF--------------------
    const inputsRef = useRef(lengthArray.map(() => createRef()))
    const characterFieldRef = useRef()
    
    //--------------------FUNCTIONS--------------------
    const onChangeValue = (v) => {
        onChange(v.slice(0, v.length))
    }
    
    const cursorToEnd = (i) => {
        setTimeout(() => {
            document.activeElement.setSelectionRange(1, 1)
            // inputsRef.current[i].current.setSelectionRange(1, 1)
        }, 30)
    }

    const handleFocus = useCallback(() => {
        if (value.length === length) {
            // cursorToEnd(length - 1)
            return inputsRef.current[length - 1].current.focus()
        }

        inputsRef.current[value.length].current.focus()
        // cursorToEnd(value.length)
    }, [value])

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

    const handleKeyDown = (e, i) => {
        if (e.key === 'Tab' || e.key === 'Escape') return setTimeout(() => {e.target.blur()}, 50)
        
        if (e.target.value === '' && (e.key === 'Backspace' || e.key === 'Delete')) {
            setValue(val => {
                val.pop()
                onChange(val)
                return val
            })
            
            if (i === 0) return e.preventDefault()
            
            inputsRef.current[i - 1].current.value = ''
            inputsRef.current[i - 1].current.focus()
            return
        }

        if (e.target.value !== '' && i === length - 1 && e.key !== 'Backspace' && e.key !== 'Delete')
            return e.preventDefault()
            
    }
    
    const handlePaste = async e => {
        e.preventDefault()
        try {
            const text = await window.navigator.clipboard.readText()
            
            handleSetValue(text)
            
        } catch(error) {
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
        
        document.activeElement.blur()
    
    }, [inputsRef, onChange])
    
    const handleSetValue = useCallback((text) => {
        inputsRef.current.map((ref, i) => {
            ref.current.value = text[i]
            setValue(val => {
                val[i] = text[i]
                return val
            })
        })
        
        onChange(text.slice(0, length))
        
        document.activeElement.blur()
    }, [inputsRef, onChange])
    
    const setStatus = useCallback((status) => {
        const currClass = characterFieldRef.current.className
        const statusClass = `status--${status}`
        
        if(characterFieldRef.current.className.includes(statusClass)) return
        
        if(currClass.includes('status'))
            characterFieldRef.current.className = currClass.slice(0, currClass.indexOf('status')).concat(statusClass)
        else
            characterFieldRef.current.classList.add(statusClass)
    }, [characterFieldRef])
    
    //--------------------IMPERATIVEHANDLE--------------------
    useImperativeHandle(ref, () => ({
        reset: handleReset,
        setValue: handleSetValue,
        setStatus
    }), [handleReset, setStatus])
    
    //--------------------EFFECT--------------------
    useEffect(() => {
        if (initValue !== '') {
            inputsRef.current.map((ref, i) => { ref.current.value = initValue[i] })
            onChangeValue(initValue)
        }

        return () => {}
    }, [])
    
    useEffect(() => {
        setStatus('normal')
    }, [])
    
    //--------------------RENDER--------------------
    className = className ? `${className} character_field` : 'character_field'
    
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
            onKeyDown={(e) => handleKeyDown(e, i)}
        />
    }), [length])

    return (
        <div ref={characterFieldRef} className={className}>
            {inputs}
        </div>
    )
}

export default memo(forwardRef(CharacterField))
