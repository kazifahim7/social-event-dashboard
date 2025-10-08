/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AiOutlineDelete } from "react-icons/ai";
import { MdBlock } from "react-icons/md";
import { IoDocumentLockOutline } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { approveUser, blockUser, deleteUser, unblockUser } from "../service/userManagement";

export default function Dashboard() {
     const [selectedUser, setSelectedUser] = useState(null);
     const [users, setUsers] = useState([]);
     const [data, setData] = useState([]);
     const [loading, setLoading] = useState({
          approve: null,
          block: null,
          delete: null,
          dashboard: false
     });

     const fetchDashboard = async () => {
          setLoading(prev => ({ ...prev, dashboard: true }));
          const token = localStorage.getItem("token");
          try {
               const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/dashboard`, {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: `Bearer ${token}`,
                    },
               });

               const data = await res.json();
               console.log(data.data)
               setData(data.data);
               setUsers(data.data.recentUsers || []);
          } catch (err) {
               console.error("Error fetching dashboard:", err.message);
          } finally {
               setLoading(prev => ({ ...prev, dashboard: false }));
          }
     };

     useEffect(() => {
          fetchDashboard();
     }, []);

     // 🔹 Approve User
     const handleApproveUser = async (userId) => {
          Swal.fire({
               title: "Approve this user?",
               text: "Are you sure you want to approve this user?",
               icon: "question",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, Approve",
          }).then(async (result) => {
               if (result.isConfirmed) {
                    setLoading(prev => ({ ...prev, approve: userId }));
                    try {
                         const data = await approveUser(userId)
                         if (data.success) {
                              Swal.fire(
                                   "Approved!",
                                   "User has been approved successfully.",
                                   "success"
                              );
                              fetchDashboard();
                         } else {
                              Swal.fire({
                                   icon: "error",
                                   title: "Oops...",
                                   text: "Something went wrong!"
                              });
                         }
                    } catch (error) {
                         Swal.fire({
                              icon: "error",
                              title: "Error",
                              text: "Failed to approve user"
                         });
                    } finally {
                         setLoading(prev => ({ ...prev, approve: null }));
                    }
               }
          });
     };

     // 🔹 Toggle Block / Unblock User
     const handleToggleBlock = (userId, isBlocked) => {
          const action = isBlocked ? "Unblock" : "Block";

          Swal.fire({
               title: `${action} this user?`,
               text: `Are you sure you want to ${action.toLowerCase()} this user?`,
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: `Yes, ${action}`,
          }).then(async (result) => {
               if (result.isConfirmed) {
                    setLoading(prev => ({ ...prev, block: userId }));
                    try {
                         if (action === "Unblock") {
                              const data = await unblockUser(userId)
                              if (data.success) {
                                   Swal.fire(
                                        `${action}ed!`,
                                        `User has been ${action.toLowerCase()}ed successfully.`,
                                        "success"
                                   );
                                   fetchDashboard();
                              } else {
                                   Swal.fire({
                                        icon: "error",
                                        title: "Oops...",
                                        text: "Something went wrong!"
                                   });
                              }
                         }

                         if (action === "Block") {
                              const data = await blockUser(userId)
                              if (data.success) {
                                   Swal.fire(
                                        `${action}ed!`,
                                        `User has been ${action.toLowerCase()}ed successfully.`,
                                        "success"
                                   );
                                   fetchDashboard();
                              } else {
                                   Swal.fire({
                                        icon: "error",
                                        title: "Oops...",
                                        text: "Something went wrong!"
                                   });
                              }
                         }
                    } catch (error) {
                         Swal.fire({
                              icon: "error",
                              title: "Error",
                              text: `Failed to ${action.toLowerCase()} user`
                         });
                    } finally {
                         setLoading(prev => ({ ...prev, block: null }));
                    }
               }
          });
     };

     // 🔹 Delete User
     const handleDeleteUser = (userId) => {
          Swal.fire({
               title: "Are you sure?",
               text: "You won't be able to revert this!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, delete it!",
          }).then(async (result) => {
               if (result.isConfirmed) {
                    setLoading(prev => ({ ...prev, delete: userId }));
                    try {
                         const data = await deleteUser(userId)
                         if (data.success) {
                              Swal.fire("Deleted!", "The user has been deleted.", "success");
                              fetchDashboard();
                         } else {
                              Swal.fire({
                                   icon: "error",
                                   title: "Oops...",
                                   text: "Something went wrong!"
                              });
                         }
                    } catch (error) {
                         Swal.fire({
                              icon: "error",
                              title: "Error",
                              text: "Failed to delete user"
                         });
                    } finally {
                         setLoading(prev => ({ ...prev, delete: null }));
                    }
               }
          });
     };

     return (
          <div className="p-6 bg-gray-50 min-h-screen">
               {/* Dashboard Loading */}
               {loading.dashboard && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                         <div className="bg-white p-6 rounded-lg shadow-lg">
                              <div className="flex items-center gap-3">
                                   <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                   <span>Loading dashboard...</span>
                              </div>
                         </div>
                    </div>
               )}

               <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-8 rounded shadow text-center">
                         <p className="text-sm text-gray-400">Total Users</p>
                         <p className="text-2xl font-bold">{data?.users?.total || 0}</p>
                    </div>
                    <div className="bg-white p-8 rounded shadow text-center">
                         <p className="text-sm text-gray-400">Total events</p>
                         <p className="text-2xl font-bold">{data?.events?.total || 0}</p>
                    </div>
                    <div className="bg-white p-8 rounded shadow text-center">
                         <p className="text-sm text-gray-400">subscriptions user</p>
                         <p className="text-2xl font-bold">{0}</p>
                    </div>
               </div>

               <div className="bg-white shadow rounded p-4">
                    <h2 className="text-lg font-semibold mb-4">Recent User</h2>
                    <table className="w-full table-auto border-collapse overflow-x-auto">
                         <thead>
                              <tr className="bg-[#DACBA4]">
                                   <th className="py-2 px-4 text-left">Name</th>
                                   <th className="py-2 px-4 text-left">Email</th>
                                   <th className="py-2 px-4 text-left">Status</th>
                                   <th className="py-2 px-4 text-left">Approval</th>
                                   <th className="py-2 px-4 text-left">Action</th>
                              </tr>
                         </thead>
                         <tbody>
                              {users.map((user) => (
                                   <tr
                                        key={user.id}
                                        className="border-b border-gray-100 hover:bg-gray-100 cursor-pointer"
                                   >
                                        <td
                                             onClick={() => setSelectedUser(user)}
                                             className="py-2 px-4 flex items-center gap-2"
                                        >
                                             <img
                                                  src={user.photoURL}
                                                  alt="avatar"
                                                  className="w-8 h-8 rounded-full"
                                             />
                                             {user.name}
                                        </td>
                                        <td className="py-2 px-4">{user.email}</td>
                                        <td className="py-2 px-4">
                                             <span
                                                  className={`px-2 rounded-full text-white ${user.isBlocked ? "bg-red-500" : "bg-green-500"
                                                       }`}
                                             >
                                                  {user.isBlocked ? "Blocked" : "Active"}
                                             </span>
                                        </td>
                                        <td className="py-2 px-4">
                                             <span
                                                  className={`px-2 rounded-full text-white ${user.isApproved ? "bg-green-500" : "bg-yellow-500"
                                                       }`}
                                             >
                                                  {user.isApproved ? "Approved" : "Pending"}
                                             </span>
                                        </td>
                                        <td className="py-2 px-4 flex gap-3">
                                             {/* Approve Button - Show only if not approved */}
                                             {!user.isApproved && (
                                                  <button
                                                       onClick={() => handleApproveUser(user.id)}
                                                       className="cursor-pointer text-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                                       title="Approve User"
                                                       disabled={loading.approve === user.id}
                                                  >
                                                       {loading.approve === user.id ? (
                                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                                                       ) : (
                                                            <FaCheckCircle className="text-lg" />
                                                       )}
                                                  </button>
                                             )}

                                             {/* Block/Unblock Button */}
                                             <button
                                                  onClick={() => handleToggleBlock(user.id, user.isBlocked)}
                                                  className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                  title={user.isBlocked ? "Unblock User" : "Block User"}
                                                  disabled={loading.block === user.id}
                                             >
                                                  {loading.block === user.id ? (
                                                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                                                  ) : user.isBlocked ? (
                                                       <IoDocumentLockOutline className="text-green-600 text-lg" />
                                                  ) : (
                                                       <MdBlock className="text-red-600 text-lg" />
                                                  )}
                                             </button>

                                             {/* Delete Button */}
                                             <button
                                                  onClick={() => handleDeleteUser(user.id)}
                                                  className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                  title="Delete User"
                                                  disabled={loading.delete === user.id}
                                             >
                                                  {loading.delete === user.id ? (
                                                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                                                  ) : (
                                                       <AiOutlineDelete className="text-red-600 text-lg" />
                                                  )}
                                             </button>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>

               {/* Modal */}
               {selectedUser && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                         <div className="bg-white rounded-lg p-6 w-96 relative">
                              <button
                                   className="absolute top-2 right-2 text-gray-500"
                                   onClick={() => setSelectedUser(null)}
                                   disabled={loading.approve === selectedUser.id || loading.block === selectedUser.id || loading.delete === selectedUser.id}
                              >
                                   ✖
                              </button>
                              <h3 className="text-xl font-semibold mb-4">User Details</h3>
                              <div className="flex flex-col items-center gap-4 mb-4">
                                   <img
                                        src={selectedUser.photoURL}
                                        alt="avatar"
                                        className="w-16 h-16 rounded-full"
                                   />
                                   <div>
                                        <p className="font-semibold">{selectedUser.name}</p>
                                        <p className="text-gray-500">{selectedUser.email}</p>
                                   </div>
                              </div>
                              <div className="space-y-2">
                                   <p>
                                        <strong>Status:</strong>{" "}
                                        <span
                                             className={`px-2 rounded-full text-white ${selectedUser.isBlocked ? "bg-red-500" : "bg-green-500"
                                                  }`}
                                        >
                                             {selectedUser.isBlocked ? "Blocked" : "Active"}
                                        </span>
                                   </p>
                                   <p>
                                        <strong>Approval:</strong>{" "}
                                        <span
                                             className={`px-2 rounded-full text-white ${selectedUser.isApproved ? "bg-green-500" : "bg-yellow-500"
                                                  }`}
                                        >
                                             {selectedUser.isApproved ? "Approved" : "Pending"}
                                        </span>
                                   </p>
                              </div>

                              {/* Action Buttons in Modal */}
                              <div className="flex gap-3 mt-4">
                                   {!selectedUser.isApproved && (
                                        <button
                                             onClick={() => {
                                                  handleApproveUser(selectedUser.id);
                                             }}
                                             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                             disabled={loading.approve === selectedUser.id}
                                        >
                                             {loading.approve === selectedUser.id && (
                                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                             )}
                                             Approve
                                        </button>
                                   )}

                                   <button
                                        onClick={() => {
                                             handleToggleBlock(selectedUser.id, selectedUser.isBlocked);
                                        }}
                                        className={`px-4 py-2 rounded text-white flex items-center gap-2 ${selectedUser.isBlocked ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} disabled:opacity-50 disabled:cursor-not-allowed`}
                                        disabled={loading.block === selectedUser.id}
                                   >
                                        {loading.block === selectedUser.id && (
                                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        )}
                                        {selectedUser.isBlocked ? "Unblock" : "Block"}
                                   </button>

                                   <button
                                        onClick={() => {
                                             handleDeleteUser(selectedUser.id);
                                        }}
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        disabled={loading.delete === selectedUser.id}
                                   >
                                        {loading.delete === selectedUser.id && (
                                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        )}
                                        Delete
                                   </button>
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
}