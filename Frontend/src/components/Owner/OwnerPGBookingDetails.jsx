// import { useState, useEffect } from 'react';

// const PgBookings = () => {
//     const [pgDetails, setPgDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Fetch PG details from the backend
//     useEffect(() => {
//         const fetchPGDetails = async () => {
//             try {
//                 const response = await fetch('http://localhost:3000/ViewPgDetails', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     credentials: 'include',
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch PG details');
//                 }
//                 const data = await response.json();
//                 setPgDetails(data);
//             } catch (error) {
//                 console.error('Error fetching PG details:', error);
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPGDetails();
//     }, []);

//     // Handle booking status update
//     const updateBookingStatus = async (pgId, bookingId, newStatus, roomType) => {
//         try {
//             const response = await fetch('http://localhost:3000/updateBookingStatus', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ pgId, bookingId, newStatus, roomType }),
//                 credentials: 'include',
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to update booking status');
//             }

//             const updatedDetails = await response.json();
//             setPgDetails(updatedDetails);
//             alert(`Booking status updated to ${newStatus}`);
//         } catch (error) {
//             console.error('Error updating booking status:', error);
//             alert('Error updating booking status. Please try again.');
//         }
//     };

//     // Loading, error, and empty PG details states
//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;
//     if (!pgDetails || pgDetails.length === 0) return <div>No PG details available.</div>;

//     const VisitDate = ({ visitDate }) => {
//         const formattedDate = new Date(visitDate).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//         });
//         return <span>{formattedDate}</span>;
//     };

//     return (
//         <div className="p-8 min-h-screen mx-auto bg-gradient-to-l from-black to-gray-500 shadow-lg">
//             <h1 className="text-3xl font-bold mb-4 text-white text-center">PG Details</h1>
//             {pgDetails.map((pg, index) => (
//                 <div key={index} className="mb-6 flex flex-col items-center">
//                     <h2 className="text-2xl font-semibold text-white">{pg.PGname}</h2>
//                     <p className="text-white text-xl">Phone: {pg.PhNumber}</p>
//                     <p className="text-white text-xl">Address: {pg.Address}</p>
//                     <p className="text-white text-xl">City: {pg.City}</p>
//                     <p className="text-white text-xl">Price Range: ₹{pg.PriceRange}</p>

//                     {/* Display Room Information */}
//                     <div className="mt-6 w-full">
//                         <h3 className="text-2xl font-bold text-white mb-4">Current Room Availability</h3>
//                         <div className="flex flex-wrap gap-4">
//                             {pg.Rooms.map((room, roomIndex) => (
//                                 <div
//                                     key={roomIndex}
//                                     className="bg-gradient-to-br from-gray-700 to-gray-900 p-4 rounded-lg shadow-lg text-white w-60 flex-shrink-0"
//                                 >
//                                     <h4 className="text-xl font-semibold mb-2">{room.RoomType}</h4>
//                                     <p className="text-lg">Price: ₹{room.RoomPrice}</p>
//                                     <p className="text-lg font-bold">Vacant Rooms: {room.VacantRooms}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>


//                     {/* Booking Information */}
//                     <div className="flex flex-col w-full mt-4">
//                         <h3 className="text-3xl font-bold mb-3 text-white">Reservations</h3>
//                         {pg.pgBookings.map((pgBooking, Index) => (
//                             <div key={Index} className="mb-4 p-4 bg-gradient-to-r from-black to-gray-500 rounded-lg shadow">
//                                 <p className="font-semibold text-white text-2xl">User Name: {pgBooking.email}</p>
//                                 <p className="text-white text-xl">Phone No: {pgBooking.phone}</p>
//                                 <p className="text-white text-xl">
//                                     Scheduled Date: <VisitDate visitDate={pgBooking.bookingDate} />
//                                 </p>
//                                 <p className="text-white text-xl">Status: {pgBooking.bookingStatus}</p>
//                                 <p className="text-white text-xl">Room Type: {pgBooking.roomBooked}</p>

