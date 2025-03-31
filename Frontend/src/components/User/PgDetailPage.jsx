import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const server_URL = import.meta.env.VITE_server_URL;

const PgDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pg } = location.state || {};

    const [showMap, setShowMap] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [amenities, setAmenities] = useState([
        { name: 'Wi-Fi', available: true },
        { name: 'AC', available: pg?.AC === 'yes' },
        { name: 'Parking', available: pg?.Parking === 'yes' },
        { name: 'Food', available: pg?.Food !== 'No' },
        { name: 'Laundry', available: true },
        { name: 'Security', available: true },
    ]);
    let totalNumberOfRatings=pg.Review.length;
    console.log(pg?.Address);
    console.log(pg.Feedback);

    const [showModal, setShowModal] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: '',
        phone: '',
        visitDate: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [averageRating, setAverageRating] = useState(0);

    if (!pg) return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-xl shadow-xl text-center">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xl text-gray-400">No details available for this PG.</p>
                <button 
                    onClick={() => navigate(-1)}
                    className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                    Go Back
                </button>
            </div>
        </div>
    );

    const handleNavigateToReview = (pg) => {
        navigate('/RatingMain', { state: { pg } });
    };

    const handleNavigateToBook = (pg) => {
        navigate('/UserReserveRoom', { state: { pg } });
    };

    const handleSchedule = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setErrorMessage('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Function to navigate between images
    const handleImageNavigation = (direction) => {
        if (!pg.Images || pg.Images.length <= 1) return;
        
        if (direction === 'next') {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === pg.Images.length - 1 ? 0 : prevIndex + 1
            );
        } else {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === 0 ? pg.Images.length - 1 : prevIndex - 1
            );
        }
    };

    // Function to fetch coordinates from LocationIQ API
    const fetchCoordinates = async (address) => {
        setLoading(true);
        const apiKey = 'pk.9d5d1b1a66d30cb2e99aa6bcb5031f7a'; // Replace with your actual LocationIQ API key
        const url = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(address)}&format=json`;

        try {
            const response = await fetch(url);
            const json = await response.json();
            if (json && json.length > 0) {
                const lat = parseFloat(json[0].lat);
                const lon = parseFloat(json[0].lon);
                console.log(`Coordinates: Latitude = ${lat}, Longitude = ${lon}`);
                setLoading(false);
                return { lat, lon };
            } else {
                throw new Error('No results found');
            }
        } catch (err) {
            console.error('Error fetching coordinates:', err);
            setLoading(false);
            throw err;
        }
    };

    // Handle showing the map after fetching coordinates
    const handleShowLocation = async (pg) => {
        if (pg?.Address) {
            try {
                const coords = await fetchCoordinates(`${pg.Address}, ${pg.City}`);
                setCoordinates([coords.lat, coords.lon]);
                setShowMap(true);
            } catch (error) {
                console.error('Error fetching location:', error);
            }
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileResponse = await fetch(`${server_URL}/UserProfile`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!profileResponse.ok) {
                    throw new Error('Failed to fetch user profile');
                }

                const profileData = await profileResponse.json();
                setUserEmail(profileData.user.email);

                
                // Calculate average rating from pg.Review array if it exists
                if (pg.Review && pg.Review.length > 0) {
                    const totalRatings = pg.Review.length;
                    const sumOfRatings = pg.Review.reduce((sum, review) => sum + review.rating, 0);
                    const average = totalRatings > 0 ? sumOfRatings / totalRatings : 0;
                    setAverageRating(average);
                }
                // console.log("rrr",totalRatings)
            } catch (err) {
                setErrorMessage(err.message);
            }
        };
        fetchData();
    }, [pg.Review]);

    const renderStars = (rating) => {
        return (
            <div className="flex text-xl">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`${star <= rating ? 'text-yellow-400' : 'text-gray-500'}`}>
                        {star <= rating ? '★' : (star - 0.5 <= rating ? '★' : '☆')}
                    </span>
                ))}
            </div>
        );
    };

    const handleSubmitSchedule = async () => {
        const { name, phone, visitDate } = userDetails;
        if (!name || !phone || !visitDate) {
            setErrorMessage('All fields are required.');
            return;
        }
        
        try {
            const response = await fetch(`${server_URL}/ScheduleVisit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    userId: pg.user, 
                    email: userEmail,
                    name,
                    phone,
                    visitDate,
                    pgId: pg._id, 
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to schedule the visit.');
            }

            const data = await response.json();
            setShowModal(false);
            // Show success notification
            alert('Visit scheduled successfully!');
        } catch (err) {
            setErrorMessage('Error: ' + err.message);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white pb-12">
            {/* Back navigation */}
            <div className="container mx-auto px-4 pt-6">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-4"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to PG List
                </button>
            </div>
            
            {/* Hero section with image carousel */}
            <div className="relative w-full h-80 md:h-96 overflow-hidden bg-gray-800">
                {pg.Images && pg.Images.length > 0 ? (
                    <>
                        <img 
                            src={pg.Images[currentImageIndex]} 
                            alt={`${pg.PGname}`} 
                            className="w-full h-full object-cover"
                        />
                        {pg.Images.length > 1 && (
                            <>
                                <button 
                                    onClick={() => handleImageNavigation('prev')}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button 
                                    onClick={() => handleImageNavigation('next')}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                    {pg.Images.map((_, index) => (
                                        <button 
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-purple-800 to-indigo-900 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">No Images Available</span>
                    </div>
                )}
                
                {/* PG gender badge */}
                <div className="absolute top-4 right-4 bg-purple-600 px-3 py-1 rounded-full text-white font-semibold">
                    {pg.Gender} PG
                </div>
            </div>
            
            {/* Main content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:space-x-8">
                    {/* Left column - PG details */}
                    <div className="w-full md:w-2/3">
                        <h1 className="text-3xl font-bold mb-2">{pg.PGname}</h1>
                        
                        <div className="flex items-center mb-4">
                            <div className="flex items-center">
                                {renderStars(averageRating)}
                                <span className="ml-2 text-gray-400">({averageRating.toFixed(1)})</span>
                                <span className="ml-2 text-gray-400">{totalNumberOfRatings} {totalNumberOfRatings>1?"ratings":"rating"}</span>
                            </div>
                            <span className="mx-3 text-gray-500">•</span>
                            <div className="flex items-center text-gray-400">
                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {pg.City}
                            </div>
                        </div>
                        
                        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                            <h2 className="text-xl font-semibold mb-3">PG Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 mr-2 text-purple-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    <div>
                                        <p className="text-gray-400">Price Range</p>
                                        <p className="font-semibold">{pg.PriceRange}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 mr-2 text-purple-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <div>
                                        <p className="text-gray-400">Contact</p>
                                        <p className="font-semibold">{pg.PhNumber}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 mr-2 text-purple-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <div>
                                        <p className="text-gray-400">Address</p>
                                        <p className="font-semibold">{pg.Address}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 mr-2 text-purple-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                    <div>
                                        <p className="text-gray-400">Food Menu</p>
                                        <p className="font-semibold">{pg.Food || 'Not Available'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Amenities */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {amenities.map((amenity, index) => (
                                    <div key={index} className={`flex items-center p-3 rounded-lg ${amenity.available ? 'bg-gray-800' : 'bg-gray-800/50'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${amenity.available ? 'bg-purple-600' : 'bg-gray-700'}`}>
                                            {amenity.available ? (
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className={amenity.available ? 'text-white' : 'text-gray-500'}>{amenity.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Rooms */}
                        <div className="mb-8 ">
                            <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
                            <div className="space-y-4">
                                {pg.Rooms.map((room, index) => (
                                    <div key={index} className="bg-gray-800 rounded-lg p-4 transition-all hover:bg-gray-700 border border-gray-700">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-semibold">{room.RoomType}</h3>
                                            <span className="text-xl font-bold text-purple-400">₹{room.RoomPrice}</span>
                                        </div>
                                        <div className="flex items-center mt-2 text-gray-400">
                                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                            </svg>
                                            <span>{room.VacantRooms} room{room.VacantRooms !== 1 ? 's' : ''} available</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Map */}
                        <div className="mb-8 h-100">
                            <h2 className="text-xl font-semibold mb-4">Location</h2>
                            {!showMap ? (
                                <button
                                    onClick={() => handleShowLocation(pg)}
                                    className="w-full bg-gray-800 hover:bg-gray-700 rounded-lg py-4 flex items-center justify-center transition-colors"
                                >
                                    {loading ? (
                                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500"></div>
                                    ) : (
                                        <>
                                            <svg className="w-6 h-6 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                            </svg>
                                            Show on Map
                                        </>
                                    )}
                                </button>
                            ) : coordinates ? (
                                <div className="h-[50vh] w-full rounded-lg overflow-hidden">
                                    <MapContainer center={coordinates} zoom={15} style={{ width: '100%', height: '100%' }}>
                                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                        <Marker position={coordinates}>
                                            <Popup>{pg.PGname}</Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
                            ) : (
                                <div className="bg-gray-800 rounded-lg p-4 text-center text-gray-400">
                                    Could not load map. Please try again.
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Right column - Actions */}
                    <div className="w-full md:w-1/3 mt-8 md:mt-0">
                        <div className="bg-gray-800 rounded-lg p-6 top-6">
                            <h2 className="text-xl font-semibold mb-4">Take Action</h2>
                            
                            <div className="space-y-4">
                                <button
                                    onClick={() => handleSchedule(pg)}
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Schedule Visit
                                </button>
                                
                                <button
                                    onClick={() => handleNavigateToBook(pg)}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Reserve Now
                                </button>
                                
                                <button
                                    onClick={() => handleNavigateToReview(pg)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                    Submit Review
                                </button>
                            </div>
                            
                            <div className="mt-6 bg-gray-900/50 rounded-lg p-4">
                                <h3 className="font-semibold mb-2">Contact Owner</h3>
                                <div className="flex items-center text-gray-300 mb-2">
                                    <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    {pg.PhNumber}
                                </div>
                                <a 
                                    href={`tel:${pg.PhNumber}`} 
                                    className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center mt-2"
                                >
                                    Call
                                    </a>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 top-40 mt-10">
                            {/* Add the reviews cards here */}
                            <h3 className="font-semibold mb-4">Recent Reviews</h3>
                                {pg.Feedback && pg.Feedback.length > 0 ? (
                                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                    {pg.Feedback.map((feedback, index) => (
                                    <div key={feedback._id} className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                                        <div className="flex items-center mb-2">
                                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                                            {feedback.userName ? feedback.userName.charAt(0).toUpperCase() : "U"}
                                        </div>
                                        <div className="ml-2">
                                            <h4 className="font-medium text-gray-300">
                                            {feedback.userName || `User ${index + 1}`}
                                            </h4>
                                        </div>
                                        </div>
                                        <p className="text-gray-400 text-sm">{feedback.message}</p>
                                    </div>
                                    ))}
                                </div>
                                ) : (
                                <div className="text-center py-6 text-gray-500">
                                    <svg className="w-10 h-10 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                    <p>No reviews yet</p>
                                </div>
                                )}
                        </div>
                    </div>

                </div>
            </div>
            
            {/* Modal for scheduling a visit */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl border border-gray-700 relative">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        <h3 className="text-xl font-bold mb-4 text-white">Schedule a Visit</h3>
                        
                        {errorMessage && (
                            <div className="bg-red-900/40 text-red-200 p-3 rounded-lg mb-4 text-sm">
                                {errorMessage}
                            </div>
                        )}
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-1 text-sm font-medium">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userDetails.name}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-gray-300 mb-1 text-sm font-medium">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={userDetails.phone}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                    placeholder="Enter your contact number"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-gray-300 mb-1 text-sm font-medium">Preferred Visit Date</label>
                                <input
                                    type="date"
                                    name="visitDate"
                                    value={userDetails.visitDate}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                        </div>
                        
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={handleCloseModal}
                                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitSchedule}
                                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg text-white font-medium transition-colors"
                            >
                                Schedule
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PgDetailPage;