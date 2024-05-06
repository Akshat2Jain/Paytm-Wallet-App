import React, { useState } from "react";
import { message } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/signup", {
        username: username,
        email: email,
        password: password,
      });
      message.success(res.data.msg);
      navigate("/signin");
    } catch (error) {
      message.error(error.response.data.msg);
    }
  }

  return (
    <>
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <div className="font-bold text-4xl pt-6">SignUp</div>
            <div className="text-slate-500 text-md pt-1 px-4 pb-4">
              Enter Your Information to create an account
            </div>
            <div>
              <div className="text-sm font-medium text-left py-2">Username</div>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Ex. Akshat Jain"
                required
                className="w-full px-2 py-1 border rounded border-slate-200"
              />
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
                Create Account
              </button>
            </div>
            <div className="py-2 text-sm flex justify-center">
              <div>Already Have an Account?</div>
              <Link
                to="/signin"
                className="pointer underline pl-1 cursor-pointer"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
