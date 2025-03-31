import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaBuilding, FaMapMarkerAlt, FaCity, FaPhone, FaRupeeSign, FaUtensils, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const server_URL = import.meta.env.VITE_server_URL;

const OwnerProfile = () => {
    const [ownerData, setOwnerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        // Fetch owner profile and PG details from the backend
        const fetchData = async () => {
            try {
                const response = await fetch(`${server_URL}/OwnerProfile`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Send cookies with the request
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log("got ddatatatatat", data);
                setOwnerData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-24 w-24 rounded-full bg-indigo-700/50"></div>
                    <div className="mt-4 text-xl font-semibold text-gray-300">Loading...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="bg-red-900/30 border border-red-500 rounded-lg p-6 max-w-lg">
                    <h2 className="text-2xl font-bold text-red-300 mb-2">Error</h2>
                    <p className="text-red-200">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-500">
                    Owner Dashboard
                </h1>

                {/* Owner Profile Section */}
                {ownerData ? (
                    <div className="space-y-10">
                        {/* Owner Information Card */}
                        <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
                            {/* Abstract background patterns */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>
                            
                            <div className="relative p-8">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-500/30">
                                        <span className="text-2xl font-bold text-indigo-400">
                                            {ownerData.owner.email.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Owner Profile</h2>
                                        <p className="text-indigo-300">Account Information</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-3 p-4 rounded-xl bg-indigo-900/20 border border-indigo-800/30">
                                    <FaEnvelope className="text-indigo-400 text-xl flex-shrink-0" />
                                    <div>
                                        <p className="text-gray-400 text-sm">Email Address</p>
                                        <p className="text-white font-medium">{ownerData.owner.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PGs Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-white">
                                    Your Properties
                                </h2>
                                <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-300">
                                    {ownerData.pgDetails.length} PG{ownerData.pgDetails.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {ownerData.pgDetails.map((pg, index) => (
                                    <div 
                                        key={index} 
                                        className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-indigo-900/20 border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900"
                                    >
                                        {/* Card highlight effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>
                                        
                                        <div className="relative p-6">
                                            <div className="flex items-center mb-4">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-900/30 mr-3">
                                                    <FaBuilding className="text-blue-400" />
                                                </div>
                                                <h3 className="text-xl font-bold text-white truncate">{pg.PGname}</h3>
                                            </div>
                                            
                                            <div className="space-y-3 mt-4">
                                                <div className="flex items-start">
                                                    <FaMapMarkerAlt className="text-red-400 mt-1 mr-3 flex-shrink-0" />
                                                    <p className="text-gray-300">{pg.Address}</p>
                                                </div>
                                                
                                                <div className="flex items-center">
                                                    <FaCity className="text-purple-400 mr-3 flex-shrink-0" />
                                                    <p className="text-gray-300">{pg.City}</p>
                                                </div>
                                                
                                                <div className="flex items-center">
                                                    <FaPhone className="text-green-400 mr-3 flex-shrink-0" />
                                                    <p className="text-gray-300">{pg.PhNumber}</p>
                                                </div>
                                                
                                                <div className="flex items-center">
                                                    <FaRupeeSign className="text-amber-400 mr-3 flex-shrink-0" />
                                                    <p className="text-gray-300">₹{pg.PriceRange}</p>
                                                </div>
                                                
                                                <div className="flex items-center">
                                                    <FaUtensils className="text-pink-400 mr-3 flex-shrink-0" />
                                                    <p className="text-gray-300">{pg.Food}</p>
                                                </div>
                                                
                                                <div className="flex items-center">
                                                    <FaUsers className="text-cyan-400 mr-3 flex-shrink-0" />
                                                    <p className="text-gray-300">For {pg.Gender}</p>
                                                </div>
                                            </div>
                                            
                                            {/* Card footer with edit button */}
                                            <div className="mt-6 pt-4 border-t border-gray-700">
                                                <button onClick={()=>{navigate('/OwnerPGBookingDetails')}} className="w-full py-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/30 text-indigo-300 font-medium transition-colors duration-200">
                                                    Manage Bookings
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {ownerData.pgDetails.length === 0 && (
                                <div className="flex flex-col items-center justify-center p-10 bg-gray-800/30 border border-gray-700 rounded-xl">
                                    <FaBuilding className="text-gray-600 text-5xl mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No Properties Added</h3>
                                    <p className="text-gray-500 text-center mb-6">You haven't added any PG properties yet.</p>
                                    <button className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors duration-200">
                                        Add Your First PG
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ):
                (
                    <div className="bg-gray-200 shadow-md rounded-lg p-6 mb-10 text-center">
                        {/* <h2 className="text-3xl font-semibold mb-4">User Profile</h2> */}
                        <p className="text-gray-700 text-xl mb-4">Please login to view your profile information.</p>
                        <button onClick={()=>{navigate('/OwnerLogin')}} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg">
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OwnerProfile;