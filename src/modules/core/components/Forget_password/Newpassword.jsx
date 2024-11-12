import React, { useState } from "react";
import Header from "../Header";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Newpassword() {
  const { token } = useParams(); // Get the token from the URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    try {
      const apikey = process.env.REACT_APP_API_KEY_NEW_PASSWORD;
      const apiurl = process.env.REACT_APP_API_URL_NEW_PASSWORD;
      const response = await axios.post(
        `https://store-management-nyeh.onrender.com/api/user/newpassword/${token}`,
        {
          newPassword: newPassword, // Send newPassword as an object
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apikey, // Custom API key header
            "x-api-path": apiurl,
          },
          withCredentials: true, // Ensure cookies are included in cross-site requests
        }
      );
      setMessage(response.data.message);
      console.log(response);

      if (response.data.success) {
        navigate("/"); // Navigate to login page on success
      }
    } catch (error) {
      setMessage(
        "Error: " + (error.response?.data?.message || "Something went wrong")
      );
      console.error("error:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
            <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              {/* Use onSubmit for form submission */}
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
                      name="New Password"
                      type="password" // Should be password, not text
                      required
                      className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                      placeholder="Enter your New Password"
                      onChange={handleNewPassword}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-4"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="10"
                        cy="7"
                        r="6"
                        data-original="#000000"
                      ></circle>
                      <path
                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                  {message && <p>{message}</p>}
                </div>

                <div className="!mt-8">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    Submit
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
