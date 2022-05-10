import React from 'react'
import { Footer } from '../Footer'
import ResponsiveAppBar from '../ProductPage/Header'

const Productpagelyout = (PageComponent) => {
    return function lyout() {
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