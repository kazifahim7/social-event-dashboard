/* eslint-disable no-unused-vars */
// PaymentHistory.jsx
import React, { useState } from 'react';

// Sample payment data
const initialPayments = [
     {
          id: 1,
          transactionId: "TXN001",
          eventTitle: "Girl's Night Out",
          userName: "Sarah Johnson",
          email: "sarah@email.com",
          amount: 2500,
          currency: "BDT",
          paymentMethod: "Credit Card",
          status: "Completed",
          date: "15 sept 2025, 2:30 PM",
     },
     {
          id: 2,
          transactionId: "TXN002",
          eventTitle: "Birthday Party",
          userName: "Mike Chen",
          email: "mike@email.com",
          amount: 1800,
          currency: "BDT",
          paymentMethod: "bKash",
          status: "Completed",
          date: "10 oct 2025, 11:15 AM",
     },
     {
          id: 3,
          transactionId: "TXN003",
          eventTitle: "Business Conference",
          userName: "Emma Davis",
          email: "emma@email.com",
          amount: 5000,
          currency: "BDT",
          paymentMethod: "Bank Transfer",
          status: "Pending",
          date: "05 nov 2025, 4:45 PM",
     },
     {
          id: 4,
          transactionId: "TXN004",
          eventTitle: "Music Festival",
          userName: "Alex Rodriguez",
          email: "alex@email.com",
          amount: 1200,
          currency: "BDT",
          paymentMethod: "Credit Card",
          status: "Failed",
          date: "20 dec 2025, 9:20 AM",
     },
     {
          id: 5,
          transactionId: "TXN005",
          eventTitle: "Food Fair",
          userName: "Lisa Wang",
          email: "lisa@email.com",
          amount: 800,
          currency: "BDT",
          paymentMethod: "bKash",
          status: "Completed",
          date: "02 jan 2026, 3:10 PM",
     },
     {
          id: 6,
          transactionId: "TXN006",
          eventTitle: "Art Exhibition",
          userName: "David Kim",
          email: "david@email.com",
          amount: 1500,
          currency: "BDT",
          paymentMethod: "Credit Card",
          status: "Completed",
          date: "15 feb 2026, 10:30 AM",
     },
     {
          id: 7,
          transactionId: "TXN007",
          eventTitle: "Tech Summit",
          userName: "Priya Patel",
          email: "priya@email.com",
          amount: 3500,
          currency: "BDT",
          paymentMethod: "Bank Transfer",
          status: "Completed",
          date: "18 mar 2026, 1:45 PM",
     },
     {
          id: 8,
          transactionId: "TXN008",
          eventTitle: "Charity Gala",
          userName: "James Wilson",
          email: "james@email.com",
          amount: 5000,
          currency: "BDT",
          paymentMethod: "Credit Card",
          status: "Pending",
          date: "12 apr 2026, 3:20 PM",
     },
     {
          id: 9,
          transactionId: "TXN009",
          eventTitle: "Girl's Night Out",
          userName: "Maria Garcia",
          email: "maria@email.com",
          amount: 2500,
          currency: "BDT",
          paymentMethod: "bKash",
          status: "Completed",
          date: "18 sept 2025, 6:15 PM",
     },
     {
          id: 10,
          transactionId: "TXN010",
          eventTitle: "Music Festival",
          userName: "Tom Anderson",
          email: "tom@email.com",
          amount: 1200,
          currency: "BDT",
          paymentMethod: "Credit Card",
          status: "Failed",
          date: "22 dec 2025, 11:30 AM",
     },
     // Subscription Purchase Entries
     {
          id: 11,
          transactionId: "SUB001",
          eventTitle: "Premium Subscription - Monthly",
          userName: "Sarah Johnson",
          email: "sarah@email.com",
          amount: 999,
          currency: "BDT",
          paymentMethod: "Credit Card",
          status: "Completed",
          date: "01 jan 2026, 10:00 AM",
          isSubscription: true
     },
     {
          id: 12,
          transactionId: "SUB002",
          eventTitle: "Pro Subscription - Yearly",
          userName: "Mike Chen",
          email: "mike@email.com",
          amount: 8999,
          currency: "BDT",
          paymentMethod: "bKash",
          status: "Completed",
          date: "05 jan 2026, 2:15 PM",
          isSubscription: true
     },
     {
          id: 13,
          transactionId: "SUB003",
          eventTitle: "Basic Subscription - Monthly",
          userName: "Emma Davis",
          email: "emma@email.com",
          amount: 499,
          currency: "BDT",
          paymentMethod: "Bank Transfer",
          status: "Pending",
          date: "08 jan 2026, 11:30 AM",
          isSubscription: true
     },
     {
          id: 14,
          transactionId: "SUB004",
          eventTitle: "Premium Subscription - Yearly",
          userName: "Alex Rodriguez",
          email: "alex@email.com",
          amount: 10999,
          currency: "BDT",
          paymentMethod: "Credit Card",
          status: "Failed",
          date: "10 jan 2026, 4:45 PM",
          isSubscription: true
     },
     {
          id: 15,
          transactionId: "SUB005",
          eventTitle: "Pro Subscription - Monthly",
          userName: "Lisa Wang",
          email: "lisa@email.com",
          amount: 1499,
          currency: "BDT",
          paymentMethod: "bKash",
          status: "Completed",
          date: "15 jan 2026, 9:20 AM",
          isSubscription: true
     }
];

