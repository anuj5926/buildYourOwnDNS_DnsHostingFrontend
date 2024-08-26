import { useNavigate } from "react-router-dom"
import { Context } from "../Context/Context";
import { useContext } from "react";


function Nav() {

    const navigate = useNavigate();
    const useContextApi = useContext(Context)

    const handleLogout=()=>{
        localStorage.clear();
        navigate("/login");
    }

    return (
        <>
            <div className="main-header-logo">
                <div className="logo-header" data-background-color="dark">
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
            </div>
            <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
                <div className="container-fluid">
                    <nav className="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <button type="submit" className="btn btn-search pe-1">
                                    <i className="fa fa-search search-icon" />
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Search ..."
                                className="form-control"
                            />
                        </div>
                    </nav>
                    <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
                        <li className="nav-item topbar-icon dropdown hidden-caret d-flex d-lg-none">
                            <a
                                className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                                href="#"
                                role="button"
                                aria-expanded="false"
                                aria-haspopup="true"
                            >
                                <i className="fa fa-search" />
                            </a>
                            <ul className="dropdown-menu dropdown-search animated fadeIn">
                                <form className="navbar-left navbar-form nav-search">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            placeholder="Search ..."
                                            className="form-control"
                                        />
                                    </div>
                                </form>
                            </ul>
                        </li>
                        <li className="nav-item topbar-user dropdown hidden-caret">
                            <a
                                className="dropdown-toggle profile-pic"
                                data-bs-toggle="dropdown"
                                href="#"
                                aria-expanded="false"
                            >
                                <div className="avatar-sm">
                                    <img
                                        src="/assets/img/profile.jpg"
                                        alt="..."
                                        className="avatar-img rounded-circle"
                                    />
                                </div>
                                <span className="profile-username">
                                    <span className="op-7">Hi,</span>
                                    <span className="fw-bold">{useContextApi?.records?.Username}</span>
                                </span>
                            </a>
                            <ul className="dropdown-menu dropdown-user animated fadeIn">
                                <div className="dropdown-user-scroll scrollbar-outer">
                                    <li>
                                        <div className="user-box">
                                            <div className="avatar-lg">
                                                <img
                                                    src="/assets/img/profile.jpg"
                                                    alt="image profile"
                                                    className="avatar-img rounded"
                                                />
                                            </div>
                                            <div className="u-text">
                                                <h4>{useContextApi?.records?.Username}</h4>
                                                <p className="text-muted">{useContextApi?.records?.domain?.length ===0 ?"example.com":useContextApi?.records?.domain}</p>
                                                <a
                                                    onClick={()=>{navigate("/dashboard/Profile")}}
                                                    className="btn btn-xs btn-secondary btn-sm"
                                                >
                                                    View Profile
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" onClick={handleLogout}>
                                            Logout
                                        </a>
                                    </li>
                                </div>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Nav
