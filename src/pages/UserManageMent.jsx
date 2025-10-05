import { useState } from "react";
import Swal from "sweetalert2";
import { AiOutlineDelete } from "react-icons/ai";
import { MdBlock } from "react-icons/md";

const usersData = [
     { id: 1, name: "Mostafa Rahman", email: "mostaf@gmail.com", ownEvent: 10, attendEvent: 3, status: "Active", avatar: "https://i.pravatar.cc/40?img=1" },
     { id: 277, name: "John Doe", email: "john@gmail.com", ownEvent: 5, attendEvent: 2, status: "Active", avatar: "https://i.pravatar.cc/40?img=2" },
     { id: 3777, name: "Jane Smith", email: "jane@gmail.com", ownEvent: 7, attendEvent: 4, status: "Active", avatar: "https://i.pravatar.cc/40?img=3" },
     { id: 37, name: "Jane Smith", email: "jane@gmail.com", ownEvent: 7, attendEvent: 4, status: "Inactive", avatar: "https://i.pravatar.cc/40?img=3" },
     { id: 36, name: "Jane Smith", email: "jane@gmail.com", ownEvent: 7, attendEvent: 4, status: "Inactive", avatar: "https://i.pravatar.cc/40?img=3" },
     { id: 30, name: "Jane Smith", email: "jane@gmail.com", ownEvent: 7, attendEvent: 4, status: "Active", avatar: "https://i.pravatar.cc/40?img=3" },
     { id: 34, name: "Jane Smith", email: "jane@gmail.com", ownEvent: 7, attendEvent: 4, status: "Inactive", avatar: "https://i.pravatar.cc/40?img=3" },
     { id: 32, name: "Jane Smith", email: "jane@gmail.com", ownEvent: 7, attendEvent: 4, status: "Inactive", avatar: "https://i.pravatar.cc/40?img=3" },
     { id: 33, name: "Jane Smith", email: "jane@gmail.com", ownEvent: 7, attendEvent: 4, status: "Active", avatar: "https://i.pravatar.cc/40?img=3" },
     { id: 5, name: "Jane Smith", email: "jane@gmail.com", ownEvent: 7, attendEvent: 4, status: "Inactive", avatar: "https://i.pravatar.cc/40?img=3" },
];

