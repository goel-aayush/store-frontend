import React, { useState } from "react";
import InventoryForm from "./InventoryForm";
import InventoryTable from "./InventoryTable";

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewItem = (newItem) => {
    // Optional: Add new item logic if you want to automatically show the new item in the table
    setIsModalOpen(false); // Close the modal after adding the item
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-8 space-y-6 bg-gray-100 min-h-screen">
      <button
        onClick={openModal}
        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
      >
        Add New Item
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-2xl text-gray-600"
            >
              &times; {/* Cross mark */}
            </button>
            <InventoryForm onItemAdded={handleNewItem} />
          </div>
        </div>
      )}

      <InventoryTable />
    </div>
  );
};

export default Inventory;
