import React, { useState, useEffect } from "react";
import axios from "../../axiosauth/axiosConfig";

const InventoryTable = () => {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    session: "",
    date: "",
    product: ""
  });
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch inventory data
  const fetchInventory = async () => {
    const apikey = process.env.REACT_APP_API_KEY_INVENTORY;
    const apiurl = process.env.REACT_APP_API_URL_INVENTORY;
    try {
      const response = await axios.get(apiurl, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apikey,
        },
        withCredentials: true,
      });
      setInventory(response.data.items);
    } catch (err) {
      console.error("Error fetching inventory:", err);
      setError("Failed to fetch inventory.");
    }
  };

  useEffect(() => {
    fetchInventory();
    const interval = setInterval(fetchInventory, 30000); // Auto-refresh every 30 seconds
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  // Handle search and filter changes
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1); // Reset to the first page on filter change
  };

  // Apply search and filter
  const filteredInventory = inventory
    .filter(item =>
      (item.item_name?.toLowerCase().includes(searchTerm.toLowerCase()) || "") ||
      (item.buy_from?.toLowerCase().includes(searchTerm.toLowerCase()) || "")
    )
    .filter(item => {
      const formattedItemDate = item.date ? new Date(item.date).toLocaleDateString("en-GB") : "N/A";
      const formattedFilterDate = filters.date ? new Date(filters.date).toLocaleDateString("en-GB") : "N/A";

      return (
        (!filters.session || item.session === filters.session) &&
        (!filters.date || formattedItemDate === formattedFilterDate) &&
        (!filters.product || item.item_name?.includes(filters.product))
      );
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, latest first

  // Pagination logic
  const totalItems = filteredInventory.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInventory = filteredInventory.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Inventory Items</h2>
      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or vendor"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-lg w-full sm:w-1/3 mb-2 sm:mb-0"
        />
        <input
          type="text"
          name="session"
          placeholder="Filter by session"
          value={filters.session}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg w-full sm:w-1/3 mb-2 sm:mb-0"
        />
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg w-full sm:w-1/3"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">S.No</th>
            <th className="border px-4 py-2">Item Name</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Bill No</th>
            <th className="border px-4 py-2">Buy From</th>
            <th className="border px-4 py-2">Date of Purchase</th>
            <th className="border px-4 py-2">Accepted By</th>
            <th className="border px-4 py-2">Upload Bills</th>
          </tr>
        </thead>
        <tbody>
          {paginatedInventory.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-4">
                No items match your search and filter criteria.
              </td>
            </tr>
          ) : (
            paginatedInventory.map((item, index) => (
              <tr key={item._id}>
                <td className="border px-4 py-2">{startIndex + index + 1}</td>
                <td className="border px-4 py-2">{item.item_name || "N/A"}</td>
                <td className="border px-4 py-2">{item.quantity || "N/A"}</td>
                <td className="border px-4 py-2">{item.bill_no || "N/A"}</td>
                <td className="border px-4 py-2">{item.buy_from || "N/A"}</td>
                <td className="border px-4 py-2">
                  {item.date ? new Date(item.date).toLocaleDateString("en-GB") : "N/A"}
                </td>
                <td className="border px-4 py-2">{item.accepted_by || "N/A"}</td>
                <td className="border px-4 py-2">
                  <input type="file" />
                  <button className="mt-2 p-1 bg-blue-500 text-white rounded">
                    Upload Bill
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InventoryTable;
