/* eslint-disable no-unused-vars */

import { useContext, useState } from 'react'
import { GrLogout } from 'react-icons/gr'

import { BsFillHouseAddFill } from 'react-icons/bs'

import { AiOutlineBars } from 'react-icons/ai'

import { NavLink, useNavigate } from 'react-router-dom'


import { Link } from 'react-router-dom'

import { AuthContext } from '../AuthProvider/AuthProvider'
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'
import { FaUser } from 'react-icons/fa'
import { RiDashboardLine } from 'react-icons/ri'



const Sidebar = () => {
     const { setLoading, user = "admin" } = useContext(AuthContext)
     const [isActive, setActive] = useState(false)
     const navigate = useNavigate()





     // Sidebar Responsive Handler
     const handleToggle = () => {
          setActive(!isActive)
     }
     const logout = () => {
          navigate("/login")
     }
     return (
          <>
               {/* Small Screen Navbar */}
               <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                    <div>
                         <div className='block cursor-pointer p-4 font-bold'>
                              <Link to='/'>
                                   <div className="flex justify-center items-center gap-2">

                                        <p className="text-[#0ecdb9] font-bold text-2xl">Momentum</p>
                                   </div>
                              </Link>
                         </div>
                    </div>

                    <button
                         onClick={handleToggle}
                         className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                    >
                         <AiOutlineBars className='h-7 w-7 text-[#0ecdb9]' />
                    </button>
               </div>

               {/* Sidebar */}
               <div
                    className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#DACBA4] text-white w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                         }  md:translate-x-0  transition duration-200 ease-in-out`}
               >
                    <div>
                         <div>



                         </div>

                         {/* Nav Items */}
                         <div className='flex flex-col justify-between flex-1 mt-10'>

                              <nav>
                                   {/* admin */}



                                   <NavLink
                                        to='/'
                                        end
                                        className={({ isActive }) =>
                                             `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-black' : 'text-black'
                                             }`
                                        }
                                   >
                               

                                        <RiDashboardLine className='w-5 h-5' />

                                        <span className='mx-4 font-medium'>Dashboard</span>
                                   </NavLink>
                                   <NavLink
                                        to='/manageUser'
                                        end
                                        className={({ isActive }) =>
                                             `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-black' : 'text-black'
                                             }`
                                        }
                                   >
                                        <FaUser className='w-5 h-5' />

                                        <span className='mx-4 font-medium'>Manage User</span>
                                   </NavLink>


                                   <NavLink
                                        to='/dashboard/ManageContests'
                                        className={({ isActive }) =>
                                             `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-black'
                                             }`
                                        }
                                   >
                                        <BsFillHouseAddFill className='w-5 h-5' />

                                        <span className='mx-4 font-medium'>Manage Contests</span>
                                   </NavLink>






                                   {/* host routes */}







                                   {/* host routes end... */}

                                   {/* user routes */}








                              </nav>
                         </div>
                    </div>

                    <div>
                         <hr />

                         {/* Profile Menu */}

                         <button
                              onClick={logout}
                              className='flex w-full items-center px-4 py-2 mt-5 text-red-500 cursor-pointer hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
                         >
                              <GrLogout className='w-5 h-5' />

                              <span className='mx-4 font-medium '>Logout</span>
                         </button>
                    </div>
               </div>
          </>
     )
}

export default Sidebar