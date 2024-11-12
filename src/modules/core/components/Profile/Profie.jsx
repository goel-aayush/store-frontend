import React, { useState } from "react";
import {ImagePlus} from 'lucide-react'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [scrollDisabled, setScrollDisabled] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handlePasswordChangeClick = () => {
    setIsPasswordChange(true);
    setScrollDisabled(true);
    document.body.style.overflow = "hidden"; // Disable scroll when modal is active
  };

  const closeModal = () => {
    setIsPasswordChange(false);
    setScrollDisabled(false);
    document.body.style.overflow = "auto"; // Enable scroll when modal closes
  };

  const handleImageChange = () => {
    // Logic for changing image
  };

  return (
    <div className="p-8 flex flex-col items-center ">
      <div className="w-full max-w-lg bg-slate-200 rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="rounded-full h-40 w-40 object-cover"
            />
            <button
              onClick={handleImageChange}
              className="absolute bottom-0 left-12  text-black py-1 px-20  rounded-full "
            >
              <ImagePlus />
            </button>
          </div>
        </div>

        <div className="space-y-4 w-full">
          <div>
            <label className="block font-semibold text-gray-600">Name</label>
            {isEditing ? (
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="John Doe"
              />
            ) : (
              <p className="mt-1 text-gray-700">John Doe</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-600">Email</label>
            {isEditing ? (
              <input
                type="email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="johndoe@example.com"
              />
            ) : (
              <p className="mt-1 text-gray-700">johndoe@example.com</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-600">Employee Code</label>
            <p className="mt-1 text-gray-700">123456</p>
          </div>

          <button
            onClick={handleEditClick}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {isEditing ? "Save" : "Edit Profile"}
          </button>

          <button
            onClick={handlePasswordChangeClick}
            className="w-full bg-red-500 text-white py-2 mt-2 rounded-lg hover:bg-red-700"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Password Change Modal */}
      {isPasswordChange && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              X
            </button>
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={closeModal}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
