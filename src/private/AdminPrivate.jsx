import { jwtDecode } from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";

const AdMinPrivate = ({ children }) => {
     const location = useLocation();
     const token = localStorage.getItem("token");

    
     if (!token) {
          return <Navigate state={location.pathname} to="/login" replace />;
     }

     let decoded;
     try {
          decoded = jwtDecode(token);
     } catch (error) {
          console.error("Invalid token:", error);
          return <Navigate state={location.pathname} to="/login" replace />;
     }

 
     const isPosition = "admin";

     if (decoded?.email && isPosition === "admin") {
          return children;
     } else {
          return <Navigate state={location.pathname} to="/login" replace />;
     }
};

export default AdMinPrivate;
