import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../core/components/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "../core/axiosauth/axiosConfig";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
    setType(isPasswordVisible ? "password" : "text");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiKey = process.env.REACT_APP_API_KEY_LOGIN;
      const apiurl = process.env.REACT_APP_API_URL_LOGIN;

      const response = await axios.post(
        apiurl,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "x-api-path": apiurl,
          },
          withCredentials: true,
        }
      );

      const user_id = response.data.id;
      localStorage.setItem("user_id", user_id);

      toast.success("Login Successful!", { position: "top-right" , onClose: undefined }  );
      navigate(`${response.data.userData.role}/dashboard`);
    } catch (error) {
      toast.error("Enter correct User ID and Password", { position: "top-right" , onClose: undefined } );
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
            <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="mb-8">
                  <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
                  <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                    Sign in to your account and explore a world of possibilities. Your journey begins here.
                  </p>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">User name</label>
                  <div className="relative flex items-center">
                    <input
                      name="username"
                      type="text"
                      required
                      className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                      placeholder="Enter user name"
                      onChange={handleEmail}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Password</label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type={type}
                      required
                      className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                      placeholder="Enter password"
                      onChange={handlePassword}
                    />
                    <span className="w-[18px] h-[18px] absolute right-4 cursor-pointer">
                      <button type="button" onClick={handleToggle}>
                        {isPasswordVisible ? (
                          <EyeOff color="grey" size={18} />
                        ) : (
                          <Eye color="grey" size={18} />
                        )}
                      </button>
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-3 block text-sm text-gray-800"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link to="forgetpassword" className="text-blue-600 hover:underline font-semibold">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <div className="!mt-8">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Log in"}
                  </button>
                </div>
                <p className="text-sm !mt-8 text-center text-gray-800">
                  Don't have an account?{" "}
                  <Link to="" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                    Contact to Admin
                  </Link>
                </p>
              </form>
            </div>
            <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
              <img
                src="https://readymadeui.com/login-image.webp"
                className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
                alt="Dining Experience"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Add ToastContainer */}
      <ToastContainer />
    </div>
  );
}
