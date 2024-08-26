import { useContext, useEffect, useState } from "react";
import { AddRecord } from "../Api/AddRecord";
import { Flip, toast } from "react-toastify";
import { Context } from "../Context/Context";
import { DeleteRecord } from "../Api/DeleteRecord";
import { EditRecord } from "../Api/EditRecord";
import { useNavigate } from "react-router-dom";

export default function AllRecord() {

  const [type, setType] = useState("A");
  const [subDomain, setSubDomain] = useState("");
  const [Ipv4, setIpv4] = useState("");
  const [Ipv6, setIpv6] = useState("");
  const [Cname, setCname] = useState("");
  const [comment, setComment] = useState("");
  const [AllRecordData, setAllRecordData] = useState([]);
  const [editData, setEditData] = useState(false)
  const [editId, setEditId] = useState("");
  const navigate = useNavigate();

  const useContextApi = useContext(Context)

  const handleSaveChanges = async () => {
    let addRecord;
    if (type === "A" && Ipv4 === "") {
      toast.error('IPv4 is required', {
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
      return;
    }
    else if (type === "AAAA" && Ipv6 === "") {
      toast.error('IPv6 is required', {
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
      return;
    }
    else if (type === "CNAME" && Cname === "") {
      toast.error('CNAME is required', {
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
      return;
    } else {
      addRecord = {
        Email: JSON.parse(localStorage.getItem("userInfo")).Email,
        Type: type,
        Subdomain: subDomain === "@" ? useContextApi?.records?.domain : `${subDomain}.${useContextApi?.records?.domain}`,
        ...(type === "A" && { Value: Ipv4 }),
        ...(type === "AAAA" && { Value: Ipv6 }),
        ...(type === "CNAME" && { Value: Cname }),
        Comment: comment
      };
    }

    if (subDomain !== "") {
      useContextApi?.setLoad(true);
      useContextApi?.setLoadColor("#6861ce")
      let res = await AddRecord(addRecord,navigate,useContextApi);
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
          setEditData(false);
          setType("A")
          setSubDomain("");
          setIpv4("");
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
      toast.error("Fill Subdomain Properly", {
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
    if (Object.keys(useContextApi?.records)?.length > 0) {
      const data = useContextApi?.records?.Record;
      setAllRecordData(data)
    }
  }, [useContextApi?.records])

  const handleEdit = (ele) => {
    setEditId(ele?._id)
    setType(ele?.Type)
    setSubDomain(ele?.Subdomain);
    if (ele?.Type === "A") {
      setIpv4(ele?.Value);
    } else if (ele?.Type === "AAAA") {
      setIpv6(ele?.Value);
    } else if (ele?.Type === "CNAME") {
      setCname(ele?.Value);
    }
    setComment(ele?.Comment);
    setEditData(true);
  }

  console.log(editData,"jhgfs")

  async function saveEditData() {
    let addRecord;
    if (type === "A" && Ipv4 === "") {
      toast.error('IPv4 is required', {
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
      return;
    }
    else if (type === "AAAA" && Ipv6 === "") {
      toast.error('IPv6 is required', {
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
      return;
    }
    else if (type === "CNAME" && Cname === "") {
      toast.error('CNAME is required', {
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
      return;
    } else {
      addRecord = {
        _id: editId,
        Email: JSON.parse(localStorage.getItem("userInfo")).Email,
        Type: type,
        Subdomain: subDomain ,
        ...(type === "A" && { Value: Ipv4 }),
        ...(type === "AAAA" && { Value: Ipv6 }),
        ...(type === "CNAME" && { Value: Cname }),
        Comment: comment
      };
      if (subDomain !== "") {
        useContextApi?.setLoad(true);
        useContextApi?.setLoadColor("#6861ce")
        let res = await EditRecord(addRecord,navigate,useContextApi);
        console.log(res);
        if (res) {
          if (res.data.status) {
            useContextApi?.setRecords(res.data.updatedLogin);
            toast.success('Record Edited Successfully', {
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
            setEditData(false);
            setType("A")
            setSubDomain("");
            setIpv4("");
            setIpv6("");
            setCname("");
            setComment("");
            setEditId("");
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
        toast.error("Fill Subdomain Properly", {
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
      setType("A")
      setSubDomain("");
      setIpv4("");
      setIpv6("");
      setCname("");
      setComment("");
      console.log(editData)
      if (editData) {
        setEditData(false);
        setEditId("");
      }
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
            <h3 className="fw-bold mb-3">All Record</h3>
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
                  {AllRecordData?.map((ele, i) => {
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
                <label htmlFor="pillSelect">Record Type</label>
                <select className="form-control input-pill" id="pillSelect" onChange={(e) => { setType(e.target.value) }}>
                  <option value="A">A</option>
                  <option value="AAAA">AAAA</option>
                  <option value="CNAME">CNAME</option>
                </select>
              </div>

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
              {type === 'A' && <div className="form-group">
                <label htmlFor="password">IPv4</label>
                <input
                  type="text"
                  className="form-control"
                  id="Ip"
                  placeholder="Like 192.169.0.70"
                  onChange={(e) => { setIpv4(e.target.value) }}
                  value={Ipv4}
                  required
                />
              </div>}
              {type === "AAAA" && <div className="form-group">
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
              </div>}
              {type === "CNAME" && <div className="form-group">
                <label htmlFor="email2">Target</label>
                <input
                  type="text"
                  className="form-control"
                  id="target"
                  placeholder="Target domain"
                  onChange={(e) => { setCname(e.target.value) }}
                  value={Cname}
                  required
                />
                <small id="emailHelp2" className="form-text text-muted"
                >E.g www.example.com</small
                >
              </div>}
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
                {editData ? "Edit Data" : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
