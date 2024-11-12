import React, { useState } from "react";
import axios from "../../axiosauth/axiosConfig";

const InventoryForm = ({ onItemAdded }) => {
  const [formData, setFormData] = useState({
    item_name: "",
    quantity: "",
    bill_no: "",
    buy_from: "",
    date: "",
    accepted_by: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apikey = process.env.REACT_APP_API_KEY_ADD_ITEM;
      const apiurl = process.env.REACT_APP_API_URL_ADD_ITEM;
      const response = await axios.post(apiurl, formData, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key":apikey,
          "x-api-path":apiurl,
        },
        withCredentials: true,
      });

      if (response.data && response.data.item) {
        onItemAdded(response.data.item);
        setFormData({
          item_name: "",
          quantity: "",
          bill_no: "",
          buy_from: "",
          date: "",
          accepted_by: "",
        });
        alert("item added succesfully");
      }
    } catch (err) {
      console.error("Error adding item:", err);
      setError("Failed to add item to inventory.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Item Name</label>
        <input
          type="text"
          name="item_name"
          value={formData.item_name}
          onChange={handleInputChange}
          className="mt-1 p-2 border w-full rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          className="mt-1 p-2 border w-full rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Bill Number</label>
        <input
          type="text"
          name="bill_no"
          value={formData.bill_no}
          onChange={handleInputChange}
          className="mt-1 p-2 border w-full rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Buy From</label>
        <input
          type="text"
          name="buy_from"
          value={formData.buy_from}
          onChange={handleInputChange}
          className="mt-1 p-2 border w-full rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="mt-1 p-2 border w-full rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Accepted By</label>
        <input
          type="text"
          name="accepted_by"
          value={formData.accepted_by}
          onChange={handleInputChange}
          className="mt-1 p-2 border w-full rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Adding Item..." : "Add Item"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default InventoryForm;
