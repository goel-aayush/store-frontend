import React, { useState, useEffect } from "react";
import axios from "../../axiosauth/axiosConfig"; // Adjust the path as necessary

const ReturnInventory = () => {
  const [returnInventory, setReturnInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("approved");
  const [error, setError] = useState(null);

  // Departments and statuses for filter options
  const departments = ["Computer Science", "Mechanical", "Electronics"]; // Add dynamic departments if necessary
  const statuses = ["approved", "pending", "rejected"];

  // Fetch return inventory data
  const fetchReturnInventory = async () => {
    const apikey = process.env.REACT_APP_API_KEY_INVENTORY;
    const apiurl = process.env.REACT_APP_API_URL_RETURN_INVENTORY;

    try {
      const response = await axios.get('/api/store/return_inventory', {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apikey,
        },
        withCredentials: true,
      });
      setReturnInventory(response.data);
      setFilteredInventory(response.data);
    } catch (err) {
      console.error("Error fetching return inventory:", err);
      setError("Failed to fetch return inventory.");
    }
  };

  // Search handler to filter by search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = returnInventory.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredInventory(filteredData);
  };

  // Department filter handler
  const handleDepartmentFilter = (department) => {
    setSelectedDepartment(department);
    filterInventory(department, selectedStatus);
  };

  // Status filter handler
  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    filterInventory(selectedDepartment, status);
  };

  // Function to apply filters
  const filterInventory = (department, status) => {
    let filteredData = returnInventory;

    if (department) {
      filteredData = filteredData.filter(
        (item) => item.department.toLowerCase() === department.toLowerCase()
      );
    }

    if (status) {
      filteredData = filteredData.filter(
        (item) => item.return_status.toLowerCase() === status.toLowerCase()
      );
    }

    setFilteredInventory(filteredData);
  };

  useEffect(() => {
    fetchReturnInventory();
    const interval = setInterval(fetchReturnInventory, 30000); // Auto-refresh every 30 seconds
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Return Inventory</h2>

      {error && <p className="text-red-500">{error}</p>}

      {/* Search Bar */}
      <div className="mb-4 flex">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-l-md"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r-md"
          onClick={() => handleSearch(searchQuery)}
        >
          Search
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-4">
        <select
          className="border border-gray-300 p-2 rounded-md"
          value={selectedDepartment}
          onChange={(e) => handleDepartmentFilter(e.target.value)}
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          className="border border-gray-300 p-2 rounded-md"
          value={selectedStatus}
          onChange={(e) => handleStatusFilter(e.target.value)}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Inventory Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">S.No</th>
            <th className="border px-4 py-2">Emp Name</th>
            <th className="border px-4 py-2">Emp Code</th>
            <th className="border px-4 py-2">Department</th>
            <th className="border px-4 py-2">Item Name</th>
            <th className="border px-4 py-2">Quantity Returned</th>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Return Status</th>
            <th className="border px-4 py-2">Date of Return</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center py-4">
                No return items found matching your filters.
              </td>
            </tr>
          ) : (
            filteredInventory.map((item, index) => (
              <tr key={item._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.name || "N/A"}</td>
                <td className="border px-4 py-2">{item.emp_code || "N/A"}</td>
                <td className="border px-4 py-2">{item.department || "N/A"}</td>
                <td className="border px-4 py-2">{item.item_name || "N/A"}</td>
                <td className="border px-4 py-2">{item.quantity_return || "N/A"}</td>
                <td className="border px-4 py-2">{item.order_id || "N/A"}</td>
                <td className="border px-4 py-2">{item.return_status || "N/A"}</td>
                <td className="border px-4 py-2">
                  {item.date_of_return
                    ? new Date(item.date_of_return).toLocaleDateString("en-GB")
                    : "N/A"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReturnInventory;
