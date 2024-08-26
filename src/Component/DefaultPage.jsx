import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Nav from "./Nav"
import Sidebar from "./Sidebar"


function DefaultPage() {

    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main-panel">
                <div className="main-header">
                    <Nav />
                </div>
                <Outlet />
                <Footer />
            </div>
        </div>
    )
}

export default DefaultPage