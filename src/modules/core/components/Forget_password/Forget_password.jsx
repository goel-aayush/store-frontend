import React, { useState } from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';
import axios from '../../axiosauth/axiosConfig';

export default function Forget_password() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Update state when the user types in the email field
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const apikey=process.env.REACT_APP_API_KEY_FORGOT_PASSWORD;
      const apiurl=process.env.REACT_APP_API_URL_FORGOT_PASSWORD;
      // Send the email as an object to the backend
      const response = await axios.post(apiurl, { email },
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
      alert("Check your Email Box For password Forget link ")
    } catch (error) {
      setMessage(error.response.data.message);
      
    }
  };

  return (
    <div>
      <Header />
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
            <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              {/* Attach the handleSubmit to the form's onSubmit event */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="mb-8">
                  <h3 className="text-gray-800 text-3xl font-extrabold">Forget Password</h3>
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Email</label>
                  <div className="relative flex items-center">
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                      placeholder="Enter your registered Email address"
                      onChange={handleEmail}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-4"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                      <path
                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                  <div className='mt-2 text-red-600 text-xs ml-2'>{message && <p>{message}</p>}</div>
                  
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link to="/" className="text-blue-600 hover:underline font-semibold no-underline">
                      Go to Login Page
                    </Link>
                  </div>
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
                  Don't have an account?{' '}
                  <Link to="" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap no-underline">
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
    </div>
  );
}
