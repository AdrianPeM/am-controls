import React from 'react'

const Header = ({pages}) => {
    return (
        <div style={{display:'grid', gridAutoFlow:'column', gap:'1em', justifyContent:'start', padding:'0.5em'}}>
            {pages}
        </div>
    )
}

export default Header
