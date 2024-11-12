import React, { useState, useEffect } from "react";
import axios from "../../axiosauth/axiosConfig";

const Approval = () => {
  const [orders, setOrders] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    const apikey = process.env.REACT_APP_API_KEY_PENDING_ITEM;
    const apiurl = "/api/store/adminapproval";
    try {
      const response = await axios.get(apiurl, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apikey, // Custom API key header
          "x-api-path": apiurl,
        },
        withCredentials: true, // Ensure cookies are included in cross-site requests
      });
      console.log("Response from store:", response);
      setOrders(response.data.items || []); // Ensure that orders is always an array
      setLoading(false);
    } catch (error) {
      setError("Error fetching orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to handle form submit for updating order approval
  const handleApproval = async (order, index) => {
    const apikey = process.env.REACT_APP_API_KEY_ORDER;
    const apiurl = process.env.REACT_APP_API_URL_ORDER;
    try {
      const response = await axios.patch(
        "/api/store/order",
        {
          _id: order._id,
          order_status: order.approved ? "Delivered" : "rejected",
          quantity_issued: order.quantity_issued,
          date_of_issue: order.date_of_issue,
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

      console.log("Order updated:", response);
      await fetchOrders(); // Fetch updated orders after approval
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Function to handle input changes in the form
  const handleInputChange = (e, index, field) => {
    const updatedOrders = [...orders];

    // For the 'approved' field, convert to boolean
    if (field === "approved") {
      updatedOrders[index][field] = e.target.value === "true"; // Cast string to boolean
    } else {
      updatedOrders[index][field] = e.target.value;
    }

    setOrders(updatedOrders);
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order Approval</h2>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Item Name</th>
            <th className="border px-4 py-2">Department</th>
            <th className="border px-4 py-2">Quantity Required</th>
            <th className="border px-4 py-2">Quantity Issued</th>
            <th className="border px-4 py-2">Approved</th>
            <th className="border px-4 py-2">Date of Issue</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order._id}> {/* Use a unique key (like _id) */}
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">{order.order_item}</td>
                <td className="border px-4 py-2">{order.department}</td>
                <td className="border px-4 py-2">{order.quantity_required}</td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={order.quantity_issued}
                    onChange={(e) => handleInputChange(e, index, "quantity_issued")}
                    className="p-2 border border-gray-300 rounded-lg w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <select
                    value={order.approved ? "true" : "false"} // Ensure the correct value is displayed
                    onChange={(e) => handleInputChange(e, index, "approved")}
                    className="p-2 border border-gray-300 rounded-lg w-full"
                  >
                    <option value="true">Approved</option>
                    <option value="false">Not Approved</option>
                  </select>
                </td>

                <td className="border px-4 py-2">
                  <input
                    type="date"
                    value={order.date_of_issue}
                    onChange={(e) => handleInputChange(e, index, "date_of_issue")}
                    className="p-2 border border-gray-300 rounded-lg w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleApproval(order, index)}
                    className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-700"
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="border px-4 py-2 text-center">
                No orders to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Approval;
