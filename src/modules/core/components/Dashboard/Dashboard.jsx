// import React, { useEffect, useState } from 'react';
// import axios from '../../axiosauth/axiosConfig';
// import Cookies from 'js-cookie';

// const Dashboard = () => {
//   const [orders, setOrders] = useState([]);
//   const [inventory, setInventory] = useState([]);
//   const [loading, setLoading] = useState(true);
// ;
//   console.log("role",Cookies.get());
//   console.log("Client Cookie: ",document.cookie);
  

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const orderResponse = await axios.get('/api/user/orders');
//         const inventoryResponse = await axios.get('/api/inventory/status');
        
//         setOrders(orderResponse.data);
//         setInventory(inventoryResponse.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   if (loading) {
//     return <p className="text-center text-xl font-semibold mt-10">Loading...</p>;
//   }

//   return (
//     <div className="dashboard-container p-8 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 min-h-screen">
//       <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">HoD Dashboard</h1>

//       {/* Order Summary Section */}
//       <section className="mb-12">
//         <h2 className="text-3xl font-semibold text-gray-700 mb-6">Order Summary</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <OrderCard title="Total Orders" count={orders.length} icon="📦" />
//           <OrderCard title="Pending Orders" count={orders.filter(order => order.status === 'pending').length} icon="⏳" />
//           <OrderCard title="Approved Orders" count={orders.filter(order => order.status === 'approved').length} icon="✅" />
//           <OrderCard title="Rejected Orders" count={orders.filter(order => order.status === 'rejected').length} icon="❌" />
//         </div>
//         <div className="flex justify-center mt-8">
//           <button className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-800 transition-all">
//             + Create New Order
//           </button>
//         </div>
//       </section>

//       {/* Recent Orders Section */}
//       <section className="mb-12">
//         <h2 className="text-3xl font-semibold text-gray-700 mb-6">Recent Orders</h2>
//         {orders.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {orders.map(order => (
//               <OrderItemCard key={order.id} order={order} />
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-lg text-gray-600">No recent orders found.</p>
//         )}
//       </section>

//       {/* Inventory Status Section */}
//       <section>
//         <h2 className="text-3xl font-semibold text-gray-700 mb-6">Inventory Status</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {inventory.map(item => (
//             <InventoryCard key={item.id} item={item} />
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// const OrderCard = ({ title, count, icon }) => (
//   <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transform transition-all hover:-translate-y-2 hover:shadow-2xl">
//     <div className="text-5xl mb-4">{icon}</div>
//     <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
//     <p className="text-4xl font-bold text-indigo-600 mt-2">{count}</p>
//   </div>
// );

// const OrderItemCard = ({ order }) => (
//   <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-2xl">
//     <div className="mb-4">
//       <h3 className="text-xl font-bold text-gray-800">Order ID: {order._id}</h3>
//     </div>
//     <div className="mb-2">
//       <strong>Product:</strong> {order.order_item}
//     </div>
//     <div className="mb-2">
//       <strong>Quantity Required:</strong> {order.quantity_required}
//     </div>
//     <div className="mb-2">
//       <strong>Status:</strong>
//       <span className={`ml-2 py-1 px-3 rounded-lg text-sm font-bold ${
//         order.status === 'approved' ? 'bg-green-200 text-green-700' :
//         order.status === 'rejected' ? 'bg-red-200 text-red-700' :
//         'bg-yellow-200 text-yellow-700'
//       }`}>
//         {order.status}
//       </span>
//     </div>
//     <div className="mt-4">
//       {order.status === "pending" && (
//         <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-all">
//           Withdraw Order
//         </button>
//       )}
//       {order.status === "rejected" && (
//         <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all">
//           Reapply
//         </button>
//       )}
//       {order.status === "approved" && (
//         <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all">
//           Return Order
//         </button>
//       )}
//     </div>
//   </div>
// );

