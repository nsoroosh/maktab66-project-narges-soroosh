import React from 'react'
import { Footer } from '../Lyouts/Footer'
import ResponsiveAppBar from '../Lyouts/AdminHeader'

const Adminpagelyout = (PageComponent) => {
    return function WithPage({ ...props }) {
        return (
            <>
            <ResponsiveAppBar/>
            <PageComponent/>
            <Footer/>
            </>
        )
        }
    }
export default Adminpagelyout    