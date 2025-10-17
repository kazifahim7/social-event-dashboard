/* eslint-disable no-unused-vars */
// EventManagement.jsx
import React, { useState } from 'react';

// Sample event data with enhanced information - converted to USD
const initialEvents = [
     {
          id: 1,
          title: "Girl's Night Out",
          date: "20 sept 2025, 5:00 PM",
          location: "Dhaka, Bangladesh",
          venue: "Sky Lounge Restaurant",
          host: "Lifestyle Events BD",
          price: 25, // Converted from 2500 BDT to ~25 USD
          currency: "USD",
          category: "Social",
          attendees: 45,
          capacity: 60,
          description: "An exclusive evening for women to network, relax and enjoy great food and music",
          image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
          status: "Upcoming",
          organizer: {
               name: "Sarah Johnson",
               email: "sarah@lifestyleevents.com",
               phone: "+880 1712-345678"
          },
          tags: ["Networking", "Music", "Food", "Women Only"]
     },
     {
          id: 2,
          title: "Birthday Party",
          date: "15 oct 2025, 7:00 PM",
          location: "Chittagong, Bangladesh",
          venue: "Marine Bay Resort",
          host: "Private Event",
          price: 18, // Converted from 1800 BDT to ~18 USD
          currency: "USD",
          category: "Celebration",
          attendees: 25,
          capacity: 30,
          description: "Join us for a fun-filled birthday celebration with live music and surprises",
          image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
          status: "Upcoming",
          organizer: {
               name: "Mike Chen",
               email: "mike@email.com",
               phone: "+880 1812-345678"
          },
          tags: ["Birthday", "Celebration", "Live Music"]
     },
     {
          id: 3,
          title: "Business Conference",
          date: "10 nov 2025, 9:00 AM",
          location: "Dhaka, Bangladesh",
          venue: "Bangladesh China Friendship Center",
          host: "Business Leaders Forum",
          price: 50, // Converted from 5000 BDT to ~50 USD
          currency: "USD",
          category: "Business",
          attendees: 120,
          capacity: 200,
          description: "Annual business conference featuring industry leaders and networking opportunities",
          image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
          status: "Upcoming",
          organizer: {
               name: "Emma Davis",
               email: "emma@businessforum.org",
               phone: "+880 1912-345678"
          },
          tags: ["Networking", "Business", "Workshop", "Professional"]
     },
     {
          id: 4,
          title: "Music Festival",
          date: "25 dec 2025, 6:00 PM",
          location: "Sylhet, Bangladesh",
          venue: "Tea Garden Amphitheater",
          host: "Sylhet Cultural Association",
          price: 12, // Converted from 1200 BDT to ~12 USD
          currency: "USD",
          category: "Entertainment",
          attendees: 300,
          capacity: 500,
          description: "Experience the best of local and international music in the heart of tea gardens",
          image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
          status: "Upcoming",
          organizer: {
               name: "Alex Rodriguez",
               email: "alex@sylhetculture.com",
               phone: "+880 1612-345678"
          },
          tags: ["Music", "Festival", "Outdoor", "Live Performance"]
     },
     {
          id: 5,
          title: "Food Fair",
          date: "05 jan 2026, 11:00 AM",
          location: "Dhaka, Bangladesh",
          venue: "Bashundhara City Food Court",
          host: "Dhaka Foodies Association",
          price: 8, // Converted from 800 BDT to ~8 USD
          currency: "USD",
          category: "Food",
          attendees: 80,
          capacity: 150,
          description: "A culinary journey through Bangladesh's diverse food culture",
          image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
          status: "Upcoming",
          organizer: {
               name: "Lisa Wang",
               email: "lisa@dhakafoodies.com",
               phone: "+880 1312-345678"
          },
          tags: ["Food", "Culinary", "Local Cuisine", "Tasting"]
     },
     {
          id: 6,
          title: "Art Exhibition",
          date: "18 feb 2026, 3:00 PM",
          location: "Rajshahi, Bangladesh",
          venue: "Rajshahi Art Gallery",
          host: "Bangladesh Art Society",
          price: 15, // Converted from 1500 BDT to ~15 USD
          currency: "USD",
          category: "Art",
          attendees: 35,
          capacity: 80,
          description: "Showcasing contemporary art from emerging Bangladeshi artists",
          image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=400",
          status: "Upcoming",
          organizer: {
               name: "David Kim",
               email: "david@banglaart.org",
               phone: "+880 1412-345678"
          },
          tags: ["Art", "Exhibition", "Contemporary", "Cultural"]
     },
     {
          id: 7,
          title: "Tech Summit 2026",
          date: "18 mar 2026, 1:45 PM",
          location: "Dhaka, Bangladesh",
          venue: "International Convention City",
          host: "Bangladesh Tech Association",
          price: 35, // Converted from 3500 BDT to ~35 USD
          currency: "USD",
          category: "Technology",
          attendees: 250,
          capacity: 400,
          description: "The largest technology conference in Bangladesh featuring AI, Blockchain and IoT",
          image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
          status: "Upcoming",
          organizer: {
               name: "Priya Patel",
               email: "priya@bdtech.org",
               phone: "+880 1512-345678"
          },
          tags: ["Technology", "AI", "Innovation", "Workshop"]
     },
     {
          id: 8,
          title: "Charity Gala Dinner",
          date: "12 apr 2026, 7:30 PM",
          location: "Dhaka, Bangladesh",
          venue: "Westin Hotel Ballroom",
          host: "Hope Foundation",
          price: 50, // Converted from 5000 BDT to ~50 USD
          currency: "USD",
          category: "Charity",
          attendees: 60,
          capacity: 100,
          description: "An elegant evening to support underprivileged children's education",
          image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400",
          status: "Upcoming",
          organizer: {
               name: "James Wilson",
               email: "james@hopefoundation.org",
               phone: "+880 1712-987654"
          },
          tags: ["Charity", "Fundraising", "Dinner", "Social Cause"]
     }
];

