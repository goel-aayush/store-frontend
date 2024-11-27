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
  const [sessions, setSessions] = useState([]);

  const generateSessions = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0 = January, 11 = December
  
    // If the month is between January (0) and March (2), the financial year is previousYear-currentYear
    const financialYearStart = currentMonth < 3 ? currentYear - 1 : currentYear;
  
    const startYear = 2020; // Define the start year as per your requirement
    const generatedSessions = [];
  
    for (let year = startYear; year <= financialYearStart; year++) {
      generatedSessions.push(`${year}-${year + 1}`);
    }
  
    // Reverse to show the latest session first
    const sessionsReversed = generatedSessions.reverse();
  
    setSessions(sessionsReversed);
  
    // Set default session to the current financial year
    setFilters((prev) => ({
      ...prev,
      session: `${financialYearStart}-${financialYearStart + 1}`
    }));
  };
  

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
    generateSessions();
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

  // Download CSV logic
  const downloadCSV = () => {
    const csvHeaders = ["S.No", "Item Name", "Quantity", "Bill No", "Buy From", "Date of Purchase", "Accepted By"];
    const csvRows = filteredInventory.map((item, index) => [
      index + 1,
      item.item_name || "N/A",
      item.quantity || "N/A",
      item.bill_no || "N/A",
      item.buy_from || "N/A",
      item.date ? new Date(item.date).toLocaleDateString("en-GB") : "N/A",
      item.accepted_by || "N/A"
    ]);

    const csvContent = [
      csvHeaders.join(","), // Add the headers
      ...csvRows.map(row => row.join(",")) // Add the rows
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "inventory_report.csv";
    link.click();

    URL.revokeObjectURL(url); // Clean up the URL object
  };

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
        <select
          name="session"
          value={filters.session}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg w-full sm:w-1/3 mb-2 sm:mb-0"
        >
          {sessions.map((session) => (
            <option key={session} value={session}>
              {session}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg w-full sm:w-1/3"
        />
      </div>

      <button
        onClick={downloadCSV}
        className="p-2 bg-green-500 text-white rounded-lg mb-4"
      >
        Download Report
      </button>

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
          </tr>
        </thead>
        <tbody>
          {paginatedInventory.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4">
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
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 border rounded-lg ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InventoryTable;
