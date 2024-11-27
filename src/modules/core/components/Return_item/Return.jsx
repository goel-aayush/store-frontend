import React, { useEffect, useState } from "react";
import axios from "../../axiosauth/axiosConfig";

const Return = () => {
  const [approvedOrders, setApprovedOrders] = useState([]); // State to store approved orders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchApprovedOrders = async () => {
      const apikey = process.env.REACT_APP_API_KEY_WITHDRAW_ORDER;
      const apiurl = process.env.REACT_APP_API_URL_WITHDRAW_ORDER;
      try {
        // Fetch orders with status "Approved" or "Pending"
        const response = await axios.get("/api/user/pendingreturnitems", {
          params: { user_id },
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apikey, // Custom API key header
            "x-api-path": apiurl,
          },
          withCredentials: true, // Ensure cookies are included in cross-site requests
        });
        console.log("return Items:", response.data);

        if (response.data.success) {
          setApprovedOrders(response.data.returnItems || []);
        } else {
          setError("No approved or pending orders found");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching approved orders:", err);
        setError("Failed to fetch approved orders");
        setLoading(false);
      }
    };

    fetchApprovedOrders();
  }, [user_id]);

  // Function to format date to dd/mm/yy
  const formatDate = (isoDate) => {
    if (!isoDate) return "Not Returned Yet";
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB"); // "en-GB" gives dd/mm/yyyy format
  };

  if (loading) {
    return <p>Loading approved or pending orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Return Approved or Pending Items
      </h2>
      {approvedOrders.length > 0 ? (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Item Name</th>
              <th className="border px-4 py-2">Quantity Returned</th>
              <th className="border px-4 py-2">Return Status</th>
              <th className="border px-4 py-2">Date of Return</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvedOrders.map((order) => (
              <tr key={order._id}>
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">{order.item_name}</td>
                <td className="border px-4 py-2">{order.quantity_return}</td>
                <td className="border px-4 py-2">{order.return_status}</td>
                <td className="border px-4 py-2">
                  {formatDate(order.date_of_return)}
                </td>{" "}
                {/* Formatted date */}
                <td className="border px-4 py-2">
                  {/* Uncomment and modify the button below if you want to handle return actions */}
                  {/* <button
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700"
                    onClick={() => handleReturn(order)}
                    disabled={order.order_status === "Returned"}
                  >
                    {order.order_status === "Returned" ? "Already Returned" : "Return Item"}
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No approved or pending orders available for return.</p>
      )}
    </div>
  );
};

export default Return;
