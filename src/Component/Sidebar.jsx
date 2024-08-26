import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';

function Sidebar() {

    const { selectSidebar, setSelectSidebar } = useContext(Context)

    const handleDashboard = () => {
        setSelectSidebar('/dashboard');
        navigate('/dashboard');
    }
    const handleAll = () => {
        setSelectSidebar('/dashboard/All');
        navigate('/dashboard/All');
    }
    const handleA = () => {
        setSelectSidebar('/dashboard/A');
        navigate('/dashboard/A');
    }
    const handleAAAA = () => {
        setSelectSidebar('/dashboard/Aaaa');
        navigate('/dashboard/Aaaa');
    }
    const handleCname = () => {
        setSelectSidebar('/dashboard/Cname');
        navigate('/dashboard/Cname');
    }

    const navigate = useNavigate();
    return (
        <div className="sidebar" data-background-color="dark">
            <div className="sidebar-logo">
                {/* Logo Header */}
                <div className="logo-header" data-background-color="dark">
                    <a className="logo">
                        
                    </a>
                    <div className="nav-toggle">
                        <button className="btn btn-toggle toggle-sidebar">
                            <i className="gg-menu-right" />
                        </button>
                        <button className="btn btn-toggle sidenav-toggler">
                            <i className="gg-menu-left" />
                        </button>
                    </div>
                    <button className="topbar-toggler more">
                        <i className="gg-more-vertical-alt" />
                    </button>
                </div>
                {/* End Logo Header */}
            </div>
            <div className="sidebar-wrapper scrollbar scrollbar-inner">
                <div className="sidebar-content">
                    <ul className="nav nav-secondary">
                        <li className={`nav-item ${selectSidebar === '/dashboard' ? 'active' : ''}`} onClick={() => { handleDashboard() }}>
                            <a
                                data-bs-toggle="collapse"
                                className="collapsed"
                                aria-expanded="false"
                            >
                                <i className="fas fa-home" />
                                <p>Dashboard</p>
                            </a>
                        </li>
                        <li className="nav-section">
                            <span className="sidebar-mini-icon">
                                <i className="fa fa-ellipsis-h" />
                            </span>
                            <h4 className="text-section">Records</h4>
                        </li>
                        <li className={`nav-item ${selectSidebar === '/dashboard/All' ? 'active' : ''}`} onClick={() => { handleAll() }}>
                            <a>
                                <i className="fas fa-layer-group" />
                                <p>All Record</p>
                            </a>
                        </li>
                        <li className={`nav-item ${selectSidebar === '/dashboard/A' ? 'active' : ''}`} onClick={() => { handleA() }}>
                            <a>
                                <i className="fas fa-layer-group" />
                                <p>A Record</p>
                            </a>
                        </li>
                        <li className={`nav-item ${selectSidebar === '/dashboard/Aaaa' ? 'active' : ''}`} onClick={() => { handleAAAA() }}>
                            <a>
                                <i className="fas fa-layer-group" />
                                <p>AAAA Record</p>
                            </a>
                        </li>
                        <li className={`nav-item ${selectSidebar === '/dashboard/Cname' ? 'active' : ''}`} onClick={() => { handleCname() }}>
                            <a>
                                <i className="fas fa-layer-group" />
                                <p>CNAME Record</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
