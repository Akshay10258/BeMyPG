import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import pgimage from '../../assets/images/WhatsApp2.jpeg';
const server_URL = import.meta.env.VITE_server_URL;

const OwnerHomePage = () => {
    const navigate = useNavigate();
    const [OwnerData, setOwnerData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // Fetch User profile and PG details from the backend
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${server_URL}/OwnerProfile`,
                    {
                        method: "GET",
                        credentials: "include"
                    });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setOwnerData(data);
                console.log("hook data", data);
            } catch (err) {
                console.log(err.message);
            } finally {
                setIsLoading(false);
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
            
            if (response.ok) {
                const reply = await response.json();
                console.log(reply);
                navigate('/');
            } else {
                const data = await response.json();
                console.error("Logout failed:", data.message);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    // Card data to make the component more maintainable
    const dashboardCards = [
        {
            title: "Add Your PG",
            description: "Start listing your PG and manage its details effortlessly.",
            path: "/AddNewPgOwner",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 mx-auto text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        },
        {
            title: "Add/Update Room",
            description: "Update room availability and pricing details.",
            path: "/AddRoomOwner",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 mx-auto text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            )
        },
        {
            title: "View PG Details",
            description: "Review and manage all your listed PGs.",
            path: "/Owner/ViewPgDetails",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 mx-auto text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            )
        },
        {
            title: "View My Profile",
            description: "Manage your personal details and preferences.",
            path: "/OwnerProfile",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 mx-auto text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            title: "View Scheduled Visits",
            description: "Track all scheduled customer visits.",
            path: "/ScheduledVisits",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 mx-auto text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: "View Customer Bookings",
            description: "Access and manage all customer bookings.",
            path: "/OwnerPGBookingDetails",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 mx-auto text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            )
        }
    ];
    
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-blue-900 via-black to-blue-900 py-4 md:py-6 shadow-lg sticky top-0 z-50">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-6">
                    <h1
                        className=" gradient-text-animation2 p-2 text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 cursor-pointer mb-4 md:mb-0"
                        onClick={() => navigate('/')}
                    >
                        BeMyPG
                    </h1>
                    <div className="flex space-x-2">
                        <button 
                            className="bg-indigo-700 hover:bg-indigo-800 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg transition-all duration-200 flex items-center text-xl shadow-lg"
                            onClick={() => navigate('/OwnerProfile',{state:{ ownerData: OwnerData }})}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            Profile
                        </button>
                        <button 
                            className="bg-indigo-700 hover:bg-indigo-800 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg transition-all duration-200 flex items-center text-xl shadow-lg"
                            onClick={handleLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                                />
                            </svg>
                            {OwnerData ? "Log-Out" : "Log-In"}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative h-48 sm:h-64 md:h-80 lg:h-96">
                <img
                    src={pgimage}
                    alt="Abstract PG"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center p-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-700 text-center">
                        Welcome to the Owner Dashboard
                    </h2>
                    <p className="text-sm sm:text-base md:text-xl text-gray-300 text-center">
                        Manage your PG listings and customer interactions seamlessly.
                    </p>
                </div>
            </header>

            {/* Dashboard Buttons */}
            {isLoading ? (
                <div className="flex-grow container mx-auto py-12 px-6 flex justify-center items-center">
                    <div className="animate-pulse">
                        <div className="h-8 w-64 bg-gray-700 rounded-md mb-4"></div>
                        <div className="h-40 w-80 bg-gray-800 rounded-lg"></div>
                    </div>
                </div>
            ) : OwnerData ? (
                <main className="flex-grow container mx-auto py-8 md:py-12 px-4 md:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                        {dashboardCards.map((card, index) => (
                            <div
                                key={index}
                                className="p-6 bg-gradient-to-b from-gray-800 to-blue-900 rounded-lg shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-700 flex flex-col items-center"
                                onClick={() => navigate(card.path)}
                            >
                                {card.icon}
                                <h3 className="text-xl md:text-2xl font-bold mb-3 text-center text-blue-400">{card.title}</h3>
                                <p className="text-center text-gray-300 text-sm md:text-base">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </main>
            ) : (
                <div className="flex-grow container mx-auto py-12 px-6 flex justify-center items-center">
                    <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700 max-w-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">Please Log In</h2>
                        <p className="mb-6 text-gray-300">You need to be logged in to access the owner dashboard.</p>
                        <button 
                            className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg"
                            onClick={() => navigate('/')}
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-gradient-to-t from-black to-gray-900 py-6 text-center text-gray-400 mt-auto">
                <div className="container mx-auto px-4">
                    <p>© 2024 BeMyPG. All Rights Reserved.</p>
                    
                </div>
            </footer>
        </div>
    );
};

export default OwnerHomePage;