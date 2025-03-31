import React, { useState ,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const server_URL = import.meta.env.VITE_server_URL;

const PgReview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pg } = location.state || {};
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    
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
                setUserData(data);
                console.log(data)
            } catch (err) {
                consle.log(err.message);
            }
        };

        fetchData();
    }, []);
    if (!pg) {
        return (
            <div className="bg-gray-900 min-h-screen flex items-center justify-center text-gray-200">
                <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
                    <p className="text-xl">No PG details found.</p>
                    <button 
                        onClick={() => navigate(-1)}
                        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Handle star click event
    const handleStarClick = (value) => setRating(value);

    // Handle hover event on stars
    const handleStarHover = (value) => setHoverRating(value);

    // Reset hover effect when leaving the star
    const handleStarHoverLeave = () => setHoverRating(0);

    // Submit the review and rating as an object
    const onSubmit = async (data) => {
        const reviewData = {
            pg_id: pg._id,
            ratings: rating,
            feedback: review,
            userName: UserData.user.name,
        };
        
        try {
            const result = await fetch(`${server_URL}/rating/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(reviewData)
            });
            
            const res = await result.text();
            console.log("res", res);
            
            // Reset form fields after submission
            setReview('');
            setRating(0);
            
            // Navigate back to the previous page
            navigate(-1);
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };
        
    return (
        <div className="bg-gray-900 min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header with subtle gradient background */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg mb-6">
                    <h2 className="text-3xl font-bold text-center text-white">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
                            {pg.PGname}
                        </span>
                    </h2>
                    <p className="text-center text-gray-400 mt-2">Share your experience</p>
                </div>
                
                {/* PG Info Card */}
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* PG Image */}
                        {pg.Images && pg.Images.length > 0 && (
                            <div className="md:w-1/3">
                                <div className="relative h-52 w-full overflow-hidden rounded-lg">
                                    <img
                                        src={pg.Images[0]}
                                        alt={`${pg.PGname}`}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                </div>
                            </div>
                        )}
                        
                        {/* PG Details */}
                        <div className="md:w-2/3">
                            <h3 className="text-xl font-semibold text-white mb-4">PG Details</h3>
                            <div className="space-y-3 text-gray-300">
                                <div className="flex items-center">
                                    <span className="text-indigo-400 font-medium w-28">Location:</span>
                                    <span>{pg.City}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-indigo-400 font-medium w-28">Price Range:</span>
                                    <span>₹{pg.PriceRange}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-indigo-400 font-medium w-28">Contact:</span>
                                    <span>{pg.PhNumber}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Review Form Card */}
                <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                    <h3 className="text-2xl font-semibold mb-6 text-white">
                        <span className="border-b-2 border-indigo-500 pb-1">Your Review</span>
                    </h3>
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Rating section */}
                        <div className="mb-6">
                            <label className="block text-gray-300 font-medium mb-3">How would you rate your experience?</label>
                            <div className="flex space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        size={30}
                                        className={`cursor-pointer transition-colors duration-200 ${ 
                                            (hoverRating || rating) >= star 
                                                ? 'text-yellow-400' 
                                                : 'text-gray-600 hover:text-gray-500' 
                                        }`}
                                        onClick={() => handleStarClick(star)}
                                        onMouseEnter={() => handleStarHover(star)}
                                        onMouseLeave={handleStarHoverLeave}
                                    />
                                ))}
                                <span className="ml-2 text-gray-400">
                                    {rating ? `${rating} out of 5` : 'Select a rating'}
                                </span>
                            </div>
                        </div>
                        
                        {/* Review text area */}
                        <div className="mb-6">
                            <label className="block text-gray-300 font-medium mb-2">
                                Share your thoughts about this PG
                            </label>
                            <textarea
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                rows="5"
                                className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200 placeholder-gray-500"
                                placeholder="Tell others about your experience..."
                            ></textarea>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <button
                                type="submit"
                                disabled={!rating}
                                className={`px-6 py-3 rounded-lg font-medium transition duration-300 ${
                                    rating 
                                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                Submit Review
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PgReview;