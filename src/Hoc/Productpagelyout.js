import React from 'react'
import { Footer } from '../Lyouts/Footer'
import ResponsiveAppBar from '../Lyouts/Header'

const Productpagelyout = (PageComponent) => {
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
export default Productpagelyout    