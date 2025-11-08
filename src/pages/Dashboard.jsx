/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AiOutlineDelete } from "react-icons/ai";
import { MdBlock } from "react-icons/md";
import { IoDocumentLockOutline } from "react-icons/io5";
import { FaCheckCircle, FaUser, FaEnvelope, FaCalendar, FaIdCard, FaMapMarkerAlt, FaPhone, FaGlobe, FaClock, FaStar } from "react-icons/fa";
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
                    method: "GET",
                    headers: new Headers({
                         "ngrok-skip-browser-warning": "true",
                         Authorization: `${token}`,
                    })
               });

               const data = await res.json();
               console.log(data.data, 'dashboard')
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

     // Format date function
     const formatDate = (dateString) => {
          if (!dateString) return 'N/A';
          return new Date(dateString).toLocaleDateString('en-US', {
               year: 'numeric',
               month: 'short',
               day: 'numeric',
               hour: '2-digit',
               minute: '2-digit'
          });
     };

     return (
          <div className="p-6 bg-gray-50 min-h-screen">
               {/* Dashboard Loading */}
               {loading.dashboard && (
                    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
                         <div className="bg-white p-6 rounded-lg shadow-lg">
                              <div className="flex items-center gap-3">
                                   <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                   <span>Loading dashboard...</span>
                              </div>
                         </div>
                    </div>
               )}

               {/* Stats Grid */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                         <p className="text-sm text-gray-600 mb-2">Total Users</p>
                         <p className="text-3xl font-bold text-gray-800">{data?.users?.total || 0}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                         <p className="text-sm text-gray-600 mb-2">Total Events</p>
                         <p className="text-3xl font-bold text-gray-800">{data?.events?.total || 0}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                         <p className="text-sm text-gray-600 mb-2">Subscribed Users</p>
                         <p className="text-3xl font-bold text-gray-800">{data?.users?.subscribedUser || 0}</p>
                    </div>
               </div>

               {/* Users Table */}
               <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                         <h2 className="text-xl font-semibold text-gray-800">Recent Users</h2>
                         <p className="text-gray-600 text-sm mt-1">Manage and view user accounts</p>
                    </div>
                    <div className="overflow-x-auto">
                         <table className="w-full">
                              <thead>
                                   <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">User</th>
                                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Email</th>
                                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Events Joined</th>
                                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Events Created</th>
                                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Status</th>
                                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Approval</th>
                                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Actions</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {users.map((user) => (
                                        <tr
                                             key={user.id}
                                             className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                             <td
                                                  onClick={() => setSelectedUser(user)}
                                                  className="py-4 px-6 flex items-center gap-3"
                                             >
                                                  <img
                                                       src={user.photoURL}
                                                       alt="avatar"
                                                       className="w-10 h-10 rounded-full border-2 border-gray-200"
                                                  />
                                                  <div>
                                                       <p className="font-medium text-gray-900">{user.name}</p>
                                                       <p className="text-sm text-gray-500">ID: {user.id}</p>
                                                  </div>
                                             </td>
                                             <td className="py-4 px-6">
                                                  <div className="flex items-center gap-2">
                                                       <FaEnvelope className="text-gray-400 text-sm" />
                                                       <span className="text-gray-700">{user.email}</span>
                                                  </div>
                                             </td>
                                             <td className="py-4 px-6">
                                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                       {user.subscription?.eventsJoined || 0}
                                                  </span>
                                             </td>
                                             <td className="py-4 px-6">
                                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                       {user.subscription?.eventsCreated || 0}
                                                  </span>
                                             </td>
                                             <td className="py-4 px-6">
                                                  <span
                                                       className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${user.isBlocked
                                                            ? "bg-red-100 text-red-800"
                                                            : "bg-green-100 text-green-800"
                                                            }`}
                                                  >
                                                       {user.isBlocked ? "Blocked" : "Active"}
                                                  </span>
                                             </td>
                                             <td className="py-4 px-6">
                                                  <span
                                                       className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${user.isApproved
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-yellow-100 text-yellow-800"
                                                            }`}
                                                  >
                                                       {user.isApproved ? "Approved" : "Pending"}
                                                  </span>
                                             </td>
                                             <td className="py-4 px-6">
                                                  <div className="flex items-center gap-2">
                                                       {/* Approve Button */}
                                                       {!user.isApproved && (
                                                            <button
                                                                 onClick={(e) => {
                                                                      e.stopPropagation();
                                                                      handleApproveUser(user.id);
                                                                 }}
                                                                 className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                                 title="Approve User"
                                                                 disabled={loading.approve === user.id}
                                                            >
                                                                 {loading.approve === user.id ? (
                                                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                                                                 ) : (
                                                                      <FaCheckCircle className="text-base" />
                                                                 )}
                                                                 Approve
                                                            </button>
                                                       )}

                                                       {/* Block/Unblock Button */}
                                                       <button
                                                            onClick={(e) => {
                                                                 e.stopPropagation();
                                                                 handleToggleBlock(user.id, user.isBlocked);
                                                            }}
                                                            className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${user.isBlocked
                                                                 ? "text-green-700 bg-green-50 hover:bg-green-100"
                                                                 : "text-red-700 bg-red-50 hover:bg-red-100"
                                                                 }`}
                                                            title={user.isBlocked ? "Unblock User" : "Block User"}
                                                            disabled={loading.block === user.id}
                                                       >
                                                            {loading.block === user.id ? (
                                                                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                                                            ) : user.isBlocked ? (
                                                                 <IoDocumentLockOutline className="text-base" />
                                                            ) : (
                                                                 <MdBlock className="text-base" />
                                                            )}
                                                            {user.isBlocked ? "Unblock" : "Block"}
                                                       </button>

                                                       {/* Delete Button */}
                                                       <button
                                                            onClick={(e) => {
                                                                 e.stopPropagation();
                                                                 handleDeleteUser(user.id);
                                                            }}
                                                            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                            title="Delete User"
                                                            disabled={loading.delete === user.id}
                                                       >
                                                            {loading.delete === user.id ? (
                                                                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                                            ) : (
                                                                 <AiOutlineDelete className="text-base" />
                                                            )}
                                                            Delete
                                                       </button>
                                                  </div>
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               </div>

               {/* Modern User Details Modal */}
               {/* Modern User Details Modal */}
               {selectedUser && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                              {/* Header */}
                              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                                   <div>
                                        <h3 className="text-2xl font-bold text-gray-800">User Details</h3>
                                        <p className="text-gray-500 text-sm mt-1">Complete user information and management</p>
                                   </div>
                                   <button
                                        className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                                        onClick={() => setSelectedUser(null)}
                                        disabled={loading.approve === selectedUser.id || loading.block === selectedUser.id || loading.delete === selectedUser.id}
                                   >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                   </button>
                              </div>

                              {/* Scrollable Content */}
                              <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
                                   {/* Cover Photo & Profile Section */}
                                   <div className="relative mb-8 rounded-xl overflow-hidden">
                                        {/* Cover Photo */}
                                        {selectedUser.coverPhotoURL && (
                                             <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-xl">
                                                  <img
                                                       src={selectedUser.coverPhotoURL}
                                                       alt="Cover"
                                                       className="w-full h-full object-cover"
                                                  />
                                             </div>
                                        )}

                                        {/* Profile Info */}
                                        <div className={`flex items-start gap-6 p-6 ${selectedUser.coverPhotoURL ? 'bg-white' : 'bg-gradient-to-r from-gray-50 to-white rounded-xl'}`}>
                                             <img
                                                  src={selectedUser.photoURL}
                                                  alt="avatar"
                                                  className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg"
                                             />
                                             <div className="flex-1">
                                                  <div className="flex items-center gap-3 mb-2">
                                                       <h4 className="text-xl font-bold text-gray-800">{selectedUser.name}</h4>
                                                       <div className="flex gap-1">
                                                            <span
                                                                 className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${selectedUser.isBlocked
                                                                      ? "bg-red-100 text-red-800"
                                                                      : "bg-green-100 text-green-800"
                                                                      }`}
                                                            >
                                                                 {selectedUser.isBlocked ? "Blocked" : "Active"}
                                                            </span>
                                                            <span
                                                                 className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${selectedUser.isApproved
                                                                      ? "bg-green-100 text-green-800"
                                                                      : "bg-yellow-100 text-yellow-800"
                                                                      }`}
                                                            >
                                                                 {selectedUser.isApproved ? "Approved" : "Pending"}
                                                            </span>
                                                            {selectedUser.verified && (
                                                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                      Verified
                                                                 </span>
                                                            )}
                                                       </div>
                                                  </div>
                                                  <p className="text-gray-600 mb-1 flex items-center gap-2">
                                                       <FaEnvelope className="text-gray-400" />
                                                       {selectedUser.email}
                                                  </p>
                                                  <p className="text-gray-600 flex items-center gap-2">
                                                       <FaIdCard className="text-gray-400" />
                                                       ID: {selectedUser.id}
                                                  </p>
                                                  {selectedUser.profession && (
                                                       <p className="text-gray-600 mt-2 flex items-center gap-2">
                                                            <FaUser className="text-gray-400" />
                                                            {selectedUser.profession}
                                                       </p>
                                                  )}
                                             </div>
                                        </div>
                                   </div>

                                   {/* Bio Section */}
                                   {selectedUser.bio && (
                                        <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                             <h5 className="text-lg font-semibold text-gray-800 mb-2">About</h5>
                                             <p className="text-gray-700 leading-relaxed">{selectedUser.bio}</p>
                                        </div>
                                   )}

                                   {/* Stats Grid */}
                                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                        <div className="bg-blue-50 p-4 rounded-xl text-center">
                                             <div className="text-2xl font-bold text-blue-700 mb-1">{selectedUser.subscription?.eventsJoined || 0}</div>
                                             <div className="text-sm text-blue-600 font-medium">Events Joined</div>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-xl text-center">
                                             <div className="text-2xl font-bold text-green-700 mb-1">{selectedUser.subscription?.eventsCreated || 0}</div>
                                             <div className="text-sm text-green-600 font-medium">Events Created</div>
                                        </div>
                                        <div className="bg-purple-50 p-4 rounded-xl text-center">
                                             <div className="text-2xl font-bold text-purple-700 mb-1">{selectedUser.subscription?.subscriptionTier || "Free"}</div>
                                             <div className="text-sm text-purple-600 font-medium">Subscription Tier</div>
                                        </div>
                                        <div className="bg-orange-50 p-4 rounded-xl text-center">
                                             <div className="text-2xl font-bold text-orange-700 mb-1">
                                                  {(selectedUser.subscription?.eventsJoined || 0) + (selectedUser.subscription?.eventsCreated || 0)}
                                             </div>
                                             <div className="text-sm text-orange-600 font-medium">Total Events</div>
                                        </div>
                                   </div>

                                   {/* Detailed Information */}
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Personal Information */}
                                        <div className="space-y-4">
                                             <h5 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                  <FaUser className="text-blue-500" />
                                                  Personal Information
                                             </h5>
                                             <div className="space-y-3">
                                                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                       <span className="text-gray-600 font-medium">Full Name</span>
                                                       <span className="text-gray-800">{selectedUser.name}</span>
                                                  </div>
                                                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                       <span className="text-gray-600 font-medium">Email Address</span>
                                                       <span className="text-gray-800">{selectedUser.email}</span>
                                                  </div>
                                                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                       <span className="text-gray-600 font-medium">User ID</span>
                                                       <span className="text-gray-800 font-mono text-sm">{selectedUser.id}</span>
                                                  </div>
                                                  {selectedUser.profession && (
                                                       <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                            <span className="text-gray-600 font-medium">Profession</span>
                                                            <span className="text-gray-800">{selectedUser.profession}</span>
                                                       </div>
                                                  )}
                                                  {selectedUser.gender && (
                                                       <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                            <span className="text-gray-600 font-medium">Gender</span>
                                                            <span className="text-gray-800 capitalize">{selectedUser.gender}</span>
                                                       </div>
                                                  )}
                                                  {selectedUser.nationality && (
                                                       <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                            <span className="text-gray-600 font-medium">Nationality</span>
                                                            <span className="text-gray-800">{selectedUser.nationality}</span>
                                                       </div>
                                                  )}
                                             </div>
                                        </div>

                                        {/* Account Information */}
                                        <div className="space-y-4">
                                             <h5 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                  <FaIdCard className="text-green-500" />
                                                  Account Information
                                             </h5>
                                             <div className="space-y-3">
                                                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                       <span className="text-gray-600 font-medium">Account Status</span>
                                                       <span
                                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${selectedUser.isBlocked
                                                                 ? "bg-red-100 text-red-800"
                                                                 : "bg-green-100 text-green-800"
                                                                 }`}
                                                       >
                                                            {selectedUser.isBlocked ? "Blocked" : "Active"}
                                                       </span>
                                                  </div>
                                                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                       <span className="text-gray-600 font-medium">Approval Status</span>
                                                       <span
                                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${selectedUser.isApproved
                                                                 ? "bg-green-100 text-green-800"
                                                                 : "bg-yellow-100 text-yellow-800"
                                                                 }`}
                                                       >
                                                            {selectedUser.isApproved ? "Approved" : "Pending Approval"}
                                                       </span>
                                                  </div>
                                                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                       <span className="text-gray-600 font-medium">Verification Status</span>
                                                       <span
                                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${selectedUser.verified
                                                                 ? "bg-blue-100 text-blue-800"
                                                                 : "bg-gray-100 text-gray-800"
                                                                 }`}
                                                       >
                                                            {selectedUser.verified ? "Verified" : "Not Verified"}
                                                       </span>
                                                  </div>
                                                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                       <span className="text-gray-600 font-medium">Member Since</span>
                                                       <span className="text-gray-800 flex items-center gap-2">
                                                            <FaCalendar className="text-gray-400 text-sm" />
                                                            {formatDate(selectedUser.createdAt)}
                                                       </span>
                                                  </div>
                                                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                       <span className="text-gray-600 font-medium">Last Active</span>
                                                       <span className="text-gray-800 flex items-center gap-2">
                                                            <FaClock className="text-gray-400 text-sm" />
                                                            {formatDate(selectedUser.lastOnline)}
                                                       </span>
                                                  </div>
                                                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                       <span className="text-gray-600 font-medium">Profile Updated</span>
                                                       <span className="text-gray-800 flex items-center gap-2">
                                                            <FaCalendar className="text-gray-400 text-sm" />
                                                            {formatDate(selectedUser.updatedAt)}
                                                       </span>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Social Links */}
                                   {(selectedUser.linkedIn || selectedUser.instagram) && (
                                        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                                             <h5 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                                  <FaStar className="text-blue-500" />
                                                  Social Links
                                             </h5>
                                             <div className="flex flex-wrap gap-4">
                                                  {selectedUser.linkedIn && (
                                                       <div className="flex items-center gap-2">
                                                            <span className="text-sm font-medium text-gray-600">LinkedIn:</span>
                                                            <a
                                                                 href={selectedUser.linkedIn}
                                                                 target="_blank"
                                                                 rel="noopener noreferrer"
                                                                 className="text-blue-600 hover:text-blue-800 text-sm truncate max-w-xs"
                                                            >
                                                                 {selectedUser.linkedIn}
                                                            </a>
                                                       </div>
                                                  )}
                                                  {selectedUser.instagram && (
                                                       <div className="flex items-center gap-2">
                                                            <span className="text-sm font-medium text-gray-600">Instagram:</span>
                                                            <span className="text-gray-800 text-sm">{selectedUser.instagram}</span>
                                                       </div>
                                                  )}
                                             </div>
                                        </div>
                                   )}

                                   {/* Gallery Photos */}
                                   {selectedUser.galleryPhotos && selectedUser.galleryPhotos.length > 0 && (
                                        <div className="mt-6">
                                             <h5 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                                  <FaStar className="text-purple-500" />
                                                  Gallery Photos ({selectedUser.galleryPhotos.length})
                                             </h5>
                                             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                                  {selectedUser.galleryPhotos.map((photo, index) => (
                                                       <img
                                                            key={index}
                                                            src={photo}
                                                            alt={`Gallery ${index + 1}`}
                                                            className="w-full h-24 object-cover rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                                                            onClick={() => window.open(photo, '_blank')}
                                                       />
                                                  ))}
                                             </div>
                                        </div>
                                   )}

                                   {/* Subscription Details */}
                                   {selectedUser.subscription && (
                                        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                                             <h5 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                                  <FaStar className="text-purple-500" />
                                                  Subscription Details
                                             </h5>
                                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                  <div className="text-center">
                                                       <div className="text-sm text-purple-600 font-medium">Tier</div>
                                                       <div className="text-lg font-bold text-purple-700">{selectedUser.subscription.subscriptionTier || "Free"}</div>
                                                  </div>
                                                  <div className="text-center">
                                                       <div className="text-sm text-purple-600 font-medium">Events Created</div>
                                                       <div className="text-lg font-bold text-purple-700">{selectedUser.subscription.eventsCreated || 0}</div>
                                                  </div>
                                                  <div className="text-center">
                                                       <div className="text-sm text-purple-600 font-medium">Events Joined</div>
                                                       <div className="text-lg font-bold text-purple-700">{selectedUser.subscription.eventsJoined || 0}</div>
                                                  </div>
                                                  <div className="text-center">
                                                       <div className="text-sm text-purple-600 font-medium">Total Events</div>
                                                       <div className="text-lg font-bold text-purple-700">
                                                            {(selectedUser.subscription.eventsJoined || 0) + (selectedUser.subscription.eventsCreated || 0)}
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   )}
                              </div>

                              {/* Action Buttons */}
                              <div className="border-t border-gray-100 p-6 bg-gray-50">
                                   <div className="flex flex-wrap gap-3 justify-end">
                                        {!selectedUser.isApproved && (
                                             <button
                                                  onClick={() => {
                                                       handleApproveUser(selectedUser.id);
                                                  }}
                                                  className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
                                                  disabled={loading.approve === selectedUser.id}
                                             >
                                                  {loading.approve === selectedUser.id ? (
                                                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                  ) : (
                                                       <FaCheckCircle className="text-lg" />
                                                  )}
                                                  Approve User
                                             </button>
                                        )}

                                        <button
                                             onClick={() => {
                                                  handleToggleBlock(selectedUser.id, selectedUser.isBlocked);
                                             }}
                                             className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm ${selectedUser.isBlocked
                                                  ? "bg-green-500 text-white hover:bg-green-600"
                                                  : "bg-red-500 text-white hover:bg-red-600"
                                                  }`}
                                             disabled={loading.block === selectedUser.id}
                                        >
                                             {loading.block === selectedUser.id ? (
                                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                             ) : selectedUser.isBlocked ? (
                                                  <IoDocumentLockOutline className="text-lg" />
                                             ) : (
                                                  <MdBlock className="text-lg" />
                                             )}
                                             {selectedUser.isBlocked ? "Unblock User" : "Block User"}
                                        </button>

                                        <button
                                             onClick={() => {
                                                  handleDeleteUser(selectedUser.id);
                                             }}
                                             className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
                                             disabled={loading.delete === selectedUser.id}
                                        >
                                             {loading.delete === selectedUser.id ? (
                                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                             ) : (
                                                  <AiOutlineDelete className="text-lg" />
                                             )}
                                             Delete User
                                        </button>

                                        <button
                                             onClick={() => setSelectedUser(null)}
                                             className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium"
                                        >
                                             Close
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
}