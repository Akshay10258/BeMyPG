import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pgimage from '../../assets/images/WhatsApp6.jpeg';
const server_URL=import.meta.env.VITE_server_URL;
const OwnerHomePage = () => {
    const navigate = useNavigate();
    const [greeting, setGreeting] = useState('');
    let isLoggedIn = false;
    const [username, setUsername] = useState('User');
    const [UserData, setUserData] = useState(null);
    useEffect(() => {
        // Fetch User profile and PG details from the backend
        const fetchData = async () => {
            try {
                const response = await fetch(`${server_URL}/UserProfile`,
                    {method: "GET",
                    credentials:"include"}); // Adjust API endpoint as needed
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                if(data){
                    isLoggedIn = true;
                    console.log("status",isLoggedIn);
                }
                setUserData(data)
                console.log("hook data",UserData);

                const hours = new Date().getHours();
                const greetingText = hours < 12 ? 'Good Morning' : 
                                    hours < 18 ? 'Good Afternoon' : 'Good Evening';
                setGreeting(greetingText);
                
                setUsername(data.user.name || 'User');
            } catch (err) {
                console.log(err.message);
                // setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch(`${server_URL}/logout`, {
                method: "POST",
                credentials: "include"  // Important to include cookies
            });
            
            if (response.ok ) {
                // Navigate to the homepage/login page
                isLoggedIn = false;
                navigate('/');
            } else {
                const data = await response.json();
                console.error("Logout failed:", data.message);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleSearchPG = () => {
        if (UserData) {
            navigate('/UserFindPgByCity', { state: { userData: UserData } });
        } else {
            alert("Please Login to search for PG");
            navigate('/UserLogin');
        }
    };
    
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
            {/* Header Section */}
            <header className="bg-gradient-to-r from-purple-900 to-indigo-900 p-6 shadow-lg">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-2xl md:text-3xl font-bold">{greeting}, {username}</h1>
                        <p className="text-purple-200 mt-1">Welcome to your dashboard</p>
                    </div>
                    <div className="flex space-x-2">
                        <button 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center text-sm"
                            onClick={() => navigate('/UserViewProfile',{state:{ userData: UserData }})}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            Profile
                        </button>
                        <button 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center text-sm"
                            onClick={handleLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                                />
                            </svg>
                            {UserData?"Log-Out" : "Log-In"}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto py-8 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Features Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                            <div className="relative h-48 md:h-72">
                                <img 
                                    src={pgimage} 
                                    alt="PG accommodation" 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6">
                                    <h2 className="text-3xl font-bold text-white">Find Your Perfect PG</h2>
                                    <p className="text-gray-300 mt-2">Browse through hundreds of verified PGs in your area</p>
                                    <button 
                                        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-3xl text-white px-20 py-2 rounded-lg transition-all duration-200"
                                        onClick={handleSearchPG}
                                    >
                                        Search PGs
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(UserData) && (
                            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-indigo-600 p-3 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-white">My Profile</h3>
                                        <p className="text-gray-400 mt-1">View and update your personal information</p>
                                    </div>
                                </div>
                                <button 
                                    className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
                                    onClick={() => navigate('/UserViewProfile',{state:{ userData: UserData }})}
                                >
                                    View Profile
                                </button>
                            </div>)}
                            
                            {(UserData) && (
                            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-purple-600 p-3 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-white">My Bookings</h3>
                                        <p className="text-gray-400 mt-1">View all your current and past bookings</p>
                                    </div>
                                </div>
                                <button 
                                    className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
                                    onClick={() => navigate('/UserBookings')}
                                >
                                    View Bookings
                                </button>
                            </div>)}    
                        </div>
                    </div>

                    {/* Sidebar Section */}
                    <div className="space-y-6">
                        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-semibold border-b border-gray-700 pb-3">Quick Links</h3>
                            <div className="mt-4 space-y-3">
                                <button 
                                    className="flex items-center w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200"
                                    onClick={() => navigate('/FAQs')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                    FAQ's
                                </button>
                                <button 
                                    className="flex items-center w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200"
                                    onClick={() => navigate('/Aboutus')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                    About Us
                                </button>
                                <button 
                                    className="flex items-center w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200"
                                    onClick={() => navigate('/Contactus')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    Contact Us
                                </button>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-semibold text-white">Need Help?</h3>
                            <p className="mt-2 text-indigo-200">Our support team is available 24/7 to assist you with any queries.</p>
                            <button 
                                className="mt-4 w-full bg-white hover:bg-gray-100 text-indigo-900 font-medium px-4 py-2 rounded-lg transition-all duration-200"
                                onClick={() => navigate('/Contactus')}
                            >
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 py-6 px-4 w-full">
                <div className="container mx-auto text-center text-gray-400 text-sm">
                    <p>© {new Date().getFullYear()} BeMyPG. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default OwnerHomePage;