//                                 {/* Buttons for accepting or canceling the booking */}
//                                 <div className="mt-4 flex gap-4">
//                                     <button
//                                         className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                                         onClick={() =>
//                                             updateBookingStatus(pg._id, pgBooking._id, 'confirmed', pgBooking.roomBooked)
//                                         }
//                                         disabled={pgBooking.bookingStatus === 'confirmed'}
//                                     >
//                                         Accept
//                                     </button>
//                                     <button
//                                         className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                                         onClick={() =>
//                                             updateBookingStatus(pg._id, pgBooking._id, 'cancelled', pgBooking.roomBooked)
//                                         }
//                                         disabled={pgBooking.bookingStatus === 'cancelled'}
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default PgBookings;

import { useState, useEffect } from 'react';
// Make sure you have the correct import
import { toast, ToastContainer } from 'react-toastify';
const server_URL=import.meta.env.VITE_server_URL;

const PgBookings = () => {
    const [pgDetails, setPgDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch PG details from the backend
    useEffect(() => {
        const fetchPGDetails = async () => {
            try {
                const response = await fetch(`${server_URL}/ViewPgDetails`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch PG details');
                }
                const data = await response.json();
                console.log(data);
                setPgDetails(data);
            } catch (error) {
                console.error('Error fetching PG details:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPGDetails();
    }, []);

    // Handle booking status update
    // Handle booking status update
    // Handle booking status update
const updateBookingStatus = async (pgId, bookingId, newStatus, roomType) => {
    try {
        const response = await fetch(`${server_URL}/updateBookingStatus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pgId, bookingId, newStatus, roomType }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to update booking status');
        }

        // Instead of directly setting the state with the response,
        // refetch the PG details to ensure we have the correct structure
        const refreshResponse = await fetch(`${server_URL}/ViewPgDetails`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        
        if (!refreshResponse.ok) {
            throw new Error('Failed to refresh PG details');
        }
        
        const freshData = await refreshResponse.json();
        setPgDetails(freshData);
        
        toast.success(`Booking status updated to ${newStatus}`, {
            position: "top-right"
        });
    } catch (error) {
        console.error('Error updating booking status:', error);
        toast.error('Error updating booking status. Please try again.', {
            position: "top-right"
        });
    }
};

    // Loading and error states with improved styling
    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
        </div>
    );
    
    if (error) return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="bg-red-900/50 p-6 rounded-lg border border-red-500">
                <h2 className="text-xl font-bold text-red-300 mb-2">Error</h2>
                <p className="text-white">{error}</p>
            </div>
        </div>
    );
    
    if (!pgDetails || pgDetails.length === 0) return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <p className="text-gray-300 text-lg">No PG details available.</p>
            </div>
        </div>
    );

    const VisitDate = ({ visitDate }) => {
        const formattedDate = new Date(visitDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return <span>{formattedDate}</span>;
    };

    // Status badge component
    const StatusBadge = ({ status }) => {
        let bgColor;
        switch (status.toLowerCase()) {
            case 'pending':
                bgColor = 'bg-yellow-600';
                break;
            case 'confirmed':
                bgColor = 'bg-green-600';
                break;
            case 'cancelled':
                bgColor = 'bg-red-600';
                break;
            default:
                bgColor = 'bg-blue-600';
        }
        
        return (
            <span className={`${bgColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    // return (
    //     <div className="min-h-screen bg-gray-900 text-gray-100">
    //         <ToastContainer theme="dark" />
            
    //         <header className="bg-gray-800/60 py-6 border-b border-gray-700">
    //             <div className="container mx-auto px-6">
    //                 <h1 className="text-3xl font-bold text-white">PG Management Dashboard</h1>
    //             </div>
    //         </header>
            
    //         <main className="container mx-auto px-6 py-8">
    //             {(pgDetails.length!==0) && pgDetails.map((pg, index) => (
    //                 <div key={index} className="mb-10 bg-gray-800/30 rounded-xl overflow-hidden shadow-xl border border-gray-700">
    //                     <div className="p-6 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-b border-gray-700">
    //                         <h2 className="text-2xl font-bold text-white mb-2">{pg.PGname}</h2>
    //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
    //                             <div className="flex items-center">
    //                                 <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
    //                                 </svg>
    //                                 <span>{pg.PhNumber}</span>
    //                             </div>
    //                             <div className="flex items-center">
    //                                 <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
    //                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
    //                                 </svg>
    //                                 <span>{pg.Address}, {pg.City}</span>
    //                             </div>
    //                             <div className="flex items-center">
    //                                 <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    //                                 </svg>
    //                                 <span>Price Range: ₹{pg.PriceRange}</span>
    //                             </div>
    //                         </div>
    //                     </div>

    //                     {/* Room Availability Section */}
    //                     <div className="p-6 border-b border-gray-700">
    //                         <h3 className="text-xl font-bold text-white mb-4 flex items-center">
    //                             <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
    //                             </svg>
    //                             Room Availability
    //                         </h3>
    //                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    //                             {pg.Rooms.map((room, roomIndex) => (
    //                                 <div
    //                                     key={roomIndex}
    //                                     className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden transition-all duration-300 hover:border-indigo-500 hover:shadow-indigo-500/20"
    //                                 >
    //                                     <div className="p-4">
    //                                         <h4 className="text-lg font-semibold text-white mb-3">{room.RoomType}</h4>
    //                                         <div className="flex justify-between items-center mb-3">
    //                                             <span className="text-gray-400">Price</span>
    //                                             <span className="text-white font-bold">₹{room.RoomPrice}</span>
    //                                         </div>
    //                                         <div className="flex justify-between items-center">
    //                                             <span className="text-gray-400">Available</span>
    //                                             <div className={`text-white font-bold px-3 py-1 rounded ${room.VacantRooms > 0 ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
    //                                                 {room.VacantRooms} rooms
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             ))}
    //                         </div>
    //                     </div>

    //                     {/* Reservations Section */}
    //                     <div className="p-6">
    //                         <h3 className="text-xl font-bold text-white mb-4 flex items-center">
    //                             <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
    //                             </svg>
    //                             Reservations
    //                         </h3>
    //                         <div className="space-y-4">
    //                             {pg.pgBookings.length === 0 ? (
    //                                 <div className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700">
    //                                     <p className="text-gray-400">No reservations found</p>
    //                                 </div>
    //                             ) : (
    //                                 pg.pgBookings.map((pgBooking, Index) => {
    //                                     const isStatusFinal = pgBooking.bookingStatus === 'confirmed' || pgBooking.bookingStatus === 'cancelled';
    //                                     return (
    //                                         <div
    //                                             key={Index}
    //                                             className={`bg-gray-800 rounded-lg overflow-hidden border ${
    //                                                 isStatusFinal ? 'border-gray-700 opacity-75' : 'border-gray-600'
    //                                             }`}
    //                                         >
    //                                             <div className="p-5">
    //                                                 <div className="flex justify-between flex-wrap gap-2">
    //                                                     <h4 className="text-lg font-semibold text-white">{pgBooking.email}</h4>
    //                                                     <StatusBadge status={pgBooking.bookingStatus} />
    //                                                 </div>
                                                    
    //                                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-gray-300">
    //                                                     <div className="flex items-center">
    //                                                         <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
    //                                                         </svg>
    //                                                         <span>{pgBooking.phone}</span>
    //                                                     </div>
    //                                                     <div className="flex items-center">
    //                                                         <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
    //                                                         </svg>
    //                                                         <span><VisitDate visitDate={pgBooking.bookingDate} /></span>
    //                                                     </div>
    //                                                     <div className="flex items-center">
    //                                                         <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
    //                                                         </svg>
    //                                                         <span>{pgBooking.roomBooked}</span>
    //                                                     </div>
    //                                                 </div>

    //                                                 {/* Action buttons */}
    //                                                 {!isStatusFinal && (
    //                                                     <div className="mt-4 flex gap-3">
    //                                                         <button
    //                                                             className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md hover:from-green-700 hover:to-green-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center"
    //                                                             onClick={() => updateBookingStatus(pg._id, pgBooking._id, 'confirmed', pgBooking.roomBooked)}
    //                                                         >
    //                                                             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    //                                                             </svg>
    //                                                             Accept
    //                                                         </button>
    //                                                         <button
    //                                                             className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-md hover:from-red-700 hover:to-red-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center"
    //                                                             onClick={() => updateBookingStatus(pg._id, pgBooking._id, 'cancelled', pgBooking.roomBooked)}
    //                                                         >
    //                                                             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    //                                                             </svg>
    //                                                             Cancel
    //                                                         </button>
    //                                                     </div>
    //                                                 )}
    //                                             </div>
    //                                         </div>
    //                                     );
    //                                 })
    //                             )}
    //                         </div>
    //                     </div>
    //                 </div>
    //             ))}
    //         </main>
    //     </div>
    // );

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <ToastContainer theme="dark" />
            
            <header className="bg-gray-800/60 py-6 border-b border-gray-700">
                <div className="container mx-auto px-6">
                    <h1 className="text-3xl font-bold text-white">PG Management Dashboard</h1>
                </div>
            </header>
            
            <main className="container mx-auto px-6 py-8">
                {Array.isArray(pgDetails) && pgDetails.length > 0 ? pgDetails.map((pg, index) => (
                    <div key={index} className="mb-10 bg-gray-800/30 rounded-xl overflow-hidden shadow-xl border border-gray-700">
                        <div className="p-6 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-b border-gray-700">
                            <h2 className="text-2xl font-bold text-white mb-2">{pg.PGname}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                    <span>{pg.PhNumber}</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <span>{pg.Address}, {pg.City}</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span>Price Range: ₹{pg.PriceRange}</span>
                                </div>
                            </div>
                        </div>
    
                        {/* Room Availability Section */}
                        <div className="p-6 border-b border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                </svg>
                                Room Availability
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {Array.isArray(pg.Rooms) && pg.Rooms.map((room, roomIndex) => (
                                    <div
                                        key={roomIndex}
                                        className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden transition-all duration-300 hover:border-indigo-500 hover:shadow-indigo-500/20"
                                    >
                                        <div className="p-4">
                                            <h4 className="text-lg font-semibold text-white mb-3">{room.RoomType}</h4>
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="text-gray-400">Price</span>
                                                <span className="text-white font-bold">₹{room.RoomPrice}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-400">Available</span>
                                                <div className={`text-white font-bold px-3 py-1 rounded ${room.VacantRooms > 0 ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                                                    {room.VacantRooms} rooms
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
    
                        {/* Reservations Section */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                Reservations
                            </h3>
                            <div className="space-y-4">
                                {!Array.isArray(pg.pgBookings) || pg.pgBookings.length === 0 ? (
                                    <div className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                                        <p className="text-gray-400">No reservations found</p>
                                    </div>
                                ) : (
                                    pg.pgBookings.map((pgBooking, Index) => {
                                        const isStatusFinal = pgBooking.bookingStatus === 'confirmed' || pgBooking.bookingStatus === 'cancelled';
                                        return (
                                            <div
                                                key={Index}
                                                className={`bg-gray-800 rounded-lg overflow-hidden border ${
                                                    isStatusFinal ? 'border-gray-700 opacity-75' : 'border-gray-600'
                                                }`}
                                            >
                                                <div className="p-5">
                                                    <div className="flex justify-between flex-wrap gap-2">
                                                        <h4 className="text-lg font-semibold text-white">{pgBooking.email}</h4>
                                                        <StatusBadge status={pgBooking.bookingStatus} />
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-gray-300">
                                                        <div className="flex items-center">
                                                            <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                                            </svg>
                                                            <span>{pgBooking.phone}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                            </svg>
                                                            <span><VisitDate visitDate={pgBooking.bookingDate} /></span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                                            </svg>
                                                            <span>{pgBooking.roomBooked}</span>
                                                        </div>
                                                    </div>
    
                                                    {/* Action buttons */}
                                                    {!isStatusFinal && (
                                                        <div className="mt-4 flex gap-3">
                                                            <button
                                                                className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md hover:from-green-700 hover:to-green-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center"
                                                                onClick={() => updateBookingStatus(pg._id, pgBooking._id, 'confirmed', pgBooking.roomBooked)}
                                                            >
                                                                <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                                </svg>
                                                                Accept
                                                            </button>
                                                            <button
                                                                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-md hover:from-red-700 hover:to-red-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center"
                                                                onClick={() => updateBookingStatus(pg._id, pgBooking._id, 'cancelled', pgBooking.roomBooked)}
                                                            >
                                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                                </svg>
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                        <p className="text-gray-400">No PG details available</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default PgBookings;