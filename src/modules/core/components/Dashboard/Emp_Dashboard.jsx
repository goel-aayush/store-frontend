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
//       <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Employee Dashboard</h1>

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
import React, { useState, useEffect , useRef } from "react";
import axios from "axios"; 

const Dashboard = () => {
  const [greeting, setGreeting] = useState("");
  const [thoughtOfTheDay, setThoughtOfTheDay] = useState("Fetching thought...");
  const isFetchedRef = useRef(false);
  const dashboardCards = [
    {
      title: "Create Order",
      description: "Quickly create new orders.",
      buttonLabel: "Create Now",
      bgColor: "bg-gradient-to-r from-blue-500 to-purple-600",
      link: "createorder",
    },
    {
      title: "Order History",
      description: "View and manage past orders.",
      buttonLabel: "View History",
      bgColor: "bg-gradient-to-r from-green-500 to-teal-600",
      link: "orderhistory",
    },
    {
      title: "Return Items",
      description: "Return items with ease.",
      buttonLabel: "Return Items",
      bgColor: "bg-gradient-to-r from-red-500 to-orange-600",
      link: "return",
    },
    {
      title: "Emails",
      description: "Check important notifications.",
      buttonLabel: "View Emails",
      bgColor: "bg-gradient-to-r from-indigo-500 to-blue-600",
      link: "inbox",
    },
    {
      title: "Change Password",
      description: "Secure your account by updating the password.",
      buttonLabel: "Change Now",
      bgColor: "bg-gradient-to-r from-pink-500 to-red-600",
      link: "profile",
    },
  ];

  useEffect(() => {
    // Set greeting based on time
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
    if (isFetchedRef.current) return; // Skip if already called
    isFetchedRef.current = true; 
    // Fetch Thought of the Day
    const fetchQuote = async () => {
      try {
        const response = await axios.get("https://api.quotable.io/quotes/random");

        const quote = response.data[0]?.content || "Stay positive and keep working hard!";
        setThoughtOfTheDay(quote);
      } catch (error) {
        console.error("Error fetching thought:", error);
        setThoughtOfTheDay("Error fetching thought. Stay positive and keep going!");
      }
    };

    fetchQuote(); // Call the function
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Greeting and Thought of the Day */}
      <header className="p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">{greeting}!</h1>
        <p className="mt-2 text-gray-600 italic">"{thoughtOfTheDay}"</p>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md text-white ${card.bgColor} hover:scale-105 transition-transform`}
            >
              <h2 className="text-xl font-bold mb-2">{card.title}</h2>
              <p className="text-sm text-gray-200 mb-4">{card.description}</p>
              <a
                href={card.link}
                className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100"
              >
                {card.buttonLabel}
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
