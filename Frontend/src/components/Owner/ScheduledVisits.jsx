import { useState, useEffect } from 'react';
const server_URL = import.meta.env.VITE_server_URL;

const ScheduledVisits = () => {
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
    
    // Format date function
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };
    
    // Loading state
    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    );
    
    // Error state
    if (error) return (
        <div className="p-6 max-w-4xl mx-auto bg-gray-900 text-red-400 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-bold">Error: {error}</h2>
            </div>
        </div>
    );
    
    // Empty state
    if (!pgDetails || pgDetails.length === 0) return (
        <div className="p-6 max-w-4xl mx-auto bg-gray-900 text-gray-300 rounded-lg shadow-lg">
            <div className="flex items-center justify-center p-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg">No PG details available.</p>
            </div>
        </div>
    );
    
    return (
        <div className="py-8 px-4 bg-gray-900 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-white text-center">PG Details</h1>
                
                <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                    {pgDetails.map((pg, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
                            <div className="bg-purple-900 p-4">
                                <h2 className="text-xl font-bold text-white">{pg.PGname}</h2>
                            </div>
                            
                            <div className="p-5 text-gray-300">
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <p>Phone: {pg.PhNumber}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <p>City: {pg.City}</p>
                                    </div>
                                </div>
                                
                                <div className="mb-6">
                                    <div className="flex items-start mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        <p>Address: {pg.Address}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p>Price Range: ₹{pg.PriceRange}</p>
                                    </div>
                                </div>
                                
                                <div className="mt-6">
                                    <h3 className="text-2xl font-semibold text-yellow-400 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Scheduled Visits
                                    </h3>
                                    
                                    {pg.scheduledVisits && pg.scheduledVisits.length > 0 ? (
                                        <div className="space-y-4">
                                            {pg.scheduledVisits.map((visit, visitIndex) => (
                                                <div key={visitIndex} className="bg-gray-700 p-4 rounded-md border-l-4 border-purple-500">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        <div className="flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                            <p>User: {visit.name}</p>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                            </svg>
                                                            <p>Phone: {visit.phone}</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        <div className="flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            <p>Date: {formatDate(visit.visitDate)}</p>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                visit.status === 'Confirmed' ? 'bg-green-900 text-green-300' : 
                                                                visit.status === 'Pending' ? 'bg-yellow-900 text-yellow-300' : 
                                                                visit.status === 'Cancelled' ? 'bg-red-900 text-red-300' : 
                                                                'bg-blue-900 text-blue-300'
                                                            }`}>
                                                                {visit.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-400 text-xl italic">No scheduled visits</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScheduledVisits;