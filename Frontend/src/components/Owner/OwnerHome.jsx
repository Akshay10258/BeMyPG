import React from 'react';
import { useNavigate } from 'react-router-dom';
import pgimage from '../../assets/images/WhatsApp2.jpeg';

const OwnerHomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-blue-900 via-black to-blue-900 py-6 shadow-lg">
                <div className="container mx-auto flex items-center justify-between px-6">
                    <h1
                        className="p-2 gradient-text-animation2 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        BeMyPG
                    </h1>
                    <div className="space-x-6 text-lg">
                        <button className="hover:text-blue-400 transition duration-300" onClick={() => navigate('/')}>Home</button>
                        <button className="hover:text-blue-400 transition duration-300" onClick={() => navigate('/OwnerProfile')}>My Profile</button>
                        <button className="hover:text-blue-400 transition duration-300" onClick={() => navigate('/OwnerPGBookingDetails')}>My Bookings</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative h-[30rem]">
                <img
                    src={pgimage}
                    alt="Abstract PG"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center">
                    <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-700">
                        Welcome to the Owner Dashboard
                    </h2>
                    <p className="text-xl text-gray-300">Manage your PG listings and customer interactions seamlessly.</p>
                </div>
            </header>

            {/* Dashboard Buttons */}
            <main className="container mx-auto py-12 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Add Your PG Button */}
                <div
                    className="p-6 bg-gradient-to-b from-gray-900 to-blue-800 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => navigate('/AddNewPgOwner')}
                >
                    <h3 className="text-2xl font-bold mb-4 text-center text-blue-400">Add Your PG</h3>
                    <p className="text-center text-gray-300">
                        Start listing your PG and manage its details effortlessly.
                    </p>
                </div>

                {/* Add/Update Room Button */}
                <div
                    className="p-6 bg-gradient-to-b from-gray-900 to-blue-800 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => navigate('/AddRoomOwner')}
                >
                    <h3 className="text-2xl font-bold mb-4 text-center text-blue-400">Add/Update Room</h3>
                    <p className="text-center text-gray-300">
                        Update room availability and pricing details.
                    </p>
                </div>

                {/* View PG Details Button */}
                <div
                    className="p-6 bg-gradient-to-b from-gray-900 to-blue-800 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => navigate('/Owner/ViewPgDetails')}
                >
                    <h3 className="text-2xl font-bold mb-4 text-center text-blue-400">View PG Details</h3>
                    <p className="text-center text-gray-300">
                        Review and manage all your listed PGs.
                    </p>
                </div>

                {/* View My Profile Button */}
                <div
                    className="p-6 bg-gradient-to-b from-gray-900 to-blue-800 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => navigate('/OwnerProfile')}
                >
                    <h3 className="text-2xl font-bold mb-4 text-center text-blue-400">View My Profile</h3>
                    <p className="text-center text-gray-300">
                        Manage your personal details and preferences.
                    </p>
                </div>

                {/* Scheduled Visits Button */}
                <div
                    className="p-6 bg-gradient-to-b from-gray-900 to-blue-800 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => navigate('/ScheduledVisits')}
                >
                    <h3 className="text-2xl font-bold mb-4 text-center text-blue-400">View Scheduled Visits</h3>
                    <p className="text-center text-gray-300">
                        Track all scheduled customer visits.
                    </p>
                </div>

                {/* View Customer Bookings Button */}
                <div
                    className="p-6 bg-gradient-to-b from-gray-900 to-blue-800 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => navigate('/OwnerPGBookingDetails')}
                >
                    <h3 className="text-2xl font-bold mb-4 text-center text-blue-400">View Customer Bookings</h3>
                    <p className="text-center text-gray-300">
                        Access and manage all customer bookings.
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gradient-to-t from-gray-900 to-black py-6 text-center text-gray-500">
                <p>© 2024 BeMyPG. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default OwnerHomePage;
