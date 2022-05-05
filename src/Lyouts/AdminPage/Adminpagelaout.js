import React from 'react'
import { Footer } from '../Footer'
import ResponsiveAppBar from './AdminHeader'

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