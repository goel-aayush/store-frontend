import React from "react";

const OrderStatusBar = ({ status }) => {
  
  const stages = ["Ordered", "pending", "approved by hod", "approved by admin", "Delivered"];
  
  // Determine the index of the current status to highlight stages
  const currentIndex = stages.indexOf(status);

  return (
    <div className="flex items-center justify-between mt-4 mb-6">
      {stages.map((stage, index) => (
        <div key={stage} className="flex-1">
          <div
            className={`text-center font-semibold ${
              index <= currentIndex ? "text-blue-600" : "text-gray-400"
            }`}
          >
            {stage}
          </div>
          {/* Progress line */}
          {index < stages.length - 1 && (
            <div
              className={`h-1 ${
                index < currentIndex ? "bg-blue-600" : "bg-gray-200"
              }`}
              style={{ width: "100%" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderStatusBar;
