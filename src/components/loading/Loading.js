import React, { memo, useState } from 'react'

const Loading = props => {
    const {
        isLoading = false
    } = props

    if(!isLoading) return null
    return (
        <div className='loading_container'>
            <div className='circle'/>
        </div>
    )
}

export default memo(Loading)