import React from 'react'
import { Footer } from '../Footer'
import ResponsiveAppBar from './AdminHeader'
import { Link } from 'react-router-dom'
const Adminpagelyout = (PageComponent) => {
    return function lyout() {
        return (
            <>
            <ResponsiveAppBar/>
            <PageComponent/>
            {/* <Footer/> */}
            </>
        )
        }
    }
export default Adminpagelyout    