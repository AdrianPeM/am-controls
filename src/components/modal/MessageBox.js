
import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef, useReducer } from 'react'

import { Flex, Grid } from 'components'

const initReducer = {
    isOpen: false,
    messageType: 'message-single',
    messageContent: '',
    messageTitle: '',
    messageAnimation: 'MD-Alerta',
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'init':
            return initReducer
        case 'show':
            return { ...state, ...action.payload, isOpen: true }
        case 'hide':
            return { ...initReducer, isOpen: false }
    }
}

export default memo(forwardRef(function CustomMessageBox(props, ref) {

    let {
        className = '',
        buttons
    } = props

    const [state, dispatch] = useReducer(reducer, initReducer)

    /*---------------------------------------STATE-------------------------------------------*/
    const {
        messageContent, messageType, messageTitle, messageAnimation, isOpen
    } = state

    /*---------------------------------------REFS--------------------------------------------*/
    const messageBoxRef = useRef()

    /*---------------------------------EXTERNAL FUNCTIONS------------------------------------*/
    const show = useCallback(({
        content = '', title = '', type = 'message-single'//, animation = 3
    }) => {
        if (type === 'message-list' && content === '') content = []

        dispatch({
            type: 'show', payload: {
                messageContent: content,
                messageType: type,
                messageTitle: title,
                // messageAnimation: global.switchMDAnimation(animation ?? 3),
            }
        })
    }, [dispatch])

    const hide = useCallback(() => {
        dispatch({ type: 'hide' })
    }, [dispatch])

    const error = useCallback((errors = [], animation = 2) => {
        show({ type: 'message-list', title: 'Hubo un problema', content: errors, animation })
    }, [show])

    useImperativeHandle(ref, () => ({
        show,
        hide,
        error,
    }))

    /*--------------------------------------RENDER-------------------------------------------*/
    className = className ? `message_box ${className}`:'message_box'

    const containerProps = { className: 'message_box__content', gap: '1em', w100: true }

    if (!isOpen) return null

    else {
        let contentRender
        switch (messageType) {
            case 'message-single':
                contentRender = (
                    <Grid {...containerProps}>
                        <p>
                            {messageContent}
                        </p>
                    </Grid>
                )
                break
            case 'message-list':
                contentRender = (
                    <Grid {...containerProps}>
                        <ul>
                            {messageContent.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                    </Grid>
                )
                break
        }

        return (
            <Flex w100 h100 align='center' justify='center' className='message_box_modal' ref={messageBoxRef}>
                <Grid w100 className={className} padding='1em' gap='2em' rows={messageTitle !== '' ? 'auto 1fr auto':'1fr auto'}>
                    {/* <Flex centerX maxHeight='10em'>
                        <Animation autoplay loop animation={messageAnimation} />
                    </Flex> */}
                    {messageTitle != '' && <p className='message_box__title'>{messageTitle}</p>}
                    {contentRender}
                    <Flex wrap className='message_box__buttons' justify='center'>
                        <button onClick={hide}>Cerrar</button>
                    </Flex>
                </Grid>
            </Flex>
        )
    }
}))