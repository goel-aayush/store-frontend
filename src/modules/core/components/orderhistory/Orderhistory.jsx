import React, { useEffect, useState } from "react";
import axios from "../../axiosauth/axiosConfig";
import { FaBoxOpen } from "react-icons/fa";
import OrderStatusBar from "./OrderStatusBar"; // Import the OrderStatusBar component

const Orderhistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        const apikey = process.env.REACT_APP_API_KEY_ORDER_HISTORY;
        const apiurl = process.env.REACT_APP_API_URL_ORDER_HISTORY;

        if (!user_id) throw new Error("User ID not found in localStorage");

        const { data } = await axios.get(
          `/api/user/order_history?user_id=${user_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apikey,
              "x-api-path": apiurl,
            },
            withCredentials: true,
          }
        );

        if (data.success && data.matchingOrder) {
          setOrders(data.matchingOrder);
        } else {
          throw new Error("No matching orders found");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch order history");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleWithdraw = async (orderId) => {
    const apikey = process.env.REACT_APP_API_KEY_WITHDRAW_ORDER;
    const apiurl = process.env.REACT_APP_API_URL_WITHDRAW_ORDER;
  
    try {
      const { data } = await axios.delete(
        apiurl, // or use `apiurl` if it's the complete URL
        {
          params: { _id: orderId },
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apikey, // Custom API key header
            "x-api-path": apiurl,
          },
          withCredentials: true, // Ensure cookies are included in cross-site requests
        }
      );
  
      if (data.success) {
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        alert("Order withdrawn successfully");
      } else {
        throw new Error(data.message || "Failed to withdraw order");
      }
    } catch (err) {
      console.error("Error withdrawing order:", err.message);
      alert("Error withdrawing order: " + err.message);
    }
  };

  const handleReturn = async (orderId) => {
    try {
      const apikey = process.env.REACT_APP_API_KEY_RETURN_ITEM;
      const apiurl = process.env.REACT_APP_API_URL_RETURN_ITEM;
      const { data } = await axios.post(apiurl, {
        _id: orderId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apikey, // Custom API key header
          "x-api-path": apiurl,
        },
        withCredentials: true, // Ensure cookies are included in cross-site requests
      });

      if (data.success) {
        alert("Order returned successfully");
      } else {
        throw new Error(data.message || "Failed to return order");
      }
    } catch (err) {
      console.error("Error returning order:", err.message);
      alert("Error returning order: " + err.message);
    }
  };

  if (loading) return <p>Loading order history...</p>;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full mt-16">
        <FaBoxOpen className="text-6xl text-gray-500 mb-4" />
        <h3 className="text-xl font-bold text-gray-700 mb-2">No Orders Found</h3>
        <p className="text-gray-500 text-sm">
          It looks like you haven't placed any orders yet. Check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-slate-200">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order._id}
            className="border p-4 rounded-lg shadow-sm bg-white mb-4"
          >
            <div className="mb-2">
              <strong>Order ID: </strong>
              {order._id}
            </div>
            <div className="mb-2">
              <strong>Product Name: </strong>
              {order.order_item}
            </div>
            <div className="mb-2">
              <strong>Quantity Required: </strong>
              {order.quantity_required}
            </div>
            <div className="mb-2">
              <strong>Remark: </strong>
              {order.remark}
            </div>
            <div className="mb-2">
              <strong>Status: </strong>
              {order.order_status || "N/A"}
            </div>

            {/* Add Order Status Bar */}
            <OrderStatusBar status={order.order_status} />

            {/* Conditionally render buttons based on order status */}
            {order.order_status === "pending" && (
              <button
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-700"
                onClick={() => handleWithdraw(order._id)}
              >
                Withdraw Order
              </button>
            )}
            {order.order_status === "rejected" && (
              <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700">
                Reapply
              </button>
            )}
            {order.order_status === "Delivered" && (
              <button
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                onClick={() => handleReturn(order._id)}
              >
                Return
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No matching orders found.</p>
      )}
    </div>
  );
};

export default Orderhistory;
