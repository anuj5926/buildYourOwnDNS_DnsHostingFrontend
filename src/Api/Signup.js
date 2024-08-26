import axios from "axios";
import { Flip, toast } from "react-toastify";

export const SignUp = async (data) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_IP}/signUp`, data);
    if (response) {
        return response;
    }
  } catch (error) {
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