const PaymentHistory = () => {
     const [payments, setPayments] = useState(initialPayments);
     const [currentPage, setCurrentPage] = useState(1);
     const [paymentsPerPage] = useState(5);
     const [filterStatus, setFilterStatus] = useState('All');
     const [sortBy, setSortBy] = useState('date');
     const [sortOrder, setSortOrder] = useState('desc');
     const [filterType, setFilterType] = useState('All'); // New filter for payment type

     // Color scheme
     const primaryColor = '#DACBA4';
     const primaryHover = '#C8B992';
     const secondaryColor = '#8B7D5A';
     const textColor = '#5D5340';
     const lightBg = '#F5F1E8';
     const borderColor = '#E8DFCB';

     // Status colors
     const statusColors = {
          Completed: '#10B981',
          Pending: '#F59E0B',
          Failed: '#EF4444',
          Refunded: '#6B7280'
     };

     // Filter payments by status and type
     const filteredPayments = payments.filter(payment => {
          const statusMatch = filterStatus === 'All' || payment.status === filterStatus;
          const typeMatch = filterType === 'All' ||
               (filterType === 'Subscription' && payment.isSubscription) ||
               (filterType === 'Event' && !payment.isSubscription);
          return statusMatch && typeMatch;
     });

     const sortedPayments = [...filteredPayments].sort((a, b) => {
          if (sortBy === 'date') {
               return sortOrder === 'asc'
                    ? new Date(a.date) - new Date(b.date)
                    : new Date(b.date) - new Date(a.date);
          } else if (sortBy === 'amount') {
               return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
          } else if (sortBy === 'userName') {
               return sortOrder === 'asc'
                    ? a.userName.localeCompare(b.userName)
                    : b.userName.localeCompare(a.userName);
          }
          return 0;
     });

     // Calculate current payments for pagination
     const indexOfLastPayment = currentPage * paymentsPerPage;
     const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
     const currentPayments = sortedPayments.slice(indexOfFirstPayment, indexOfLastPayment);

     // Calculate total pages
     const totalPages = Math.ceil(sortedPayments.length / paymentsPerPage);

     // Handle page change
     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     // Handle sort
     const handleSort = (column) => {
          if (sortBy === column) {
               setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
          } else {
               setSortBy(column);
               setSortOrder('asc');
          }
     };

     // Handle filter change
     const handleFilterChange = (status) => {
          setFilterStatus(status);
          setCurrentPage(1);
     };

     // Handle type filter change
     const handleTypeFilterChange = (type) => {
          setFilterType(type);
          setCurrentPage(1);
     };

     // Format currency
     const formatCurrency = (amount, currency) => {
          return new Intl.NumberFormat('en-BD', {
               style: 'currency',
               currency: currency,
               minimumFractionDigits: 0
          }).format(amount);
     };

     // Get status counts for stats
     const statusCounts = {
          All: payments.length,
          Completed: payments.filter(p => p.status === 'Completed').length,
          Pending: payments.filter(p => p.status === 'Pending').length,
          Failed: payments.filter(p => p.status === 'Failed').length
     };

     // Get type counts
     const typeCounts = {
          All: payments.length,
          Event: payments.filter(p => !p.isSubscription).length,
          Subscription: payments.filter(p => p.isSubscription).length
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
          <div className="min-h-screen">
               <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                         <h1 className="text-4xl font-bold mb-4" style={{ color: textColor }}>
                              Payment History
                         </h1>
                         <p className="text-lg" style={{ color: secondaryColor }}>
                              Track and manage all payment transactions
                         </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                         {Object.entries(statusCounts).map(([status, count]) => (
                              <div
                                   key={status}
                                   onClick={() => handleFilterChange(status)}
                                   className={`rounded-lg shadow-lg p-4 text-center cursor-pointer transform transition-all duration-200 hover:scale-105 ${filterStatus === status ? 'ring-2 ring-offset-2' : ''
                                        }`}
                                   style={{
                                        backgroundColor: primaryColor,
                                        ...(filterStatus === status && {
                                             ringColor: secondaryColor,
                                             ringOffsetColor: lightBg
                                        })
                                   }}
                              >
                                   <p className="text-2xl font-bold text-white">{count}</p>
                                   <p className="text-white opacity-90 capitalize">{status}</p>
                              </div>
                         ))}
                    </div>

                    {/* Type Filter Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                         {Object.entries(typeCounts).map(([type, count]) => (
                              <div
                                   key={type}
                                   onClick={() => handleTypeFilterChange(type)}
                                   className={`rounded-lg shadow-lg p-4 text-center cursor-pointer transform transition-all duration-200 hover:scale-105 ${filterType === type ? 'ring-2 ring-offset-2' : ''
                                        }`}
                                   style={{
                                        backgroundColor: secondaryColor,
                                        ...(filterType === type && {
                                             ringColor: primaryColor,
                                             ringOffsetColor: lightBg
                                        })
                                   }}
                              >
                                   <p className="text-2xl font-bold text-white">{count}</p>
                                   <p className="text-white opacity-90 capitalize">{type} Payments</p>
                              </div>
                         ))}
                    </div>

                    {/* Payment Table */}
                    <div
                         className="rounded-2xl shadow-xl overflow-hidden mb-8 border"
                         style={{ borderColor: borderColor, backgroundColor: 'white' }}
                    >
                         <div
                              className="px-6 py-5 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                              style={{ borderColor: borderColor, backgroundColor: primaryColor }}
                         >
                              <h2 className="text-2xl font-semibold text-white">Payment Transactions</h2>
                              <div className="flex items-center space-x-4">
                                   <span className="text-white">Sort by:</span>
                                   <select
                                        value={sortBy}
                                        onChange={(e) => handleSort(e.target.value)}
                                        className="rounded-lg px-3 py-2 border-none focus:ring-2 focus:ring-white"
                                        style={{ backgroundColor: primaryHover, color: 'white' }}
                                   >
                                        <option value="date">Date</option>
                                        <option value="amount">Amount</option>
                                        <option value="userName">User Name</option>
                                   </select>
                                   <button
                                        onClick={() => handleSort(sortBy)}
                                        className="text-white hover:text-gray-200 transition-colors"
                                   >
                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                   </button>
                              </div>
                         </div>

                         <div className="overflow-x-auto">
                              <table className="min-w-full divide-y" style={{ borderColor: borderColor }}>
                                   <thead>
                                        <tr style={{ backgroundColor: lightBg }}>
                                             <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider" style={{ color: textColor }}>
                                                  Transaction ID
                                             </th>
                                             <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider" style={{ color: textColor }}>
                                                  Event / Subscription
                                             </th>
                                             <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider" style={{ color: textColor }}>
                                                  Amount
                                             </th>
                                             <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider" style={{ color: textColor }}>
                                                  Payment Method
                                             </th>
                                             <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider" style={{ color: textColor }}>
                                                  Status
                                             </th>
                                             <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider" style={{ color: textColor }}>
                                                  Date
                                             </th>
                                             <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider" style={{ color: textColor }}>
                                                  Type
                                             </th>
                                        </tr>
                                   </thead>
                                   <tbody className="divide-y" style={{ borderColor: borderColor }}>
                                        {currentPayments.length > 0 ? (
                                             currentPayments.map((payment, index) => (
                                                  <tr
                                                       key={payment.id}
                                                       className={`transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                                            }`}
                                                       style={{
                                                            backgroundColor: index % 2 === 0 ? 'white' : lightBg
                                                       }}
                                                  >
                                                       <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-mono font-semibold" style={{ color: textColor }}>
                                                                 {payment.transactionId}
                                                            </div>
                                                       </td>
                                                       <td className="px-6 py-4">
                                                            <div className="flex items-center space-x-2">
                                                                 <div className="text-sm font-semibold" style={{ color: textColor }}>
                                                                      {payment.eventTitle}
                                                                 </div>
                                                                 {payment.isSubscription && (
                                                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold text-white"
                                                                           style={{ backgroundColor: secondaryColor }}>
                                                                           Subscription
                                                                      </span>
                                                                 )}
                                                            </div>
                                                            <div className="text-sm" style={{ color: secondaryColor }}>
                                                                 {payment.userName}
                                                            </div>
                                                            <div className="text-xs" style={{ color: secondaryColor }}>
                                                                 {payment.email}
                                                            </div>
                                                       </td>
                                                       <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-lg font-bold" style={{ color: textColor }}>
                                                                 {formatCurrency(payment.amount, payment.currency)}
                                                            </div>
                                                       </td>
                                                       <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm" style={{ color: secondaryColor }}>
                                                                 {payment.paymentMethod}
                                                            </div>
                                                       </td>
                                                       <td className="px-6 py-4 whitespace-nowrap">
                                                            <span
                                                                 className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white"
                                                                 style={{ backgroundColor: statusColors[payment.status] }}
                                                            >
                                                                 {payment.status}
                                                            </span>
                                                       </td>
                                                       <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm" style={{ color: secondaryColor }}>
                                                                 {payment.date}
                                                            </div>
                                                       </td>
                                                       <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-semibold capitalize" style={{ color: secondaryColor }}>
                                                                 {payment.isSubscription ? 'Subscription' : 'Event'}
                                                            </div>
                                                       </td>
                                                  </tr>
                                             ))
                                        ) : (
                                             <tr>
                                                  <td colSpan="7" className="px-6 py-8 text-center">
                                                       <div className="text-xl" style={{ color: secondaryColor }}>
                                                            No payments found
                                                       </div>
                                                  </td>
                                             </tr>
                                        )}
                                   </tbody>
                              </table>
                         </div>
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
                                   onMouseEnter={(e) => {
                                        if (currentPage !== 1) {
                                             e.target.style.backgroundColor = primaryHover;
                                        }
                                   }}
                                   onMouseLeave={(e) => {
                                        if (currentPage !== 1) {
                                             e.target.style.backgroundColor = primaryColor;
                                        }
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
                                             onMouseEnter={(e) => {
                                                  if (currentPage !== page) {
                                                       e.target.style.backgroundColor = primaryHover;
                                                  }
                                             }}
                                             onMouseLeave={(e) => {
                                                  if (currentPage !== page) {
                                                       e.target.style.backgroundColor = primaryColor;
                                                  }
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
                                   onMouseEnter={(e) => {
                                        if (currentPage !== totalPages) {
                                             e.target.style.backgroundColor = primaryHover;
                                        }
                                   }}
                                   onMouseLeave={(e) => {
                                        if (currentPage !== totalPages) {
                                             e.target.style.backgroundColor = primaryColor;
                                        }
                                   }}
                              >
                                   Next
                              </button>
                         </div>
                    )}

                    {/* Summary */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border" style={{ borderColor: borderColor }}>
                         <h3 className="text-xl font-semibold mb-4" style={{ color: textColor }}>Payment Summary</h3>
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: lightBg }}>
                                   <p className="text-2xl font-bold" style={{ color: textColor }}>
                                        {formatCurrency(
                                             payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0),
                                             'BDT'
                                        )}
                                   </p>
                                   <p style={{ color: secondaryColor }}>Total Revenue</p>
                              </div>
                              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: lightBg }}>
                                   <p className="text-2xl font-bold" style={{ color: textColor }}>
                                        {payments.filter(p => p.status === 'Completed').length}
                                   </p>
                                   <p style={{ color: secondaryColor }}>Successful Payments</p>
                              </div>
                              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: lightBg }}>
                                   <p className="text-2xl font-bold" style={{ color: textColor }}>
                                        {formatCurrency(
                                             payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0),
                                             'BDT'
                                        )}
                                   </p>
                                   <p style={{ color: secondaryColor }}>Pending Amount</p>
                              </div>
                              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: lightBg }}>
                                   <p className="text-2xl font-bold" style={{ color: textColor }}>
                                        {payments.filter(p => p.status === 'Failed').length}
                                   </p>
                                   <p style={{ color: secondaryColor }}>Failed Payments</p>
                              </div>
                         </div>

                         {/* Subscription Specific Summary */}
                         <div className="mt-6 pt-6 border-t" style={{ borderColor: borderColor }}>
                              <h4 className="text-lg font-semibold mb-3" style={{ color: textColor }}>Subscription Summary</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                   <div className="text-center p-3 rounded-lg" style={{ backgroundColor: lightBg }}>
                                        <p className="text-xl font-bold" style={{ color: textColor }}>
                                             {payments.filter(p => p.isSubscription).length}
                                        </p>
                                        <p style={{ color: secondaryColor }}>Total Subscriptions</p>
                                   </div>
                                   <div className="text-center p-3 rounded-lg" style={{ backgroundColor: lightBg }}>
                                        <p className="text-xl font-bold" style={{ color: textColor }}>
                                             {formatCurrency(
                                                  payments.filter(p => p.isSubscription && p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0),
                                                  'BDT'
                                             )}
                                        </p>
                                        <p style={{ color: secondaryColor }}>Subscription Revenue</p>
                                   </div>
                                   <div className="text-center p-3 rounded-lg" style={{ backgroundColor: lightBg }}>
                                        <p className="text-xl font-bold" style={{ color: textColor }}>
                                             {payments.filter(p => p.isSubscription && p.status === 'Completed').length}
                                        </p>
                                        <p style={{ color: secondaryColor }}>Active Subscriptions</p>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Current Page Info */}
                    <div className="text-center">
                         <p className="text-lg font-semibold" style={{ color: textColor }}>
                              Showing {currentPayments.length} of {sortedPayments.length} payments • Page {currentPage} of {totalPages}
                         </p>
                    </div>
               </div>
          </div>
     );
};

export default PaymentHistory;