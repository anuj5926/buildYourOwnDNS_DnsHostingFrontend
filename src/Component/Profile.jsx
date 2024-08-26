import React, { useContext } from 'react'
import { Context } from '../Context/Context'
import { Link } from 'react-router-dom'

function Profile() {

   const useContextApi = useContext(Context)

    return (
        <div className="container">
            <div className="page-inner mt-5">
                <h3 className="fw-bold mb-3">Profile</h3>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="card card-profile">
                            <div
                                className="card-header"
                                style={{ backgroundImage: 'url("/assets/img/blogpost.jpg")' }}
                            >
                                <div className="profile-picture">
                                    <div className="avatar avatar-xl">
                                        <img
                                            src="/assets/img/profile.jpg"
                                            alt="..."
                                            className="avatar-img rounded-circle"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="user-profile text-center">
                                    <div className="name">{useContextApi?.records?.Username}, 19</div>
                                    <div className="job">Full Stack Developer</div>
                                    <div className="desc">A man who hates loneliness</div>
                                    <div className="social-media">
                                        <Link to="http://www.linkedin.com/in/anuj5926" target='_blank'
                                            className="btn btn-info btn-twitter btn-sm btn-link"
                                        >
                                            <span className="btn-label just-icon">
                                                <i className="icon-social-linkedin" />
                                            </span>
                                        </Link>
                                    </div>
                                   
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="row user-stats text-center">
                                    <div className="col">
                                        <div className="number">{useContextApi?.records?.Record.length}</div>
                                        <div className="title">Total Records</div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
