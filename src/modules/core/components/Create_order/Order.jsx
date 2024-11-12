import React, { useState } from "react";
import axios from "../../axiosauth/axiosConfig";
import { useUser } from "../../../utils/UserContext"; // Import the context
import Cookies from "js-cookie";

export default function Order() {
  const { user } = useUser();
   // Get user details from context
  console.log("user" ,user);
  


  // State to manage list of items and errors
  const [items, setItems] = useState([{ order_item: "", quantity_required: "", remark: "" }]);
  const [errors, setErrors] = useState([]); // For tracking errors

  // Handle input change and validation
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedItems = [...items];
    updatedItems[index][name] = value;
    setItems(updatedItems);

    // Remove error when the input becomes valid
    if (name === "quantity_required" && (value >= 1 || value === '')) {
      const updatedErrors = [...errors];
      updatedErrors[index] = ""; // Clear the error for this index
      setErrors(updatedErrors);
    }
  };

  // Function to add a new row to the table
  const addRow = () => {
    setItems([...items, { order_item: "", quantity_required: "", remark: "" }]);
    setErrors([...errors, ""]); // Add an empty error for the new row
  };

  // Function to remove a row from the table
  const removeRow = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);

    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1); // Remove the error for the removed row
    setErrors(updatedErrors);
  };

  // Validate before submitting
  const validateItems = () => {
    const newErrors = items.map((item) => {
      if (!item.quantity_required || item.quantity_required < 1) {
        return "Quantity is required and should be at least 1";
      }
      return "";
    });

    setErrors(newErrors);

    // Return true if there are no errors
    return newErrors.every((error) => error === "");
  };

  // Generate a unique slip number
  const generateSlipNo = () => {
    return `SLIP-${user.emp_code}-${Date.now()}`;
  };

  // Submit all items
  const handleSubmit = async () => {
    if (!validateItems()) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const slipNo = generateSlipNo();
    const orderData = {
      slip_no: slipNo,
      items,
      name: Cookies.get("name"),
      email: Cookies.get("user_email"),
      user_id: localStorage.getItem("user_id"),
      emp_code: user.emp_code,
      department: user.dept,
    };

    try {
      const apikey = process.env.REACT_APP_API_KEY_CREATE_ORDER;
      const apiurl = process.env.REACT_APP_API_URL_CREATE_ORDER;
      const response = await axios.post(apiurl, orderData,  
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apikey, // Custom API key header
          "x-api-path": apiurl,
        },
        withCredentials: true, // Ensure cookies are included in cross-site requests
      });
      console.log("Order response:", response);

      alert("Order created successfully");
      // Reset the items after successful submission
      setItems([{ order_item: "", quantity_required: "", remark: "" }]);
      setErrors([""]); // Reset errors
    } catch (error) {
      console.error("Error submitting the order:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10 h-screen">
      <div className="bg-white p-8 rounded-lg shadow-xl border w-full max-w-2xl">
        {/* Table format for adding items */}
        <table className="min-w-full bg-white border mt-6">
          <thead>
            <tr>
              <th className="border px-4 py-2">Product Name <span className="text-red-600">*</span></th>
              <th className="border px-4 py-2">Quantity Required  <span className="text-red-600">*</span></th>
              <th className="border px-4 py-2">Remark</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="order_item"
                    value={item.order_item}
                    
                    onChange={(e) => handleInputChange(index, e)}
                    className="p-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter Product Name"
                    required
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    name="quantity_required"
                    min={1}
                    value={item.quantity_required}
                    onChange={(e) => handleInputChange(index, e)}
                    className="p-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter Quantity Required"
                    required
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="remark"
                    value={item.remark}
                    onChange={(e) => handleInputChange(index, e)}
                    className="p-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter Remark"
                  />
                </td>
                {errors[index] && <p className="text-red-500">{errors[index]}</p>}
                <td className="border px-4 py-2">
                  <button
                    onClick={() => removeRow(index)}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Row Button */}
        <button
          onClick={addRow}
          className="bg-blue-500 text-white font-bold py-2 px-4 mt-4 rounded-lg w-full hover:bg-blue-700 transition duration-300"
        >
          Add Another Item
        </button>

        {/* Submit Button */}
        {items.length > 0 && (
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white font-bold py-2 px-4 mt-4 rounded-lg w-full hover:bg-green-700 transition duration-300"
          >
            Submit All Items
          </button>
        )}
      </div>
    </div>
  );
}
