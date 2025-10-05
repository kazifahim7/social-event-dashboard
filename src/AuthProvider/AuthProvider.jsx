
import { createContext, useState } from "react";



// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
     const [user, setUser] = useState(null)
     const [loading, setLoading] = useState(false)

     const logout = () => {
          setLoading(true)
          return setUser(null)
     }

     const info = {
          user,
          loading,
          logout,
          setLoading,
        setUser
     }
     return (
          <AuthContext.Provider value={info}>
               {
                    children
               }

          </AuthContext.Provider>
     );
};

export default AuthProvider;