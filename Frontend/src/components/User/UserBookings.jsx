import React, { useState, useEffect } from 'react';
const server_URL = import.meta.env.VITE_server_URL;

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [scheduledVisits, setScheduledVisits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('visits');

    useEffect(() => {
        // Fetch User profile and PG details from the backend
        const fetchData = async () => {
            try {
                // Fetch user profile to get the email
                const profileResponse = await fetch(`${server_URL}/UserProfile`, {
                    method: 'GET',
                    credentials: 'include', // Include cookies for authentication
                });

                if (!profileResponse.ok) {
                    throw new Error('Failed to fetch user profile');
                }

                const profileData = await profileResponse.json();
                const userEmail = profileData.user.email; // Extract email from the response
                console.log('User Email:', userEmail);

                // Fetch bookings using the email
                const bookingsResponse = await fetch(`${server_URL}/userBookings`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: userEmail }),
                    credentials: "include",
                });
                const bookingsData = await bookingsResponse.json();
                setBookings(bookingsData);
                
                // Fetch scheduled visits using the email
                const visitsResponse = await fetch(`${server_URL}/userScheduledVisits`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: userEmail }),
                    credentials: "include",
                });

                const visitsData = await visitsResponse.json();
                setScheduledVisits(visitsData);
                setLoading(false);

                console.log("Visits:", visitsData.length);
                console.log("Bookings:", bookingsData.length);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Format date in a more readable way
    const formatDate = (dateString) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Status colors updated for dark theme
    const statusColors = {
        confirmed: "bg-green-900/50 text-green-300 border-green-700",
        pending: "bg-yellow-900/50 text-yellow-300 border-yellow-700",
        rejected: "bg-red-900/50 text-red-300 border-red-700",
        cancelled: "bg-gray-700 text-gray-300 border-gray-600"
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg font-medium text-white">Loading your data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full border-l-4 border-red-500">
                    <h3 className="text-xl font-bold text-red-400 mb-2">Something went wrong</h3>
                    <p className="text-gray-300">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">My Accommodations</h1>
                
                {/* Tab Navigation */}
                <div className="flex mb-6 border-b border-gray-700">
                    <button 
                        className={`py-2 px-4 font-medium text-sm md:text-base transition-colors ${activeTab === 'visits' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
                        onClick={() => setActiveTab('visits')}
                    >
                        Scheduled Visits ({scheduledVisits.length})
                    </button>
                    <button 
                        className={`py-2 px-4 font-medium text-sm md:text-base transition-colors ${activeTab === 'bookings' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
                        onClick={() => setActiveTab('bookings')}
                    >
                        My Reservations ({bookings.length})
                    </button>
                </div>
                
                {/* Content based on active tab */}
                {activeTab === 'visits' && (
                    <div className="fade-in">
                        {scheduledVisits.length === 0 ? (
                            <div className="bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/40 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-white mb-1">No Scheduled Visits</h3>
                                <p className="text-gray-400">You haven't scheduled PG visits yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {scheduledVisits.map((visit, index) => (
                                    <div key={index} className="bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-700 hover:shadow-md transition-shadow">
                                        <div className="bg-blue-900/30 px-6 py-4 border-b border-blue-800">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="font-medium text-blue-300">{formatDate(visit.visitDate)}</span>
                                                </div>
                                                <span className="text-xs font-medium bg-blue-900/60 text-blue-300 px-2 py-1 rounded-full">Visit</span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-4">
                                                <h3 className="text-lg font-medium text-white mb-1">Visit Details</h3>
                                                <p className="text-gray-400 text-sm">{visit.pgName || "PG Visit"}</p>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-start">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-300">{visit.name}</p>
                                                        <p className="text-xs text-gray-400">Contact Person</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-300">{visit.phone}</p>
                                                        <p className="text-xs text-gray-400">Phone Number</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                
                {activeTab === 'bookings' && (
                    <div className="fade-in">
                        {bookings.length === 0 ? (
                            <div className="bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/40 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-white mb-1">No Reservations Yet</h3>
                                <p className="text-gray-400">You haven't made any PG reservations yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {bookings.map((booking, index) => (
                                    <div key={index} className="bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-700 hover:shadow-md transition-shadow">
                                        <div className="bg-green-900/30 px-6 py-4 border-b border-green-800">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    <span className="font-medium text-green-300">Room {booking.roomBooked}</span>
                                                </div>
                                                <span className={`text-xl font-medium px-2 py-1 rounded-full ${statusColors[booking.bookingStatus] || "bg-gray-700 text-gray-300"}`}>
                                                    {booking.bookingStatus}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-4">
                                                <h3 className="text-lg font-medium text-white mb-1">{booking.pgName || "Accommodation Booking"}</h3>
                                                <p className="text-gray-400 text-sm">Desired Move-in Date : {formatDate(booking.bookingDate)}</p>
                                            </div>
                                            <div className="space-y-3">
                                                {booking.rent && (
                                                    <div className="flex items-start">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2" />
                                                        </svg>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-300">₹{booking.rent}/month</p>
                                                            <p className="text-xs text-gray-400">Rent Amount</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {booking.checkInDate && (
                                                    <div className="flex items-start">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-300">{formatDate(booking.checkInDate)}</p>
                                                            <p className="text-xs text-gray-400">Check-in Date</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;