import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './modules/auth/Login';
import PrivateRoute from './modules/utils/privateRoute';
import Order from './modules/core/components/Create_order/Order';
import Orderhistory from './modules/core/components/orderhistory/Orderhistory';
import Return from './modules/core/components/Return_item/Return';
import Profie from './modules/core/components/Profile/Profie';
import Dashboard from './modules/core/components/Dashboard/Dashboard';
import Terms from './modules/core/components/Terms & Condition/Terms';
import { UserProvider } from './modules/utils/UserContext';
import Store from './modules/employees/Admin/Store';
import StoreDashboard from './modules/core/components/Dashboard/StoreDashboard';
import Emp_Dashboard from './modules/core/components/Dashboard/Emp_Dashboard'

import Inventory from './modules/core/components/Store/Inventory';
import Approval from './modules/core/components/Store/Approval';
import Forgetpassword from './modules/core/components/Forget_password/Forget_password';
import Newpassword from './modules/core/components/Forget_password/Newpassword';
import Inbox from './modules/core/components/Mailbox/Inbox';
import Faculty from './modules/employees/faculty/Faculty';
import HoD from './modules/employees/Hod/HoD';
import Createuser from './modules/core/components/Createuser';
import Myemployee from './modules/core/components/Myemployee';
import Orderapproval from './modules/employees/Hod/Orderapproval';
import ApproveReturnItem from './modules/core/components/Store/ApproveReturnItem';
import ReturnInventoryTable from './modules/core/components/Store/ReturnInventory';

// Define the routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/HoD',
    element: (

      <PrivateRoute allowedRoles={['HoD']}>
        <HoD/>
      </PrivateRoute>
      
    ),
    children: [
      {
        path: 'dashboard',
        element: <Dashboard/>
      },
      {
        path: 'orderapproval',
        element: <Orderapproval/>
      },
      {
        path: 'createorder',
        element: <Order/>
      },
      {
        path: 'createuser',
        element: <Createuser/>
      },
      {
        path: 'orderhistory',
        element: <Orderhistory/>
      },
      {
        path: 'return',
        element: <Return/>
      },
      {
        path: 'profile',
        element: <Profie/>
      },
      {
        path:'myemployee',
        element:<Myemployee/>
      },
      {
        path: 'term&condition',
        element: <Terms/>
      },
      {
        path:'inbox',
        element:<Inbox/>
      }
      
    ]
  },
  {
    path: '/store',
    element: (
      <PrivateRoute allowedRoles={['store']}>
        <Store/>
      </PrivateRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <StoreDashboard/>
      },
      {
        path: 'inventory',
        element: <Inventory/>
      },
      {
        path: 'approval',
        element: <Approval/>
      },
      {
        path: 'return',
        element: <ApproveReturnItem/>
      },
      {
        path: 'return_inventory',
        element: <ReturnInventoryTable/>
      },
      {
        path: 'orderhistory',
        element: <Orderhistory/>
      },
      {
        path: 'profile',
        element: <Profie/>
      },
      {
        path: 'term&condition',
        element: <Terms/>
      },
      {
        path:'inbox',
        element:<Inbox/>
      }
    ]
  },
  {
    path: '/faculty',
    element: (
      <PrivateRoute allowedRoles={['faculty']}>
        <Faculty/>
      </PrivateRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <Emp_Dashboard/>
      },
      {
        path: 'createorder',
        element: <Order/>
      },
      {
        path:'orderhistory',
        element:<Orderhistory/>
      },
      {
        path: 'return',
        element: <Return/>
      },
      {
        path: 'profile',
        element: <Profie/>
      },
      {
        path: 'term&condition',
        element: <Terms/>
      },
      {
        path:'inbox',
        element:<Inbox/>
      }
    ]
  },
  {
    path:'forgetpassword',
    element: <Forgetpassword/>
  },
  {
    path:'/reset-password/:token',
    element:<Newpassword/>
  }
  
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
  
    <RouterProvider router={router} />
  
  </UserProvider>
);

reportWebVitals();