export default function UserManagement() {
     const [selectedUser, setSelectedUser] = useState(null);
     const [users, setUsers] = useState(usersData);
     const [currentPage, setCurrentPage] = useState(1);
     const usersPerPage = 8;

     // 🔹 Pagination Logic
     const totalPages = Math.ceil(users.length / usersPerPage);
     const startIndex = (currentPage - 1) * usersPerPage;
     const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

     // 🔹 Block User Confirmation
     const handleBlockUser = (user) => {
          Swal.fire({
               title: `Block ${user.name}?`,
               text: "Are you sure you want to block this user?",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, Block!",
          }).then((result) => {
               if (result.isConfirmed) {
                    Swal.fire("Blocked!", `${user.name} has been blocked.`, "success");
               }
          });
     };

     // 🔹 Delete User Confirmation
     const handleDeleteUser = (userId) => {
          Swal.fire({
               title: "Are you sure?",
               text: "You won’t be able to revert this!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, delete it!",
          }).then((result) => {
               if (result.isConfirmed) {
                    setUsers(users.filter((u) => u.id !== userId));
                    Swal.fire("Deleted!", "The user has been deleted.", "success");
               }
          });
     };

     return (
          <div className="p-6 bg-gray-50 min-h-screen">
               <div className="bg-white shadow rounded p-4">
                    <h2 className="text-lg font-semibold mb-4">User Management</h2>
                    <table className="w-full table-auto border-collapse overflow-x-auto">
                         <thead>
                              <tr className="bg-[#DACBA4]">
                                   <th className="py-2 px-4 text-left">Name</th>
                                   <th className="py-2 px-4 text-left">Gmail</th>
                                   <th className="py-2 px-4 text-left">Own Event</th>
                                   <th className="py-2 px-4 text-left">Attend Event</th>
                                   <th className="py-2 px-4 text-left">Status</th>
                                   <th className="py-2 px-4 text-left">Action</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentUsers.map((user) => (
                                   <tr
                                        key={user.id}
                                        className="border-b border-gray-100 hover:bg-gray-100 cursor-pointer"
                                   >
                                        <td
                                             onClick={() => setSelectedUser(user)}
                                             className="py-2 px-4 flex items-center gap-2"
                                        >
                                             <img
                                                  src={user.avatar}
                                                  alt="avatar"
                                                  className="w-8 h-8 rounded-full"
                                             />
                                             {user.name}
                                        </td>
                                        <td className="py-2 px-4">{user.email}</td>
                                        <td className="py-2 px-4">{user.ownEvent}</td>
                                        <td className="py-2 px-4">{user.attendEvent}</td>
                                        <td className="py-2 px-4">
                                             <span
                                                  className={`px-2 rounded-full text-white ${user.status === "Active" ? "bg-green-500" : "bg-red-500"
                                                       }`}
                                             >
                                                  {user.status}
                                             </span>
                                        </td>
                                        <td className="py-2 px-4 flex gap-3 text-red-500">
                                             <button
                                                  onClick={() => handleBlockUser(user)}
                                                  className="cursor-pointer"
                                             >
                                                  <MdBlock className="text-red-600 text-lg" />
                                             </button>
                                             <button
                                                  onClick={() => handleDeleteUser(user.id)}
                                                  className="cursor-pointer"
                                             >
                                                  <AiOutlineDelete className="text-red-600 text-lg" />
                                             </button>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-3 mt-6">
                         <button
                              disabled={currentPage === 1}
                              onClick={() => setCurrentPage((p) => p - 1)}
                              className={`px-4 py-2 rounded-md border ${currentPage === 1
                                        ? "bg-gray-200 cursor-not-allowed"
                                        : "bg-[#DACBA4] hover:bg-[#c7b684]"
                                   }`}
                         >
                              Prev
                         </button>

                         {[...Array(totalPages)].map((_, index) => (
                              <button
                                   key={index}
                                   onClick={() => setCurrentPage(index + 1)}
                                   className={`px-3 py-1 border rounded-md ${currentPage === index + 1
                                             ? "bg-[#DACBA4] font-semibold"
                                             : "bg-white hover:bg-gray-100"
                                        }`}
                              >
                                   {index + 1}
                              </button>
                         ))}

                         <button
                              disabled={currentPage === totalPages}
                              onClick={() => setCurrentPage((p) => p + 1)}
                              className={`px-4 py-2 rounded-md border ${currentPage === totalPages
                                        ? "bg-gray-200 cursor-not-allowed"
                                        : "bg-[#DACBA4] hover:bg-[#c7b684]"
                                   }`}
                         >
                              Next
                         </button>
                    </div>
               </div>

               {/* Modal */}
               {selectedUser && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                         <div className="bg-white rounded-lg p-6 w-96 relative">
                              <button
                                   className="absolute top-2 right-2 text-gray-500"
                                   onClick={() => setSelectedUser(null)}
                              >
                                   ✖
                              </button>
                              <h3 className="text-xl font-semibold mb-4">User Details</h3>
                              <div className="flex flex-col items-center gap-4 mb-4">
                                   <img
                                        src={selectedUser.avatar}
                                        alt="avatar"
                                        className="w-16 h-16 rounded-full"
                                   />
                                   <div>
                                        <p className="font-semibold">{selectedUser.name}</p>
                                        <p className="text-gray-500">{selectedUser.email}</p>
                                   </div>
                              </div>
                              <p className="pb-1">
                                   <strong>Own Events:</strong> {selectedUser.ownEvent}
                              </p>
                              <p className="pb-1">
                                   <strong>Attend Events:</strong> {selectedUser.attendEvent}
                              </p>
                              <p>
                                   <strong>Status:</strong>{" "}
                                   <span
                                        className={`px-2 rounded-full text-white ${selectedUser.status === "Active"
                                                  ? "bg-green-500"
                                                  : "bg-red-500"
                                             }`}
                                   >
                                        {selectedUser.status}
                                   </span>
                              </p>
                         </div>
                    </div>
               )}
          </div>
     );
}
