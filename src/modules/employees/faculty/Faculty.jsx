import React from 'react';
import Header from '../../core/components/Header';

import { Outlet } from 'react-router-dom';
import Empsidebar from '../../core/components/Empsidebar';

export default function Faculty() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content area with sidebar and main content */}
      <div className="flex flex-1">
        {/* Sidebar with fixed width */}
        <div className="w-64">
          <Empsidebar />
        </div>
        {/* Main content section, with proper padding to avoid overlapping */}
        <main className="flex-grow p-6 mt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
