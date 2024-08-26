import { ToastContainer } from "react-toastify"
import LoginUI from "./Component/Login"
import { Navigate, Route, Routes } from "react-router-dom"
import { RotatingLines } from "react-loader-spinner"
import { useContext } from "react";
import { Context } from "./Context/Context";
import "react-toastify/dist/ReactToastify.css";

import DefaultPage from "./Component/DefaultPage";
import Dashboard from "./Component/Dashboard";
import AllRecord from "./Component/AllRecord";
import ARecord from "./Component/ARecord";
import AAAARecord from "./Component/AAAARecord";
import CNAMERecord from "./Component/CNAMERecord";
import Profile from "./Component/Profile";
import { ProtectedRoute } from "./Component/ProtectedRoute.jsx";

function App() {

  const token = localStorage.getItem('Token');
  const { load, loadColor } = useContext(Context);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: "50%",
        left: "50%",
        zIndex: 100000,
        transform: "translate(-50%, -50%)",
      }}>
        <RotatingLines
          visible={load ? true : false}
          height="96"
          width="96"
          color="grey"
          strokeColor={loadColor}
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
      <Routes>
      <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<LoginUI />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DefaultPage />}>
            <Route index element={<Dashboard />} />
            <Route path="All" element={<AllRecord />} />
            <Route path="A" element={<ARecord />} />
            <Route path="AAAA" element={<AAAARecord />} />
            <Route path="CNAME" element={<CNAMERecord />} />
            <Route path="Profile" element={<Profile />} />
          </Route>
        </Route>

      </Routes>
    </>
  )
}

export default App