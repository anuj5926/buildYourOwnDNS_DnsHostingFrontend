import axios from "axios";
import { Flip, toast } from "react-toastify";

export const DeleteRecord = async (data,navigate,useContextApi) => {

  try {
    const token = localStorage.getItem('Token');
    const response = await axios.post(`${import.meta.env.VITE_APP_IP}/DeleteRecord`, data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    console.log("object",response)
    if (response) {
        return response;
    }
  } catch (error) {
    if(error.response.data.message === 'Invalid Token' || error.response.data.message === 'Access Denied') {
      localStorage.clear();
      navigate("/login"); 
    }
    useContextApi?.setLoad(false);
    console.error('Error during API call:', error.message);
    toast.error(error.message, {
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