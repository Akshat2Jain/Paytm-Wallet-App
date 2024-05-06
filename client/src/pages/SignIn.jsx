import React, { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/signin", {
        email: email,
        password: password,
      });
      message.success(res.data.msg);
      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      message.error(error.response.data.msg);
    }
  }
  return (
    <>
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <div className="font-bold text-4xl pt-6">Sign In</div>
            <div className="text-slate-500 text-md pt-1 px-4 pb-4">
              Enter Your Credentials
            </div>
            <div>
              <div className="text-sm font-medium text-left py-2">Email</div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                required
                placeholder="Ex. akshat@gmail.com"
                className="w-full px-2 py-1 border rounded border-slate-200"
              />
            </div>
            <div>
              <div className="text-sm font-medium text-left py-2">Password</div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                required
                placeholder="********"
                className="w-full px-2 py-1 border rounded border-slate-200"
              />
            </div>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                class="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Log In
              </button>
            </div>
            <div className="py-2 text-sm flex justify-center">
              <div>Don't Have an Account?</div>
              <Link
                to="/signup"
                className="pointer underline pl-1 cursor-pointer"
              >
                SignUp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
