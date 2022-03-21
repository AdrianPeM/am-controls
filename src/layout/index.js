import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

import 'utils/fontAwesome'
import './styles.scss'
import { Grid } from 'components'

const Layout = ({pages = []}) => {
    return (
        <Grid rows='auto 1fr'>
            <Header {...{pages}}/>
            <Outlet />
        </Grid>
    )
}

export default Layout
