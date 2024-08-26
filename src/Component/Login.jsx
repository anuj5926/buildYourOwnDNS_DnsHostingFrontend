import { useContext, useState } from "react";
import { Context } from "../Context/Context";
import { Login } from "../Api/Login";
import { Flip, toast } from "react-toastify";
import { SignUp } from "../Api/Signup";
import { useNavigate } from "react-router-dom";

const LoginUI = () => {

    const navigate = useNavigate();

    const [login, isLogin] = useState(true)
    const { setLoad, setLoadColor } = useContext(Context);

    const [userDetails, setUserDetails] = useState({
        Username: "",
        Email: "",
        Password: ""
    });

    const handleUsername = (e) => {
        setUserDetails({ ...userDetails, Username: e.target.value });
    }
    const handleEmail = (e) => {
        setUserDetails({ ...userDetails, Email: e.target.value });
    }
    const handlePassword = (e) => {
        setUserDetails({ ...userDetails, Password: e.target.value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (userDetails.Username !== "" && userDetails.Password !== "") {
            setLoad(true);
            setLoadColor("grey")
            let loginInData = {
                Username: userDetails.Username,
                Password: userDetails.Password,
            };
            let res = await Login(loginInData);
            console.log(res);
            if (res) {
                if (res.data.status) {
                    localStorage.setItem("userInfo", JSON.stringify(res.data.newLogin));
                    localStorage.setItem("Token", JSON.stringify(res.data.Token));
                    toast.success('User Login Successfully', {
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
                    navigate("/dashboard")
                    setUserDetails({ Username: "", Email: "", Password: "" });
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
        else {
            toast.error("Give all Details Properly", {
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

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (userDetails.Username !== "" && userDetails.Password !== "" && userDetails.Email !== "") {
            setLoad(true);
            setLoadColor("grey")
            let res = await SignUp(userDetails);
            console.log(res);
            if (res) {
                if (res.data.status) {
                    toast.success('User Created Successfully', {
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
                    isLogin(true);
                    setUserDetails({ Username: "", Email: "", Password: "" });
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
        else {
            toast.error("Give all Details Properly", {
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

    console.log(userDetails)

    const handleEmpty = () => {
        setUserDetails({ Username: "", Email: "", Password: "" });
    }

    return (
        <>
            <div className="loginPage">
                <div className={`wrapper1 ${login ? "animate-signUp" : "animate-signIn"}`}>
                    <div className="form-wrapper sign-up">
                        <form action="">
                            <h2>Sign Up</h2>
                            <div className="input-group" >
                                <input type="text" required="" value={userDetails.Username} onChange={(e) => { handleUsername(e) }} />
                                <label htmlFor="">Username</label>
                            </div>
                            <div className="input-group" >
                                <input type="email" required="" value={userDetails.Email} onChange={(e) => { handleEmail(e) }} />
                                <label htmlFor="">Email</label>
                            </div>
                            <div className="input-group" >
                                <input type="password" required="" value={userDetails.Password} onChange={(e) => { handlePassword(e) }} />
                                <label htmlFor="">Password</label>
                            </div>
                            <button className="btn1" onClick={(e) => handleSignUp(e)}>
                                Sign Up
                            </button>
                            <div className="sign-link">
                                <p>
                                    Already have an account?{" "}
                                    <a href="#" className="signIn-link" onClick={() => { isLogin(!login); handleEmpty() }}>
                                        Sign In
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className="form-wrapper sign-in">
                        <form action="">
                            <h2>Login</h2>
                            <div className="input-group" >
                                <input type="text" required="" value={userDetails.Username} onChange={(e) => { handleUsername(e) }} />
                                <label htmlFor="username">Username</label>
                            </div>
                            <div className="input-group" >
                                <input type="password" required="" value={userDetails.Password} onChange={(e) => { handlePassword(e) }} />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="forgot-pass">
                                <a href="#">Forgot Password?</a>
                            </div>
                            <button className="btn1" onClick={(e) => handleLogin(e)}>
                                Login
                            </button>
                            <div className="sign-link">
                                <p>
                                    Don't have an account?{" "}
                                    <a href="#" className="signUp-link" onClick={() => { isLogin(!login); handleEmpty() }}>
                                        Sign Up
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default LoginUI;