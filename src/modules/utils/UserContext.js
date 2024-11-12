import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // useEffect(()=>{getUser()},[])

  // const getUser = async() => {
  //     try {
  //         const res = await axios.get("https://store-management-nyeh.onrender.com/api/user/auth_check",{withCredentials: true})
  //         setUser(res.data)
  //         console.log("Context USer: ",user);
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
