import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetData } from '../Api/GetData';

const Context = createContext();

const ContextProvider = ({ children }) => {

  const path = useLocation().pathname;

  const [load, setLoad] = useState(false)
  const [loadColor, setLoadColor] = useState("")
  const [selectSidebar, setSelectSidebar] = useState(path);
  const [records, setRecords] = useState({});
  const [first, setFirst] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoad(true);
      setLoadColor("#6861ce")
      let getUserData = {
        Email: JSON.parse(localStorage.getItem("userInfo")).Email
      };
      let res = await GetData(getUserData,navigate,setLoad);
      if (res) {
        if (res.data.status) {
          console.log(res.data.newLogin)
          setRecords(res.data.newLogin)
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
        setLoad(false);
      }
      setLoad(false);
    }

    if (path !== "/login" && path !== "/") {
      if (first) {
        fetchData();
        setFirst(false);
      }
    }
  }, [path])

  return (
    <Context.Provider
      value={{
        setLoad, load, setLoadColor, loadColor, setSelectSidebar, selectSidebar, setRecords, records,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };