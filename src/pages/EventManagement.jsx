// EventManagement.jsx
import React, { useState } from 'react';

// Sample event data
const initialEvents = [
     {
          id: 1,
          title: "Girl's Night Out",
          date: "20 sept 2025, 5:00 PM",
          location: "Dhaka, Bangladesh"
     },
     {
          id: 2,
          title: "Birthday Party",
          date: "15 oct 2025, 7:00 PM",
          location: "Chittagong, Bangladesh"
     },
     {
          id: 3,
          title: "Business Conference",
          date: "10 nov 2025, 9:00 AM",
          location: "Dhaka, Bangladesh"
     },
     {
          id: 4,
          title: "Music Festival",
          date: "25 dec 2025, 6:00 PM",
          location: "Sylhet, Bangladesh"
     },
     {
          id: 5,
          title: "Food Fair",
          date: "05 jan 2026, 11:00 AM",
          location: "Dhaka, Bangladesh"
     },
     {
          id: 6,
          title: "Art Exhibition",
          date: "18 feb 2026, 3:00 PM",
          location: "Rajshahi, Bangladesh"
     }
];

const EventManagement = () => {
     const [events, setEvents] = useState(initialEvents);
     const [currentPage, setCurrentPage] = useState(1);
     const [eventsPerPage] = useState(8);
     const [eventToDelete, setEventToDelete] = useState(null);
     const [showDeleteModal, setShowDeleteModal] = useState(false);

     // Calculate current events for pagination
     const indexOfLastEvent = currentPage * eventsPerPage;
     const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
     const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

     // Calculate total pages
     const totalPages = Math.ceil(events.length / eventsPerPage);

     // Handle page change
     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     // Handle delete confirmation
     const handleDeleteClick = (event) => {
          setEventToDelete(event);
          setShowDeleteModal(true);
     };

     // Confirm delete
     const confirmDelete = () => {
          setEvents(events.filter(event => event.id !== eventToDelete.id));
          setShowDeleteModal(false);
          setEventToDelete(null);

          // Adjust current page if needed after deletion
          if (currentEvents.length === 1 && currentPage > 1) {
               setCurrentPage(currentPage - 1);
          }
     };

     // Cancel delete
     const cancelDelete = () => {
          setShowDeleteModal(false);
          setEventToDelete(null);
     };

     return (
          <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
               <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                         <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Management System</h1>
                         <p className="text-gray-600">Manage your events with ease</p>
                    </div>

                    {/* Events Table */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
                         <div className="px-6 py-4 border-b border-gray-200">
                              <h2 className="text-xl font-semibold text-gray-800">Events List</h2>
                         </div>

                         <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                   <thead className="bg-gray-50">
                                        <tr>
                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                  Event Title
                                             </th>
                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                  Date & Time
                                             </th>
                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                  Location
                                             </th>
                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                  Actions
                                             </th>
                                        </tr>
                                   </thead>
                                   <tbody className="bg-white divide-y divide-gray-200">
                                        {currentEvents.length > 0 ? (
                                             currentEvents.map((event) => (
                                                  <tr key={event.id} className="hover:bg-gray-50">
                                                       <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">{event.title}</div>
                                                       </td>
                                                       <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-500">{event.date}</div>
                                                       </td>
                                                       <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-500">{event.location}</div>
                                                       </td>
                                                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <button
                                                                 onClick={() => handleDeleteClick(event)}
                                                                 className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                                            >
                                                                 Delete
                                                            </button>
                                                       </td>
                                                  </tr>
                                             ))
                                        ) : (
                                             <tr>
                                                  <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                                       No events found
                                                  </td>
                                             </tr>
                                        )}
                                   </tbody>
                              </table>
                         </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                         <div className="flex cursor-pointer justify-center items-center space-x-2 mb-8">
                              <button
                                   onClick={() => handlePageChange(currentPage - 1)}
                                   disabled={currentPage === 1}
                                   className={`px-4 py-2 text-sm font-medium rounded-md ${currentPage === 1
                                             ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                             : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                        }`}
                              >
                                   Previous
                              </button>

                              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                   <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-4 py-2 text-sm font-medium rounded-md ${currentPage === page
                                             ? 'bg-[#DACBA4] text-white'
                                                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                             }`}
                                   >
                                        {page}
                                   </button>
                              ))}

                              <button
                                   onClick={() => handlePageChange(currentPage + 1)}
                                   disabled={currentPage === totalPages}
                                   className={`px-4 py-2 cursor-pointer text-sm font-medium rounded-md ${currentPage === totalPages
                                             ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                             : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                        }`}
                              >
                                   Next
                              </button>
                         </div>
                    )}

                    {/* Delete Confirmation Modal */}
                    {showDeleteModal && (
                         <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
                              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                                   <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Confirm Deletion
                                   </h3>
                                   <p className="text-gray-600 mb-6">
                                        Are you sure you want to delete the event "{eventToDelete?.title}"? This action cannot be undone.
                                   </p>
                                   <div className="flex justify-end space-x-3">
                                        <button
                                             onClick={cancelDelete}
                                             className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                             Cancel
                                        </button>
                                        <button
                                             onClick={confirmDelete}
                                             className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                             Delete
                                        </button>
                                   </div>
                              </div>
                         </div>
                    )}

                    {/* Stats */}
                    <div className="bg-white rounded-lg shadow p-6">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="text-center">
                                   <p className="text-2xl font-bold text-blue-600">{events.length}</p>
                                   <p className="text-gray-600">Total Events</p>
                              </div>
                              <div className="text-center">
                                   <p className="text-2xl font-bold text-green-600">{currentEvents.length}</p>
                                   <p className="text-gray-600">Events on This Page</p>
                              </div>
                              <div className="text-center">
                                   <p className="text-2xl font-bold text-purple-600">{totalPages}</p>
                                   <p className="text-gray-600">Total Pages</p>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default EventManagement;