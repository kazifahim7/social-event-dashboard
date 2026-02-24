/* eslint-disable no-unused-vars */
// EventManagement.jsx
import React, { useState, useEffect } from 'react';

const EventManagement = () => {
     const [events, setEvents] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [currentPage, setCurrentPage] = useState(1);
     const [eventsPerPage] = useState(6);
     const [eventToDelete, setEventToDelete] = useState(null);
     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedEvent, setSelectedEvent] = useState(null);
     const [showEventModal, setShowEventModal] = useState(false);
     const [filterCategory, setFilterCategory] = useState('All');
     const [searchTerm, setSearchTerm] = useState('');
     const [totalPages, setTotalPages] = useState(1);
     const [totalEvents, setTotalEvents] = useState(0);
     const [categories, setCategories] = useState(['All']);

     // Color scheme
     const primaryColor = '#DACBA4';
     const primaryHover = '#C8B992';
     const secondaryColor = '#8B7D5A';
     const textColor = '#5D5340';
     const lightBg = '#F5F1E8';
     const borderColor = '#E8DFCB';

     // Fetch events from API
     const fetchEvents = async (page = 1, search = '', category = '') => {
          try {
               setLoading(true);
               setError(null);

               // Build query parameters
               const params = new URLSearchParams();
               if (search) params.append('search', search);
               if (category && category !== 'All') params.append('category', category.toLowerCase());
               params.append('page', page.toString());
               params.append('limit', eventsPerPage.toString());

               const url = `https://server.momentumactivity.com/api/v1/event?${params.toString()}`;

               const response = await fetch(url, {
                    method: 'GET',
                    headers: new Headers({
                         Authorization: `${localStorage.getItem("token")}`,
                    })
               });

               if (!response.ok) {
                    throw new Error('Failed to fetch events');
               }

               const data = await response.json();
               console.log(data, "data")

               if (data.success) {

                    const transformedEvents = data.data.events.map(event => ({
                         id: event.id,
                         title: event.name,
                         date: new Date(event.eventDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                         }),
                         location: event.location,
                         venue: event.location, // Using location as venue since venue isn't in API
                         host: event.userID?.name || 'Unknown Host',
                         price: event.price || 0,
                         currency: "USD",
                         category: event.category,
                         attendees: event.participants?.length || 0,
                         capacity: event.maxParticipants,
                         description: event.details,
                         image: event.imageURL || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
                         status: event.status,
                         organizer: {
                              name: event.userID?.name || 'Unknown',
                              email: event.userID?.email || 'No email',
                              phone: 'Not provided'
                         },
                         tags: [event.category]
                    }));

                    setEvents(transformedEvents);
                    setTotalPages(parseInt(data.data.pagination.totalPages));
                    setTotalEvents(parseInt(data.data.pagination.total));

                    // Update categories from the fetched events
                    const uniqueCategories = ['All', ...new Set(transformedEvents.map(event => event.category))];
                    setCategories(uniqueCategories);
               } else {
                    throw new Error(data.message || 'Failed to fetch events');
               }
          } catch (err) {
               setError(err.message);
               console.error('Error fetching events:', err);
          } finally {
               setLoading(false);
          }
     };

     // Delete event function
     const deleteEvent = async (eventId) => {
          try {
               const response = await fetch(`https://server.momentumactivity.com/api/v1/event/${eventId}`, {
                    method: 'DELETE',
                    headers: {
                         'Content-Type': 'application/json',
                         Authorization: `${localStorage.getItem("token")}`,
                    }
               });

               if (!response.ok) {
                    throw new Error('Failed to delete event');
               }

               const data = await response.json();

               if (data.success) {
                    // Refresh the events list after successful deletion
                    await fetchEvents(currentPage, searchTerm, filterCategory !== 'All' ? filterCategory : '');
                    return true;
               } else {
                    throw new Error(data.message || 'Failed to delete event');
               }
          } catch (err) {
               setError(err.message);
               console.error('Error deleting event:', err);
               return false;
          }
     };

     // Initial fetch
     useEffect(() => {
          fetchEvents();
     }, []);

     // Handle page change
     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
          fetchEvents(pageNumber, searchTerm, filterCategory !== 'All' ? filterCategory : '');
     };

     // Handle delete confirmation
     const handleDeleteClick = (event) => {
          setEventToDelete(event);
          setShowDeleteModal(true);
     };

     // Confirm delete
     const confirmDelete = async () => {
          if (eventToDelete) {
               const success = await deleteEvent(eventToDelete.id);
               if (success) {
                    setShowDeleteModal(false);
                    setEventToDelete(null);
               }
          }
     };

     // Cancel delete
     const cancelDelete = () => {
          setShowDeleteModal(false);
          setEventToDelete(null);
     };

     // Handle event view
     const handleViewEvent = (event) => {
          setSelectedEvent(event);
          setShowEventModal(true);
     };

     // Handle search and filter changes
     const handleSearchChange = (e) => {
          setSearchTerm(e.target.value);
     };

     const handleFilterChange = (e) => {
          setFilterCategory(e.target.value);
     };

     // Apply filters and search
     const applyFilters = () => {
          setCurrentPage(1);
          fetchEvents(1, searchTerm, filterCategory !== 'All' ? filterCategory : '');
     };

     // Clear filters
     const clearFilters = () => {
          setSearchTerm('');
          setFilterCategory('All');
          setCurrentPage(1);
          fetchEvents(1);
     };

     // Format currency for USD
     const formatCurrency = (amount, currency) => {
          return new Intl.NumberFormat('en-US', {
               style: 'currency',
               currency: currency,
               minimumFractionDigits: 0,
               maximumFractionDigits: 0
          }).format(amount);
     };

     // Generate page numbers with ellipsis
     const getPageNumbers = () => {
          const pageNumbers = [];
          const maxVisiblePages = 5;

          if (totalPages <= maxVisiblePages) {
               for (let i = 1; i <= totalPages; i++) {
                    pageNumbers.push(i);
               }
          } else {
               if (currentPage <= 3) {
                    for (let i = 1; i <= 4; i++) {
                         pageNumbers.push(i);
                    }
                    pageNumbers.push('...');
                    pageNumbers.push(totalPages);
               } else if (currentPage >= totalPages - 2) {
                    pageNumbers.push(1);
                    pageNumbers.push('...');
                    for (let i = totalPages - 3; i <= totalPages; i++) {
                         pageNumbers.push(i);
                    }
               } else {
                    pageNumbers.push(1);
                    pageNumbers.push('...');
                    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                         pageNumbers.push(i);
                    }
                    pageNumbers.push('...');
                    pageNumbers.push(totalPages);
               }
          }

          return pageNumbers;
     };

     if (loading) {
          return (
               <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: lightBg }}>
                    <div className="text-center">
                         <div className="text-2xl font-semibold mb-4" style={{ color: textColor }}>Loading events...</div>
                         <div className="w-16 h-16 border-4 border-t-4 rounded-full animate-spin mx-auto" style={{ borderColor: primaryColor, borderTopColor: 'transparent' }}></div>
                    </div>
               </div>
          );
     }

     if (error) {
          return (
               <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: lightBg }}>
                    <div className="text-center">
                         <div className="text-2xl font-semibold mb-4" style={{ color: textColor }}>Error</div>
                         <p style={{ color: secondaryColor }}>{error}</p>
                         <button
                              onClick={() => fetchEvents()}
                              className="mt-4 px-6 py-2 rounded-lg font-semibold text-white transition-all duration-200 hover:shadow-lg"
                              style={{ backgroundColor: primaryColor }}
                         >
                              Retry
                         </button>
                    </div>
               </div>
          );
     }

     return (
          <div className="min-h-screen" style={{ backgroundColor: lightBg }}>
               <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                         <h1 className="text-4xl font-bold mb-4" style={{ color: textColor }}>
                              Event Management System
                         </h1>
                         <p className="text-lg" style={{ color: secondaryColor }}>
                              Manage your events with powerful tools and insights
                         </p>
                    </div>

                    {/* Filters and Search */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border" style={{ borderColor: borderColor }}>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                   <label className="block text-sm font-semibold mb-2" style={{ color: textColor }}>
                                        Search Events
                                   </label>
                                   <input
                                        type="text"
                                        placeholder="Search by title, description, venue..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                                        style={{ borderColor: borderColor }}
                                   />
                              </div>
                              <div>
                                   <label className="block text-sm font-semibold mb-2" style={{ color: textColor }}>
                                        Filter by Category
                                   </label>
                                   <select
                                        value={filterCategory}
                                        onChange={handleFilterChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                                        style={{ borderColor: borderColor }}
                                   >
                                        {categories.map(category => (
                                             <option key={category} value={category}>{category}</option>
                                        ))}
                                   </select>
                              </div>
                              <div className="flex space-x-2 items-end">
                                   <button
                                        onClick={applyFilters}
                                        className="flex-1 px-4 py-2 rounded-lg font-semibold text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                                        style={{ backgroundColor: primaryColor }}
                                   >
                                        Apply Filters
                                   </button>
                                   <button
                                        onClick={clearFilters}
                                        className="flex-1 px-4 py-2 rounded-lg font-semibold text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                                        style={{ backgroundColor: secondaryColor }}
                                   >
                                        Clear Filters
                                   </button>
                              </div>
                         </div>
                    </div>

                    {/* Events Grid - Now using events directly from API (already paginated) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                         {events.length > 0 ? (
                              events.map((event) => (
                                   <div
                                        key={event.id}
                                        className="bg-white rounded-2xl shadow-lg overflow-hidden border transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                        style={{ borderColor: borderColor }}
                                   >
                                        <img
                                             src={event.image}
                                             alt={event.title}
                                             className="w-full h-48 object-cover"
                                        />
                                        <div className="p-6">
                                             <div className="flex justify-between items-start mb-3">
                                                  <h3 className="text-xl font-bold" style={{ color: textColor }}>
                                                       {event.title}
                                                  </h3>
                                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white"
                                                       style={{ backgroundColor: primaryColor }}>
                                                       {event.category}
                                                  </span>
                                             </div>

                                             <p className="text-sm mb-4 line-clamp-2" style={{ color: secondaryColor }}>
                                                  {event.description}
                                             </p>

                                             <div className="space-y-2 mb-4">
                                                  <div className="flex justify-between">
                                                       <span className="text-sm font-semibold" style={{ color: textColor }}>Venue:</span>
                                                       <span className="text-sm" style={{ color: secondaryColor }}>{event.venue}</span>
                                                  </div>
                                                  <div className="flex justify-between">
                                                       <span className="text-sm font-semibold" style={{ color: textColor }}>Date & Time:</span>
                                                       <span className="text-sm" style={{ color: secondaryColor }}>{event.date}</span>
                                                  </div>
                                                  <div className="flex justify-between">
                                                       <span className="text-sm font-semibold" style={{ color: textColor }}>Host:</span>
                                                       <span className="text-sm" style={{ color: secondaryColor }}>{event.host}</span>
                                                  </div>
                                                  <div className="flex justify-between">
                                                       <span className="text-sm font-semibold" style={{ color: textColor }}>Price:</span>
                                                       <span className="text-sm font-bold" style={{ color: textColor }}>
                                                            {formatCurrency(event.price, event.currency)}
                                                       </span>
                                                  </div>
                                                  <div className="flex justify-between">
                                                       <span className="text-sm font-semibold" style={{ color: textColor }}>Attendees:</span>
                                                       <span className="text-sm" style={{ color: secondaryColor }}>
                                                            {event.attendees}/{event.capacity}
                                                       </span>
                                                  </div>
                                             </div>

                                             {/* Action Buttons */}
                                             <div className="flex space-x-2">
                                                  <button
                                                       onClick={() => handleViewEvent(event)}
                                                       className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
                                                       style={{ backgroundColor: primaryColor, color: 'white' }}
                                                  >
                                                       View Details
                                                  </button>
                                                  <button
                                                       onClick={() => handleDeleteClick(event)}
                                                       className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-lg text-white"
                                                       style={{ backgroundColor: '#EF4444' }}
                                                  >
                                                       Delete
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              ))
                         ) : (
                              <div className="col-span-full text-center py-12">
                                   <div className="text-2xl font-semibold mb-2" style={{ color: textColor }}>
                                        No events found
                                   </div>
                                   <p style={{ color: secondaryColor }}>Try adjusting your search or filters</p>
                              </div>
                         )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                         <div className="flex justify-center items-center space-x-2 mb-8">
                              <button
                                   onClick={() => handlePageChange(currentPage - 1)}
                                   disabled={currentPage === 1}
                                   className={`px-5 py-3 text-base font-semibold rounded-lg transition-all duration-200 ${currentPage === 1
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        : 'text-white hover:shadow-lg transform hover:scale-105'
                                        }`}
                                   style={{
                                        backgroundColor: currentPage === 1 ? '#E8DFCB' : primaryColor
                                   }}
                              >
                                   Previous
                              </button>

                              {getPageNumbers().map((page, index) => (
                                   page === '...' ? (
                                        <span
                                             key={index}
                                             className="px-4 py-3 text-base font-semibold"
                                             style={{ color: textColor }}
                                        >
                                             ...
                                        </span>
                                   ) : (
                                        <button
                                             key={index}
                                             onClick={() => handlePageChange(page)}
                                             className={`px-5 py-3 text-base font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 ${currentPage === page
                                                  ? 'text-white shadow-lg'
                                                  : 'text-white'
                                                  }`}
                                             style={{
                                                  backgroundColor: currentPage === page ? secondaryColor : primaryColor
                                             }}
                                        >
                                             {page}
                                        </button>
                                   )
                              ))}

                              <button
                                   onClick={() => handlePageChange(currentPage + 1)}
                                   disabled={currentPage === totalPages}
                                   className={`px-5 py-3 text-base font-semibold rounded-lg transition-all duration-200 ${currentPage === totalPages
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        : 'text-white hover:shadow-lg transform hover:scale-105'
                                        }`}
                                   style={{
                                        backgroundColor: currentPage === totalPages ? '#E8DFCB' : primaryColor
                                   }}
                              >
                                   Next
                              </button>
                         </div>
                    )}

                    {/* Current Page Info */}
                    <div className="text-center mb-8">
                         <p className="text-lg font-semibold" style={{ color: textColor }}>
                              Showing {events.length} of {totalEvents} events • Page {currentPage} of {totalPages}
                         </p>
                    </div>

                    {/* Event Details Modal */}
                    {showEventModal && selectedEvent && (
                         <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
                              <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                                   <div className="relative">
                                        <img
                                             src={selectedEvent.image}
                                             alt={selectedEvent.title}
                                             className="w-full h-64 object-cover"
                                        />
                                        <button
                                             onClick={() => setShowEventModal(false)}
                                             className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                                        >
                                             ×
                                        </button>
                                   </div>

                                   <div className="p-8">
                                        <div className="flex justify-between items-start mb-6">
                                             <h2 className="text-3xl font-bold" style={{ color: textColor }}>
                                                  {selectedEvent.title}
                                             </h2>
                                             <div className="text-right">
                                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-white mb-2"
                                                       style={{ backgroundColor: primaryColor }}>
                                                       {selectedEvent.category}
                                                  </span>
                                                  <div className="text-2xl font-bold" style={{ color: textColor }}>
                                                       {formatCurrency(selectedEvent.price, selectedEvent.currency)}
                                                  </div>
                                             </div>
                                        </div>

                                        <p className="text-lg mb-6" style={{ color: secondaryColor }}>
                                             {selectedEvent.description}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                             <div className="space-y-4">
                                                  <div>
                                                       <h4 className="font-semibold mb-2" style={{ color: textColor }}>Event Details</h4>
                                                       <div className="space-y-2">
                                                            <div className="flex justify-between">
                                                                 <span style={{ color: secondaryColor }}>Date & Time:</span>
                                                                 <span style={{ color: textColor }}>{selectedEvent.date}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                 <span style={{ color: secondaryColor }}>Venue:</span>
                                                                 <span style={{ color: textColor }}>{selectedEvent.venue}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                 <span style={{ color: secondaryColor }}>Location:</span>
                                                                 <span style={{ color: textColor }}>{selectedEvent.location}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                 <span style={{ color: secondaryColor }}>Host:</span>
                                                                 <span style={{ color: textColor }}>{selectedEvent.host}</span>
                                                            </div>
                                                       </div>
                                                  </div>

                                                  <div>
                                                       <h4 className="font-semibold mb-2" style={{ color: textColor }}>Attendance</h4>
                                                       <div className="space-y-2">
                                                            <div className="flex justify-between">
                                                                 <span style={{ color: secondaryColor }}>Current Attendees:</span>
                                                                 <span style={{ color: textColor }}>{selectedEvent.attendees}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                 <span style={{ color: secondaryColor }}>Capacity:</span>
                                                                 <span style={{ color: textColor }}>{selectedEvent.capacity}</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                                 <div
                                                                      className="h-2 rounded-full"
                                                                      style={{
                                                                           backgroundColor: primaryColor,
                                                                           width: `${(selectedEvent.attendees / selectedEvent.capacity) * 100}%`
                                                                      }}
                                                                 ></div>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>

                                             <div className="space-y-4">
                                                  <div>
                                                       <h4 className="font-semibold mb-2" style={{ color: textColor }}>Organizer Information</h4>
                                                       <div className="space-y-2">
                                                            <div className="flex justify-between">
                                                                 <span style={{ color: secondaryColor }}>Name:</span>
                                                                 <span style={{ color: textColor }}>{selectedEvent.organizer.name}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                 <span style={{ color: secondaryColor }}>Email:</span>
                                                                 <span style={{ color: textColor }}>{selectedEvent.organizer.email}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                 <span style={{ color: secondaryColor }}>Phone:</span>
                                                                 <span style={{ color: textColor }}>{selectedEvent.organizer.phone}</span>
                                                            </div>
                                                       </div>
                                                  </div>

                                                  <div>
                                                       <h4 className="font-semibold mb-2" style={{ color: textColor }}>Tags</h4>
                                                       <div className="flex flex-wrap gap-2">
                                                            {selectedEvent.tags.map((tag, index) => (
                                                                 <span
                                                                      key={index}
                                                                      className="inline-flex items-center px-3 py-1 rounded-full text-sm"
                                                                      style={{ backgroundColor: lightBg, color: secondaryColor }}
                                                                 >
                                                                      #{tag}
                                                                 </span>
                                                            ))}
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>

                                        <div className="flex space-x-4 justify-end">
                                             <button
                                                  onClick={() => setShowEventModal(false)}
                                                  className="cursor-pointer px-6 py-3 w-[200px] text-base font-semibold rounded-lg transition-all duration-200 border"
                                                  style={{ borderColor: borderColor, color: textColor }}
                                             >
                                                  Close
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    )}

                    {/* Delete Confirmation Modal */}
                    {showDeleteModal && (
                         <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
                              <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                                   <h3 className="text-xl font-semibold mb-4" style={{ color: textColor }}>
                                        Confirm Deletion
                                   </h3>
                                   <p className="mb-6" style={{ color: secondaryColor }}>
                                        Are you sure you want to delete the event "<span className="font-semibold" style={{ color: textColor }}>{eventToDelete?.title}</span>"? This action cannot be undone.
                                   </p>
                                   <div className="flex justify-end space-x-3">
                                        <button
                                             onClick={cancelDelete}
                                             className="px-6 py-2 text-base font-semibold rounded-lg transition-all duration-200 border"
                                             style={{ borderColor: borderColor, color: textColor }}
                                        >
                                             Cancel
                                        </button>
                                        <button
                                             onClick={confirmDelete}
                                             className="px-6 py-2 text-base font-semibold rounded-lg transition-all duration-200 text-white hover:shadow-lg"
                                             style={{ backgroundColor: '#EF4444' }}
                                        >
                                             Delete Event
                                        </button>
                                   </div>
                              </div>
                         </div>
                    )}
               </div>
          </div>
     );
};

export default EventManagement;