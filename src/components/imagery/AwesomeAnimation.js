import React, { forwardRef, memo } from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimationPlayer } from 'components'

const AwesomeAnimation = forwardRef(function AwesomeAnimation(props, ref) {
    let {
        animation,
        duration,
        hover,
        gallery = 'fas',
        icon,
        spin,
        title,
        size,
        ...extras
    } = props

    const playerProps = {
        animation,
        duration,
        hover,
        ref
    }
    
    const iconProps = {
        spin,
        title,
        icon: [gallery, icon],
        style: {width: 'auto', height: size},
        ...extras
    }

    if (!icon) return null

    return (
        <AnimationPlayer {...playerProps}>
            <FontAwesomeIcon {...iconProps} />
        </AnimationPlayer>
    )
})

AwesomeAnimation.propTypes = {
    style: PropTypes.string,
    icon: PropTypes.string,
    spin: PropTypes.bool,
    title: PropTypes.string,
    animation: PropTypes.string,
    duration: PropTypes.number,
    size: PropTypes.string,
}

export default memo(AwesomeAnimation)