// const InventoryCard = ({ item }) => (
//   <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-2xl">
//     <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
//     <p className="text-lg text-gray-600">Stock: {item.stock}</p>
//     <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all">
//       Request More
//     </button>
//   </div>
// );

// export default Dashboard;
import React, { useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  // State to toggle between monthly and yearly reports
  const [reportType, setReportType] = useState("Monthly");

  // Bar chart data for monthly and yearly reports
  const reportData = useMemo(() => {
    return reportType === "Monthly"
      ? {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Orders Created",
              data: [12, 18, 15, 20, 25, 22],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Orders Approved",
              data: [10, 15, 12, 18, 22, 20],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        }
      : {
          labels: ["2020", "2021", "2022", "2023", "2024"],
          datasets: [
            {
              label: "Orders Created",
              data: [120, 150, 180, 220, 200],
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Orders Approved",
              data: [100, 130, 170, 210, 190],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        };
  }, [reportType]);

  // Sample recent orders awaiting approval
  const pendingOrders = [
    { id: 1, item: "20 Pens", department: "CS", date: "2024-11-25", status: "Pending" },
    { id: 2, item: "15 Notebooks", department: "Math", date: "2024-11-24", status: "Pending" },
    { id: 3, item: "5 Markers", department: "Physics", date: "2024-11-23", status: "Pending" },
  ];

  // Sample form state for creating orders
  const [newOrder, setNewOrder] = useState({
    itemName: "",
    quantity: "",
    purpose: "",
  });

  const handleCreateOrder = () => {
    alert(
      `Order Created: \nItem: ${newOrder.itemName}\nQuantity: ${newOrder.quantity}\nPurpose: ${newOrder.purpose}`
    );
    setNewOrder({ itemName: "", quantity: "", purpose: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">HoD Dashboard</h1>
        <p className="text-gray-600">Manage orders, view reports, and create new orders</p>
      </header>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-6 bg-blue-500 rounded-lg shadow-md text-white">
          <h2 className="text-2xl font-bold">120</h2>
          <p>Total Orders Created</p>
        </div>
        <div className="p-6 bg-green-500 rounded-lg shadow-md text-white">
          <h2 className="text-2xl font-bold">100</h2>
          <p>Orders Approved</p>
        </div>
        <div className="p-6 bg-yellow-500 rounded-lg shadow-md text-white">
          <h2 className="text-2xl font-bold">20</h2>
          <p>Pending Orders</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Order Trends</h2>
          <div>
            <button
              onClick={() => setReportType("Monthly")}
              className={`px-4 py-2 mr-2 rounded ${
                reportType === "Monthly" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setReportType("Yearly")}
              className={`px-4 py-2 rounded ${
                reportType === "Yearly" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
        <Bar data={reportData} />
      </div>

      {/* Pending Orders Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Pending Approvals</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2 px-4 text-gray-800">Item</th>
              <th className="border-b py-2 px-4 text-gray-800">Department</th>
              <th className="border-b py-2 px-4 text-gray-800">Date</th>
              <th className="border-b py-2 px-4 text-gray-800">Status</th>
              <th className="border-b py-2 px-4 text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingOrders.map((order) => (
              <tr key={order.id}>
                <td className="border-b py-2 px-4">{order.item}</td>
                <td className="border-b py-2 px-4">{order.department}</td>
                <td className="border-b py-2 px-4">{order.date}</td>
                <td className="border-b py-2 px-4">{order.status}</td>
                <td className="border-b py-2 px-4">
                  <button className="bg-green-500 text-white px-4 py-1 mr-2 rounded">
                    Approve
                  </button>
                  <button className="bg-red-500 text-white px-4 py-1 rounded">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Order Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Create New Order</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Item Name"
            value={newOrder.itemName}
            onChange={(e) => setNewOrder({ ...newOrder, itemName: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newOrder.quantity}
            onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Purpose"
            value={newOrder.purpose}
            onChange={(e) => setNewOrder({ ...newOrder, purpose: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={handleCreateOrder}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Order
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
