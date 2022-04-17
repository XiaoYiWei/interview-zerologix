import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout: React.FC = () => {
    return (
        <div>
            <Header />
            <Outlet />
            {/*<Content />*/}
            {/*<Footer />*/}
        </div>
    )
}

Layout.displayName = 'Layout'
export default Layout
