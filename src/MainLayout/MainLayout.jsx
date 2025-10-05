import { Outlet } from "react-router-dom";
import Navbar from "../shared/navbar";
import Sidebar from "../shared/Sidebar";


const MainLayout = () => {
     return (
          <div>
               <div className="hidden md:block sticky z-50 w-full top-0" >
                    <Navbar></Navbar>
               </div>
             
               <div className="relative min-h-screen md:flex">
                    <div>
                         <Sidebar></Sidebar>
                    </div>

                    <div className="flex-1 p-8 md:ml-64">
                        <Outlet></Outlet>
                    </div>
               </div>
          </div>
     );
};

export default MainLayout;