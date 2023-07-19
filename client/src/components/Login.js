import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import image from "./png.png"
const Login = ({handleLogin}) => {
  let history = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }
  const login = () => {
    const { email, password } = user;
    if (email && password) {
      axios.post('http://localhost:4000/login', user)
        .then(res => {
          console.log(res.data)
          toast.success(res.data.message);
          const User=res.data.user;
          handleLogin(User);
          console.log(res.data.user);
          history("/")
        }
        )
    }
  }
  const imageStyles = {
    backgroundImage: "url(http://localhost:3000/Images/bgimage.png)",
    height: "100vh",
    backgroundSize: "cover",

    backgroundRepeat: "no-repeat",
  };


  const titleStyles = {
    height: "65px",
    left: "453px",
    top: "2710px",
    borderRadius: "nullpx",
    fontSize: "40px",
    fontWeight: "700",
    lineHeight: "65px",
    letterSpacing: "0em",
    fontFamily: 'Segoe UI',
    backgroundSize: "400%",
    backgroundClip: "text",
    webkitBackgroundClip: "text",
    color: "rgba(45, 85, 47, 1)",
    color: "rgb(224, 79, 99)",
    backgroundImage: "linear-gradient(-45deg,rgb(224, 79, 99), rgb(23, 26, 226))",
    animation: "animasi 3s linear infinite",
  };
  return (
    <>
      <div style={imageStyles}>
        <div className="relative inline-flex w-full justify-evenly ">
          <div className=" flex flex-col justify-center space-y-4">
            <div className="py-4">
              <div className=" flex flex-col justify-center items-center">
                <div className="title">LET’S TRADE INDIA LOGIN</div>
              </div>

              {/* body */}
              <div className="flex justify-around">
                <div className="container flex px-10 pl-10">
                  <img
                    src={image}
                    className="box2 rounded-2xl w-5/6"
                    alt=""
                  />
                </div>

                {/* login card */}
                <div className="loginbox w-[40rem]">
                  <div className="field">
                    <form className="flex flex-col">
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className="items-center text-black-800 w-96 p-2 m-4 focus:border-[#1E2A55] rounded-xl"
                      />
                      <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="text-black-800 w-96 p-2 m-4 focus:border-[#1E2A55] rounded-xl"
                      />
                      <div className="p-2 ml-4 m-4 w-40 bg-[#2F8433] text-white hover:bg-[#1E2A55] rounded-xl" onClick={login}>
                        Login
                      </div>
                      <div>or</div>
                      <div className="p-2 ml-4 m-4 w-40 bg-[#2F8433] text-white hover:bg-[#1E2A55] rounded-xl" onClick={() => history('/reg')}>
                        Register
                      </div>
                      <div className="p-2 ml-4 text-[#327E36] font-medium">New User?</div>
                      <div className="p-2 ml-4">Forgot Password?</div>
                    </form>
                  </div>
                </div>
                {/* login card */}
              </div>
              {/* body */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;