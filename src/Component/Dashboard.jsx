import {  useContext, useState } from "react";
import { AddDomain } from "../Api/AddDomain";
import { Flip, toast } from "react-toastify";
import { Context } from "../Context/Context";
import { useNavigate } from "react-router-dom";

const Dashboard = ()=> {

  const useContextApi = useContext(Context);
  const [domain, setDomain] = useState("");
  const navigate = useNavigate();

  const handleAddDomain = async () => {
    if (domain !== "") {
      useContextApi?.setLoad(true);
      useContextApi?.setLoadColor("#6861ce")
      let getRecord = {
        Email: JSON.parse(localStorage.getItem("userInfo")).Email,
        domain: domain
      };
      let res = await AddDomain(getRecord,navigate,useContextApi);
      console.log(res);
      if (res) {
        if (res.data.status) {
          useContextApi?.setRecords(res.data.updatedLogin);
          toast.success('Domain Added Successfully', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          });
          setDomain("");
        }
        else {
          toast.error(res.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          });
        }
        useContextApi?.setLoad(false);
      }
      useContextApi?.setLoad(false);
    }
    else {
      toast.error("Fill domain", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    }
  }

  return (
    <>
      <div className="container">

        {useContextApi?.records?.domain?.length === 0 && <div className="modal-overlay-domain"></div>}
        {useContextApi?.records?.domain?.length === 0 && <div className="modal-dialog-domain modal-dialog-centered domainSelect" role="document">
          <div className="modal-content ">
            <div className="col-md-10">
              <div className="card card-info card-annoucement card-round">
                <div className="card-body text-center domainSelectMain">
                  <div className="card-opening">Welcome {useContextApi?.records?.Username},</div>
                  <div className="card-desc">
                    Congrats and best wishes for success in your brand new life! I knew that
                    you would do this!
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="subdomain"
                      placeholder="Enter your subdomain"
                      onChange={(e) => { setDomain(e.target.value) }}
                      value={domain}
                      required
                    />
                  </div>
                  <div className="card-detail">
                    <div className="btn btn-light btn-rounded" onClick={handleAddDomain}>Add Domain</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}


        <div className="page-inner mt-3">
          <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
            <div>
              <h3 className="fw-bold mb-3">Dashboard</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-3">
              <div className="card card-stats card-round">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-icon">
                      <div className="icon-big text-center icon-primary bubble-shadow-small">
                        <i className="fas fa-users" />
                      </div>
                    </div>
                    <div className="col col-stats ms-3 ms-sm-0">
                      <div className="numbers">
                        <p className="card-category">Visitors</p>
                        <h4 className="card-title">1,294</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="card card-stats card-round">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-icon">
                      <div className="icon-big text-center icon-info bubble-shadow-small">
                        <i className="fas fa-user-check" />
                      </div>
                    </div>
                    <div className="col col-stats ms-3 ms-sm-0">
                      <div className="numbers">
                        <p className="card-category">Subscribers</p>
                        <h4 className="card-title">1303</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="card card-stats card-round">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-icon">
                      <div className="icon-big text-center icon-success bubble-shadow-small">
                        <i className="fas fa-luggage-cart" />
                      </div>
                    </div>
                    <div className="col col-stats ms-3 ms-sm-0">
                      <div className="numbers">
                        <p className="card-category">Sales</p>
                        <h4 className="card-title">$ 1,345</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="card card-stats card-round">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-icon">
                      <div className="icon-big text-center icon-secondary bubble-shadow-small">
                        <i className="far fa-check-circle" />
                      </div>
                    </div>
                    <div className="col col-stats ms-3 ms-sm-0">
                      <div className="numbers">
                        <p className="card-category">Order</p>
                        <h4 className="card-title">576</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* TimeLine */}
          <h3 className="fw-bold mb-3">How To Use It</h3>
          <div className="row">
            <div className="col-md-12">
              <ul className="timeline">
                <li>
                  <div className="timeline-badge">
                    <i className="far fa-paper-plane" />
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4 className="timeline-title">Create an Account</h4>
                    </div>
                    <div className="timeline-body">
                      <p>
                        Visit our website and sign up for a new account by following the registration process. Ensure that you provide all necessary details to complete your account setup.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="timeline-inverted">
                  <div className="timeline-badge warning">
                    <i className="far fa-bell" />
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4 className="timeline-title">Add a Subdomain Record</h4>
                    </div>
                    <div className="timeline-body">
                      <p>
                      Enter the required information for your subdomain record in the popup that appears. Make sure to save the changes.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="timeline-badge danger">
                    <i className="icon-close" />
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4 className="timeline-title">Add a Nameserver Record to Your Domain</h4>
                    </div>
                    <div className="timeline-body">
                      <p>
                      Add the nameserver records to your custom nameservers for the domain you purchased, such as ns1.anujpandey.xyz and ns2.anujpandey.xyz
                      </p>
                    </div>
                  </div>
                </li>
                <li className="timeline-inverted">
                  <div className="timeline-badge info">
                    <i className="icon-tag" />
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4 className="timeline-title">Add Record</h4>
                    </div>
                    <div className="timeline-body">
                      <p>
                      Add the record in the Records section in our website you can navigate through sidebar.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="timeline-badge success">
                    <i className="icon-credit-card" />
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4 className="timeline-title">Congratulations</h4>
                    </div>
                    <div className="timeline-body">
                      <p>
                      Congratulations! We have successfully configured the record. You can now open your browser and visit your domain.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
