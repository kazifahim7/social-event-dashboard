import { jwtDecode } from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";
const AdMinPrivate = ({ children }) => {


     const location = useLocation()
     let token = localStorage.getItem("token")

     const isPosition = "admin"
     const decoded = jwtDecode(token);


     //? this one are change able  in future after backend complete
     if (token !== undefined && decoded.email && isPosition === 'admin') {
          return children
     }

     else {
          return <Navigate state={location.pathname} to={'/login'} replace='true'></Navigate>
     }
};

export default AdMinPrivate;