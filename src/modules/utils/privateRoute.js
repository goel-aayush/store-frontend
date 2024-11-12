import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../core/axiosauth/axiosConfig';
import { useUser } from '../utils/UserContext'; // Import the context

const PrivateRoute = ({ children, allowedRoles }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const { setUser } = useUser(); // Get the setter function from the context

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await axios.get('/api/user/auth_check', { withCredentials: true });

        console.log("response",response);
        
        
        const { role, emp_code, name, email, dept  } = response.data;
        console.log("auth",response.data.dept);
        

        if (allowedRoles.includes(role)) {
          // Store user details in context
          setUser({ role, emp_code, name, email, dept});
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        setIsAuthorized(false); // Unauthorized
      }
    };

    checkAuthorization();
  }, [allowedRoles, setUser]);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  if (isAuthorized === false) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
