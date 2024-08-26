import axios from "axios";
import { Flip, toast } from "react-toastify";

export const GetData = async (data,navigate,setLoad) => {
  try {
    const token = localStorage.getItem('Token');
    const response = await axios.post(`${import.meta.env.VITE_APP_IP}/getData`, data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    if (response) {
        return response;
    }
  } catch (error) {
    if(error.response.data.message === 'Invalid Token' || error.response.data.message === 'Access Denied') {
      localStorage.clear();
      navigate("/login"); 
    }
    setLoad(false);
    console.error('Error during API call:', error.response.data.message);
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