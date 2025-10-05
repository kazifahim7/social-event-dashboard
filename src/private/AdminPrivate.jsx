import { Navigate, useLocation } from "react-router-dom";
const AdMinPrivate = ({ children }) => {


     const location = useLocation()

   

     let token = localStorage.getItem(['access-token'])
     const isPosition = "admin"

     //? this one are change able  in future after backend complete
      if (!token && isPosition === 'admin') {
          return children
     }

     else {
          return <Navigate state={location.pathname} to={'/login'} replace='true'></Navigate>
     }
};

export default AdMinPrivate;