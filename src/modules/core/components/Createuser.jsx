import React, { useState, useEffect } from 'react';
import axios from '../axiosauth/axiosConfig';
import { useUser } from "../../utils/UserContext";

const Createuser = ({ onClose, onRefresh }) => {
    const { user } = useUser();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        emp_code: '',
        department: '',
        role: '',
    });

    useEffect(() => {
        const department = user.dept;
        const role = "faculty";
        setFormData(prevData => ({
            ...prevData,
            department,
            role,
        }));
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apikey = process.env.REACT_APP_API_KEY_CREATE_USER;
        const apiurl = process.env.REACT_APP_API_URL_CREATE_USER;
        try {
            const response = await axios.post(apiurl, formData, {
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": apikey,
                    "x-api-path": apiurl,
                },
                withCredentials: true,
            });
            if (response.data.success) {
                alert('Employee added successfully');
                setFormData({ email: '', name: '', emp_code: '', department: formData.department, role: formData.role });
                onClose(); // Close the popup after successful submission
                onRefresh(); // Trigger a refresh in the parent component
            }
        } catch (error) {
            console.error("Error adding employee:", error);
            alert('Failed to add employee');
        }
    };

    return (
        <div className="relative w-full max-w-md bg-white shadow-md rounded-lg p-8">
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
                ✕
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">Add New Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="emp_code" className="block text-sm font-medium text-gray-700">Employee Code</label>
                    <input
                        type="text"
                        name="emp_code"
                        value={formData.emp_code}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                    Add Employee
                </button>
            </form>
        </div>
    );
};

export default Createuser;
