import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

import 'utils/fontAwesome'
import './styles.scss'

const Layout = ({pages = []}) => {
    return (
        <div style={{display: 'grid', gridTemplateRows: 'auto 1fr'}}>
            <Header {...{pages}}/>
            <Outlet />
        </div>
    )
}

export default Layout
