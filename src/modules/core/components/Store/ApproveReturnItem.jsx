import React, { useState, useEffect } from "react";
import axios from "../../axiosauth/axiosConfig"; // Make sure axiosConfig is set up correctly

const ApproveReturnItem = () => {
  const [returnItems, setReturnItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReturnItems = async () => {
    const apikey = process.env.REACT_APP_API_KEY_RETURN_ITEMS;
    try {
      const response = await axios.get("/api/store/admin/return-pending", {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apikey,
        },
        withCredentials: true,
      });
      setReturnItems(response.data.returnItems || []);
      setLoading(false);
    } catch (err) {
      setError("Error fetching return items.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReturnItems();
  }, []);

  const handleApproval = async (returnItem, index, status) => {
    try {
      await axios.patch(
        "/api/store/admin/update-return",
        {
          _id: returnItem._id,
          return_status: status,
          date_of_return: new Date().toISOString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.REACT_APP_API_KEY_UPDATE_RETURN,
          },
          withCredentials: true,
        }
      );

      // Re-fetch items after approval/rejection
      fetchReturnItems();
    } catch (err) {
      console.error("Error updating return status:", err);
    }
  };

  if (loading) return <p>Loading return items...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Approve Return Items</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="border border-gray-200 px-4 py-3 text-center">S.No.</th>
            <th className="border border-gray-200 px-4 py-3 text-center">Employee Name</th>
            <th className="border border-gray-200 px-4 py-3 text-center">Employee Code</th>
            <th className="border border-gray-200 px-4 py-3 text-center">Department</th>
            <th className="border border-gray-200 px-4 py-3 text-center">Item Name</th>
            <th className="border border-gray-200 px-4 py-3 text-center">Quantity Return</th>
            <th className="border border-gray-200 px-4 py-3 text-center">Order ID</th>
            <th className="border border-gray-200 px-4 py-3 text-center">Return Status</th>
            <th className="border border-gray-200 px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {returnItems.map((item, index) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="border px-4 py-3 text-center font-semibold">{index + 1}</td>
              <td className="border px-4 py-3 text-center">{item.name}</td>
              <td className="border px-4 py-3 text-center">{item.emp_code}</td>
              <td className="border px-4 py-3 text-center">{item.department}</td>
              <td className="border px-4 py-3 text-center">{item.item_name}</td>
              <td className="border px-4 py-3 text-center">{item.quantity_return}</td>
              <td className="border px-4 py-3 text-center">{item._id}</td>
              <td className="border px-4 py-3 text-center">
                <span
                  className={`${
                    item.return_status === "Approved"
                      ? "text-blue-600 font-bold"
                      : item.return_status === "Rejected"
                      ? "text-red-600 font-bold"
                      : "text-gray-600"
                  }`}
                >
                  {item.return_status}
                </span>
              </td>
              <td className="border px-4 py-3 text-center">
                <button
                  onClick={() => handleApproval(item, index, "Approved")}
                  className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApproval(item, index, "Rejected")}
                  className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveReturnItem;