const EventManagement = () => {
     const [events, setEvents] = useState(initialEvents);
     const [currentPage, setCurrentPage] = useState(1);
     const [eventsPerPage] = useState(6);
     const [eventToDelete, setEventToDelete] = useState(null);
     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedEvent, setSelectedEvent] = useState(null);
     const [showEventModal, setShowEventModal] = useState(false);
     const [filterCategory, setFilterCategory] = useState('All');
     const [searchTerm, setSearchTerm] = useState('');

     // Color scheme
     const primaryColor = '#DACBA4';
     const primaryHover = '#C8B992';
     const secondaryColor = '#8B7D5A';
     const textColor = '#5D5340';
     const lightBg = '#F5F1E8';
     const borderColor = '#E8DFCB';

     // Filter events based on category and search
     const filteredEvents = events.filter(event => {
          const categoryMatch = filterCategory === 'All' || event.category === filterCategory;
          const searchMatch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
               event.venue.toLowerCase().includes(searchTerm.toLowerCase());
          return categoryMatch && searchMatch;
     });

     // Calculate current events for pagination
     const indexOfLastEvent = currentPage * eventsPerPage;
     const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
     const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

     // Calculate total pages
     const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

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

     // Handle event view
     const handleViewEvent = (event) => {
          setSelectedEvent(event);
          setShowEventModal(true);
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

     // Get unique categories
     const categories = ['All', ...new Set(events.map(event => event.category))];

     // Get status counts
     const statusCounts = {
          total: events.length,
          upcoming: events.filter(e => e.status === 'Upcoming').length,
          ongoing: events.filter(e => e.status === 'Ongoing').length,
          completed: events.filter(e => e.status === 'Completed').length
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

     return (

          <div className="min-h-screen" style={{ backgroundColor: lightBg }}>
               
               <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                         <h1 className="text-4xl font-bold mb-4 " style={{ color: textColor }}>
                              Event management system
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
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                                        style={{ borderColor: borderColor, focusRingColor: primaryColor }}
                                   />
                              </div>
                              <div>
                                   <label className="block text-sm font-semibold mb-2" style={{ color: textColor }}>
                                        Filter by Category
                                   </label>
                                   <select
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                                        style={{ borderColor: borderColor, focusRingColor: primaryColor }}
                                   >
                                        {categories.map(category => (
                                             <option key={category} value={category}>{category}</option>
                                        ))}
                                   </select>
                              </div>
                              <div className="flex items-end">
                                   <button
                                        onClick={() => { setSearchTerm(''); setFilterCategory('All'); }}
                                        className="w-full px-4 py-2 rounded-lg font-semibold text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                                        style={{ backgroundColor: secondaryColor }}
                                   >
                                        Clear Filters
                                   </button>
                              </div>
                         </div>
                    </div>

                    {/* Events Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                         {currentEvents.length > 0 ? (
                              currentEvents.map((event) => (
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

                                             <p className="text-sm mb-4" style={{ color: secondaryColor }}>
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

                                             {/* Tags */}
                                             {/* <div className="flex flex-wrap gap-1 mb-4">
                                                  {event.tags.map((tag, index) => (
                                                       <span
                                                            key={index}
                                                            className="inline-flex items-center px-2 py-1 rounded-full text-xs"
                                                            style={{ backgroundColor: lightBg, color: secondaryColor }}
                                                       >
                                                            #{tag}
                                                       </span>
                                                  ))}
                                             </div> */}

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
                              Showing {currentEvents.length} of {filteredEvents.length} events • Page {currentPage} of {totalPages}
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
                                                  className=" cursor-pointer px-6 py-3 w-[200px] text-base font-semibold rounded-lg transition-all duration-200 border"
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