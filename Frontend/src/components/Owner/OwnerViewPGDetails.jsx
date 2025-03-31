import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Slider from 'react-slick';
import 'leaflet/dist/leaflet.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaPhone, FaMapMarkerAlt, FaCity, FaRupeeSign, FaUtensils, FaUserFriends } from 'react-icons/fa';
// Make sure you have the correct import
import { toast, ToastContainer } from 'react-toastify';
const server_URL = import.meta.env.VITE_server_URL;

const OwnerPGDetails = () => {
    const [pgDetails, setPgDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    const [imgPath, setImgPath] = useState({ single: '', double: '', triple: '' });

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

                const basePath = server_URL;
                if (data[0] && data[0].Rooms) {
                    const images = {
                        // single: basePath + data[0].Rooms[0]?.Images || '',
                        // double: basePath + data[0].Rooms[1]?.Images || '',
                        // triple: basePath + data[0].Rooms[2]?.Images || '',
                    };
                    setImgPath(images);
                }
            } catch (error) {
                console.error('Error fetching PG details:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPGDetails();
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

    const fetchCoordinates = async (address) => {
        const apiKey = 'pk.9d5d1b1a66d30cb2e99aa6bcb5031f7a';
        const url = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(address)}&format=json`;

        try {
            const response = await fetch(url);
            const json = await response.json();
            if (json && json.length > 0) {
                const lat = json[0].lat;
                const lon = json[0].lon;
                return { lat, lon };
            } else {
                throw new Error('No results found');
            }
        } catch (err) {
            console.error('Error fetching coordinates:', err);
            throw err;
        }
    };

    const handleShowLocation = async (pg) => {
        if (pg?.Address) {
            try {
                const coordinates = await fetchCoordinates(`${pg.Address}, ${pg.City}`);
                setCoordinates([coordinates.lat, coordinates.lon]);
                setShowMap(true);
            } catch (error) {
                console.error('Error fetching location:', error);
            }
        }
    };
    console.log(imgPath)
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-32 w-32 rounded-full bg-gray-700"></div>
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

    if (!pgDetails || pgDetails.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-6 max-w-lg">
                    <h2 className="text-2xl font-bold text-blue-300 mb-2">No Data Available</h2>
                    <p className="text-blue-200">No PG details are currently available.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                    Your PG Details
                </h1>

                {pgDetails.map((pg, index) => (
                    <div key={index} className="mb-12 overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-gray-800 to-gray-900">
                        <div className="p-6 md:p-8">
                            {/* Header */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                                <h2 className="text-3xl font-bold mb-4 md:mb-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                    {pg.PGname}
                                </h2>
                                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-indigo-900/50 border border-indigo-700 text-indigo-300">
                                    For {pg.Gender}
                                </span>
                            </div>

                            {/* Main Content */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column - PG Info */}
                                <div className="space-y-6">
                                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-md">
                                        <h3 className="text-xl font-semibold mb-4 text-blue-300">Contact Information</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-900/30 mr-4">
                                                    <FaPhone className="text-blue-400" />
                                                </div>
                                                <span>{pg.PhNumber}</span>
                                            </div>
                                            
                                            <div className="flex items-center">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-900/30 mr-4">
                                                    <FaMapMarkerAlt className="text-green-400" />
                                                </div>
                                                <span>{pg.Address}</span>
                                            </div>
                                            
                                            <div className="flex items-center">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-900/30 mr-4">
                                                    <FaCity className="text-purple-400" />
                                                </div>
                                                <span>{pg.City}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-md">
                                        <h3 className="text-xl font-semibold mb-4 text-amber-300">Pricing & Amenities</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-900/30 mr-4">
                                                    <FaRupeeSign className="text-amber-400" />
                                                </div>
                                                <span>Price Range: ₹{pg.PriceRange}</span>
                                            </div>
                                            
                                            <div className="flex items-center">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-pink-900/30 mr-4">
                                                    <FaUtensils className="text-pink-400" />
                                                </div>
                                                <span>Food Menu: {pg.Food}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Room Cards */}
                                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-md">
                                        <h3 className="text-xl font-semibold mb-4 text-emerald-300">Available Rooms</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {pg.Rooms.map((room, roomIndex) => (
                                                <div 
                                                    key={roomIndex} 
                                                    className="relative overflow-hidden rounded-lg p-4 bg-gradient-to-br from-gray-700/50 to-gray-800/50 border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/20 hover:border-emerald-800/50"
                                                >
                                                    <div className="flex items-center mb-3">
                                                        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-emerald-900/30 mr-3">
                                                            <FaUserFriends className="text-emerald-400" size={14} />
                                                        </div>
                                                        <h4 className="font-medium text-emerald-200">{room.RoomType}</h4>
                                                    </div>
                                                    
                                                    <div className="space-y-2 pl-11">
                                                        <p className="text-sm">
                                                            <span className="text-gray-400">Price:</span> 
                                                            <span className="ml-2 text-emerald-300 font-medium">₹{room.RoomPrice}</span>
                                                        </p>
                                                        <p className="text-sm">
                                                            <span className="text-gray-400">Vacant:</span> 
                                                            <span className="ml-2 text-white font-medium">{room.VacantRooms}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Location Button */}
                                    <button
                                        onClick={() => handleShowLocation(pg)}
                                        className="w-full py-3 rounded-xl font-medium shadow-lg transition-all duration-300 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 focus:ring-4 focus:ring-blue-800 focus:outline-none"
                                    >
                                        Show Location on Map
                                    </button>
                                </div>

                                {/* Right Column - Images & Map */}
                                <div className="space-y-6">
                                    {/* Image Slider */}
                                    <div className="bg-gray-800/30 overflow-hidden rounded-xl shadow-lg">
                                        <Slider {...sliderSettings} className="pg-slider">
                                            <div className="relative">
                                                {imgPath.single ? (
                                                    <img
                                                        src={imgPath.single}
                                                        alt="Single Occupancy"
                                                        className="w-full h-80 object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-80 bg-gray-800 flex flex-col items-center justify-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <p className="text-gray-400 font-medium">Image Not Available</p>
                                                    </div>
                                                )}
                                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                                                    <p className="text-white font-medium">Single Occupancy</p>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                {imgPath.double ? (
                                                    <img
                                                        src={imgPath.double}
                                                        alt="Double Occupancy"
                                                        className="w-full h-80 object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-80 bg-gray-800 flex flex-col items-center justify-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <p className="text-gray-400 font-medium">Image Not Available</p>
                                                    </div>
                                                )}
                                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                                                    <p className="text-white font-medium">Double Occupancy</p>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                {imgPath.triple ? (
                                                    <img
                                                        src={imgPath.triple}
                                                        alt="Triple Occupancy"
                                                        className="w-full h-80 object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-80 bg-gray-800 flex flex-col items-center justify-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <p className="text-gray-400 font-medium">Image Not Available</p>
                                                    </div>
                                                )}
                                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                                                    <p className="text-white font-medium">Triple Occupancy</p>
                                                </div>
                                            </div>
                                        </Slider>
                                    </div>

                                    {/* Map Section */}
                                    {showMap && coordinates ? (
                                        <div className="rounded-xl overflow-hidden shadow-lg h-80 bg-gray-800/30 border border-gray-700">
                                            <MapContainer center={coordinates} zoom={15} style={{ width: '100%', height: '100%' }}>
                                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                                <Marker position={coordinates}>
                                                    <Popup>{pg.PGname}</Popup>
                                                </Marker>
                                            </MapContainer>
                                        </div>
                                    ) : (
                                        <div className="rounded-xl flex items-center justify-center h-80 bg-gray-800/30 border border-gray-700">
                                            <div className="text-center p-6">
                                                <FaMapMarkerAlt size={48} className="mx-auto mb-4 text-gray-600" />
                                                <p className="text-gray-400">Click "Show Location" to view the PG on map</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Custom CSS for slider */}
            <style jsx global>{`
                .pg-slider .slick-prev,
                .pg-slider .slick-next {
                    z-index: 10;
                    width: 40px;
                    height: 40px;
                    background: rgba(30, 41, 59, 0.7);
                    border-radius: 50%;
                    transition: all 0.2s ease;
                }
                
                .pg-slider .slick-prev {
                    left: 16px;
                }
                
                .pg-slider .slick-next {
                    right: 16px;
                }
                
                .pg-slider .slick-prev:hover,
                .pg-slider .slick-next:hover {
                    background: rgba(30, 41, 59, 0.9);
                }
                
                .pg-slider .slick-dots {
                    bottom: 16px;
                }
                
                .pg-slider .slick-dots li button:before {
                    color: white;
                    opacity: 0.5;
                }
                
                .pg-slider .slick-dots li.slick-active button:before {
                    opacity: 1;
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default OwnerPGDetails;