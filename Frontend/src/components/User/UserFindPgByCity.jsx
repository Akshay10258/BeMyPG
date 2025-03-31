import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const server_URL = import.meta.env.VITE_server_URL;

const CitySelection = () => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // City images mapping - add more as needed
    const cityImages = {
        "Mumbai": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
        "Delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
        "Bangalore": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
        "Hyderabad": "https://images.unsplash.com/photo-1588416499018-d8c621fce7c5?auto=format&fit=crop&w=800&q=80",
        "Chennai": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "Kolkata": "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80",
        "Pune": "https://images.unsplash.com/photo-1625125909839-eb9a71acaacd?auto=format&fit=crop&w=800&q=80",
        "Ahmedabad": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    };

    // Default image for cities not in the list
    const defaultCityImage = "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80";

    useEffect(() => {
        // Fetch cities from the backend
        const fetchCities = async () => {
            try {
                const response = await fetch(`${server_URL}/UserFindPgByCity/`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch cities');
                }
                const data = await response.json();
                console.log("data", data);
                setCities(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCities();
    }, []);

    const onCitySelect = async (city) => {
        console.log(city);

        try {
            const result = await fetch(`${server_URL}/GetPgByCity`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ city }),
                credentials: "include",
            });
            if (!result.ok) {
                throw new Error('Failed to fetch pgs');
            }
            const data = await result.json();
            console.log("data", data);

            navigate('/UserPgList', { state: { pgData: data } });
        } catch (error) {
            console.error("Error fetching PGs:", error);
            // You could set an error state here to display to the user
        }
    };

    const filteredCities = cities.filter(city => 
        city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-red-900/50 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl text-red-400 font-semibold">Error</h2>
                <p className="text-white">{error}</p>
                <button 
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Hero Section */}
            <div className="relative bg-cover bg-center h-64 md:h-80" 
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1920&q=80")' }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2">Find Your Perfect PG</h1>
                    <p className="text-lg md:text-xl text-gray-300 text-center mb-6">Select a city to explore available accommodations</p>
                    
                    {/* Search Bar */}
                    <div className="w-full max-w-md mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search for a city..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-800/80 backdrop-blur-sm text-white border border-gray-700 rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <svg className="w-5 h-5 absolute right-4 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>
            
            {/* Cities Grid */}
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-2xl font-semibold mb-8 text-center">Popular Cities</h2>
                
                {filteredCities.length === 0 ? (
                    <div className="text-center text-gray-400 py-16">
                        <p className="text-xl">No cities found matching "{searchTerm}"</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredCities.map((city, index) => (
                            <div
                                key={index}
                                onClick={() => onCitySelect(city)}
                                className="group cursor-pointer overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-purple-500/20 hover:translate-y-[-5px]"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                                    <img 
                                        src={cityImages[city] || defaultCityImage} 
                                        alt={`${city} city`} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <h2 className="absolute bottom-4 left-4 z-20 text-2xl font-bold text-white">{city}</h2>
                                </div>
                                <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-900">
                                    <p className="text-gray-400 text-sm">Find the best PGs in</p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-purple-400 font-medium">Explore Options</span>
                                        <svg className="w-5 h-5 text-purple-400 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Footer */}
            <footer className="bg-gray-950 py-6 mt-12">
                <div className="container mx-auto px-4 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} PG Finder. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default CitySelection;