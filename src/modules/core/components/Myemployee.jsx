import React, { useEffect, useState } from 'react';
import axios from '../axiosauth/axiosConfig';
import Createuser from './Createuser'; // Import Createuser component

const MYemployee = () => {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false); // New state to control popup visibility
    const department = "computer science";
    const role = "faculty";

    useEffect(() => {
        fetchEmployees();
    }, [department]);

    const fetchEmployees = async () => {
        const apikey = process.env.REACT_APP_API_KEY_EMP_DATA;
        const apiurl = process.env.REACT_APP_API_URL_EMP_DATA;
        try {
            const response = await axios.get(`/api/user/empdata?department=${department}&role=${role}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": apikey,
                        "x-api-path": apiurl,
                    },
                    withCredentials: true,
                }
            );
            setEmployees(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const deleteEmployee = async (empId) => {
        const apikey = process.env;
        const apiurl = process.env;
        try {
            await axios.delete(`/api/employees/${empId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": apikey,
                        "x-api-path": apiurl,
                    },
                    withCredentials: true,
                }
            );
            setEmployees(employees.filter(emp => emp._id !== empId));
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">{department} Department Employees</h2>
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    onClick={() => setShowModal(true)}
                >
                    New Employee
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <ul className="space-y-4">
                    {employees.map(employee => (
                        <li key={employee._id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div>
                                <p className="text-lg font-medium text-gray-700"><strong>Name:</strong> {employee.name}</p>
                                <p className="text-sm text-gray-500"><strong>Employee Code:</strong> {employee.emp_code}</p>
                                <p className="text-sm text-gray-500"><strong>Email:</strong> {employee.email}</p>
                            </div>
                            <button
                                onClick={() => deleteEmployee(employee._id)}
                                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                {employees.length === 0 && (
                    <p className="text-center text-gray-600 mt-6">No employees found for this department.</p>
                )}
            </div>

            {/* Popup modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <Createuser onClose={() => setShowModal(false)} />
                </div>
            )}
        </div>
    );
};

export default MYemployee;
