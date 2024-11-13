import React, { useState } from "react";
import Header from "../Header";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Import Eye icons

export default function Newpassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for toggling visibility
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const apikey = process.env.REACT_APP_API_KEY_NEW_PASSWORD;
      const apiurl = process.env.REACT_APP_API_URL_NEW_PASSWORD;
      const requestUrl = `https://store-management-nyeh.onrender.com/api/user/newpassword/${token}`;
      const response = await axios.post(
        requestUrl,
        { newPassword: newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apikey,
            "x-api-path": apiurl,
          },
          withCredentials: true,
        }
      );
      setMessage(response.data.message);

      if (response.data.success) {
        navigate("/"); // Navigate to login page on success
      }
    } catch (error) {
      setMessage(
        "Error: " + (error.response?.data?.message || "Something went wrong")
      );
      console.error("error:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
      <Header />
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
            <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="mb-8">
                  <h3 className="text-gray-800 text-3xl font-extrabold">
                    Forget Password
                  </h3>
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    New Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="newPassword"
                      type={isPasswordVisible ? "text" : "password"}
                      required
                      className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                      placeholder="Enter your New Password"
                      onChange={handleNewPassword}
                    />
                    {/* Toggle visibility button */}
                    <button
                      type="button"
                      className="absolute right-4"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? (
                        <EyeOff className="w-[18px] h-[18px] text-gray-500" />
                      ) : (
                        <Eye className="w-[18px] h-[18px] text-gray-500" />
                      )}
                    </button>
                  </div>
                  {message && <p>{message}</p>}
                </div>

                <div className="!mt-8">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    disabled={isLoading} // Disable while loading
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>

                <p className="text-sm !mt-8 text-center text-gray-800">
                  Don't have an account?{" "}
                  <Link
                    to="/"
                    className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap no-underline"
                  >
                    Contact Admin
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
    </div>
  );
}
