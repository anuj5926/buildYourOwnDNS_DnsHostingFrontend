import { useContext, useEffect, useState } from "react";
import { AddRecord } from "../Api/AddRecord";
import { Flip, toast } from "react-toastify";
import { Context } from "../Context/Context";
import { EditRecord } from "../Api/EditRecord";
import { DeleteRecord } from "../Api/DeleteRecord";
import { useNavigate } from "react-router-dom";

export default function AAAARecord() {

  const [subDomain, setSubDomain] = useState("");
  const [Ipv6, setIpv6] = useState("");
  const [comment, setComment] = useState("");
  const [AAAARecordData, setAAAARecordData] = useState([]);
  const [editData, setEditData] = useState(false)
  const [editId ,setEditId] = useState("");
  const navigate = useNavigate();

  const useContextApi = useContext(Context)

  const handleSaveChanges = async () => {
    if (subDomain !== "" && Ipv6 !== "") {
      useContextApi?.setLoad(true);
      useContextApi?.setLoadColor("#6861ce")
      let getRecord = {
        Email: JSON.parse(localStorage.getItem("userInfo")).Email,
        Type: "AAAA",
       Subdomain: subDomain === "@" ? useContextApi?.records?.domain : `${subDomain}.${useContextApi?.records?.domain}`,
        Value: Ipv6,
        Comment: comment
      };
      let res = await AddRecord(getRecord,navigate,useContextApi);
      console.log(res);
      if (res) {
        if (res.data.status) {
          useContextApi?.setRecords(res.data.updatedLogin);
          toast.success('Record Added Successfully', {
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
          const modalElement = document.getElementById('exampleModal');
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance.hide();
          setSubDomain("");
          setIpv6("");
          setComment("");
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
      toast.error("Fill Record Properly", {
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

  useEffect(() => {
    if (Object.keys(useContextApi?.records).length > 0) {
      const data = useContextApi?.records?.Record.filter(ele => ele?.Type === "AAAA");
      setAAAARecordData(data)
    }
  }, [useContextApi?.records])

  const handleEdit = (ele) => {
    setEditId(ele?._id)
    setSubDomain(ele?.Subdomain);
    setIpv6(ele?.Value);
    setComment(ele?.Comment);
    setEditData(true);
  }

  async function saveEditData() {
    if (subDomain !== "" && Ipv6 !== "") {
      useContextApi?.setLoad(true);
      useContextApi?.setLoadColor("#6861ce")
      let getRecord = {
        Email: JSON.parse(localStorage.getItem("userInfo")).Email,
        _id: editId,
        Type: "AAAA",
        Subdomain: subDomain,
        Value: Ipv6,
        Comment: comment
      };
      let res = await EditRecord(getRecord,navigate,useContextApi);
      console.log(res);
      if (res) {
        if (res.data.status) {
          useContextApi?.setRecords(res.data.updatedLogin);
          toast.success('Record Added Successfully', {
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
          const modalElement = document.getElementById('exampleModal');
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance.hide();
          setSubDomain("");
          setIpv6("");
          setComment("");
          setEditId("");
          setEditData(false);
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
      toast.error("Fill Record Properly", {
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

  const handleDelete = async (id) => {
    useContextApi?.setLoad(true);
    useContextApi?.setLoadColor("#6861ce")
    let deleteData = {
      Email: JSON.parse(localStorage.getItem("userInfo")).Email,
      _id: id
    }
    let res = await DeleteRecord(deleteData,navigate,useContextApi);
    console.log(res);
    if (res) {
      if (res.data.status) {
        useContextApi?.setRecords(res.data.updatedLogin);
        toast.success('Record Deleted Successfully', {
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
        useContextApi?.setLoad(false);
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
        })
        useContextApi?.setLoad(false);
      }
      useContextApi?.setLoad(false);
    }
  }

  useEffect(() => {
    const modalElement = document.getElementById('exampleModal');

    const handleModalHide = () => {
      setSubDomain("");
      setIpv6("");
      setComment("");
      editData && setEditId("");
      editData && saveEditData(false);
    };
    modalElement.addEventListener('hidden.bs.modal', handleModalHide);
    return () => {
      modalElement.removeEventListener('hidden.bs.modal', handleModalHide);
    };
  }, [editData]);

  return (
    <div className="container">
      <div className="page-inner mt-3">
        <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
          <div>
            <h3 className="fw-bold mb-3">AAAA Record</h3>
          </div>
          <div className="ms-md-auto py-2 py-md-0">
            <a className="btn btn-label-info btn-round me-2" data-bs-toggle="modal"
              data-bs-target="#exampleModal">
              ADD Record
            </a>
          </div>
        </div>
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Records</div>
            </div>
            <div className="card-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col">SubDomain</th>
                    <th scope="col">Value</th>
                    <th scope="col">Comment</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {AAAARecordData?.map((ele, i) => {
                    return (
                      <tr key={i}>
                        <td>{ele.Type}</td>
                        <td>{ele.Subdomain}</td>
                        <td>{ele.Value}</td>
                        <td>{ele.Comment}</td>
                        <td>
                          <button className="btnedit" data-bs-toggle="modal"
                          data-bs-target="#exampleModal" onClick={() => handleEdit(ele)}>
                            <i className="fa-regular fa-pen-to-square"></i>
                          </button>
                          <button className="btnedit" onClick={() => handleDelete(ele?._id)}>
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="exampleModalLabel">
                Record Detail
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="email2">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="subdomain"
                  placeholder="Enter your subdomain"
                  onChange={(e) => { setSubDomain(e.target.value) }}
                  value={subDomain}
                  required
                />
                <small id="emailHelp2" className="form-text text-muted"
                >Use @ for root</small
                >
              </div>
              <div className="form-group">
                <label htmlFor="password">IPv6</label>
                <input
                  type="text"
                  className="form-control"
                  id="Ip"
                  placeholder="Like 12ab:0000:0000:0123:4567:89ab:0000:cdef"
                  onChange={(e) => { setIpv6(e.target.value) }}
                  value={Ipv6}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="comment">Comment</label>
                <textarea className="form-control" id="comment" rows="5" onChange={(e) => { setComment(e.target.value) }}
                  value={comment}>
                </textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={editData ? saveEditData : handleSaveChanges}>
              {editData ?"Edit Data":"Save changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
