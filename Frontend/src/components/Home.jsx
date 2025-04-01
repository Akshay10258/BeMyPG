import React from 'react';
import { useNavigate } from 'react-router-dom';
import pgimage from './../assets/images/WhatsApp4.jpeg';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Left side content - Full width on mobile */}
            <div className="w-full md:w-1/2 bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center p-6 md:p-8 lg:p-12 h-screen">
                <h1 className="p-2 md:p-3 text-5xl md:text-5xl lg:text-6xl font-extrabold mb-6 md:mb-8 gradient-text-animation tracking-tight font-inter">
                    BeMyPG
                </h1>

                <p className="text-white text-xl md:text-xl mb-8 md:mb-10 font-light tracking-wide">
                    How do you describe yourself?
                </p>

                <div className="w-full max-w-xs md:max-w-sm">
                    <button 
                        type="button" 
                        className="w-full bg-blue-600 text-white p-3.5 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 mb-4 md:mb-5 text-base md:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        onClick={() => navigate('/UserSignup')}>
                        User
                    </button>
                    <button 
                        type="button" 
                        className="w-full bg-cyan-500 text-white p-3.5 rounded-xl font-medium hover:bg-cyan-600 transition-all duration-300 text-base md:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        onClick={() => navigate('/OwnerSignUp')}>
                        Owner
                    </button>
                </div>
                
                <div className="mt-10 text-gray-400 text-sm font-light">
                    Find your perfect PG accommodation
                </div>
            </div>

            {/* Right side image - Hidden on mobile */}
            <div className="hidden md:block md:w-1/2 h-screen">
                <img 
                    src={pgimage}
                    alt="Paying Guest Accommodation" 
                    className="w-full h-full object-cover" 
                />
            </div>
        </div>
    );
};

export default HomePage;