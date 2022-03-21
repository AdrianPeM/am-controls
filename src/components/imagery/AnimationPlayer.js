import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import PropTypes from 'prop-types'

const AnimationPlayer = (props, ref) => {
    let {
        children,
        animation,
        duration,
        hover,
    } = props

    /*------------------------------------STATE---------------------------------*/
    const [animate, setAnimate] = useState(false)

    /*------------------------------------REF---------------------------------*/
    const containerRef = useRef() //{current: undefined}

    /*------------------------------------FUNCTIONS---------------------------------*/
    const playAnimation = useCallback(() => {
        setAnimate(true)
    }, [setAnimate])

    /*------------------------------------EXTERNAL---------------------------------*/
    useImperativeHandle(ref, () => ({
        play: playAnimation
    }), [playAnimation])

    /*------------------------------------EFFECT---------------------------------*/
    useEffect(() => {
        containerRef.current.style.animationDuration = `${duration}s`
    }, [])

    useEffect(() => {
        if(!duration) duration = 0.6

        if (animate)
            setTimeout(() => {
                containerRef.current.classList.remove(`animation--${animation}`)
                setAnimate(false)
            }, duration*1000 )
    }, [animate])

    /*------------------------------------RENDER---------------------------------*/
    const playerProps = {
        ref: containerRef,
        onMouseEnter: hover ? playAnimation:null,
        className: `animation_player${animate ? ` animation--${animation}` : ''}`
    }

    return (
        <div {...playerProps}>
            {children}
        </div>
    )
}

AnimationPlayer.propTypes = {
    ref: PropTypes.shape({ current: PropTypes.object }),
    children: PropTypes.node,
    animation: PropTypes.string,
    duration: PropTypes.number,
    hover: PropTypes.bool,
}

AnimationPlayer.defaultProps = {
    ref: null,
    children: null,
    animation: undefined,
    duration: undefined,
    hover: false,
}

export default forwardRef(AnimationPlayer)
