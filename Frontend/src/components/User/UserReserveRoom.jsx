import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
const server_URL = import.meta.env.VITE_server_URL;

const BookingForm = ({ onBookingSuccess }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pg } = location.state || {};

    const [formData, setFormData] = useState({
        user: "",
        email: "",
        bookingDate: "",
        roomBooked: "",
        bookingStatus: "pending",
        pg_id: pg?._id,
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${server_URL}/UserProfile`, {
                    method: "GET",
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                setFormData((prevData) => ({
                    ...prevData,
                    user: data.user?.Userid || "",
                    email: data.user?.email || "",
                }));
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const bookingData = {
                ...formData,
                bookingDate: new Date(formData.bookingDate),
            };

            const response = await fetch(`${server_URL}/BookPg`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                throw new Error("Failed to book PG. Please try again.");
            }

            const result = await response.json();
            navigate('/PaymentOptions', { state: { pg } })
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white pb-12 flex items-center justify-center p-4">
            <div className="w-full h-[70vh] max-w-md bg-gray-800 rounded-xl shadow-xl p-6 border-2">
                <h2 className="text-2xl font-bold mb-6 text-white text-center">Reserve Your PG</h2>
                
                {error && (
                    <div className="bg-red-900/60 border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="hidden" name="user" value={formData.user} />

                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            readOnly
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-gray-300"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            Desired Move-in Date
                        </label>
                        <input
                            type="date"
                            name="bookingDate"
                            value={formData.bookingDate}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            Occupancy Type
                        </label>
                        <select 
                            name="roomBooked"
                            value={formData.roomBooked}
                            onChange={handleChange} 
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white" 
                            required
                        >
                            <option value="">-- Choose occupancy type --</option>
                            <option value="single occupancy">Single Occupancy</option>
                            <option value="double occupancy">Double Occupancy</option>
                            <option value="triple occupancy">Triple Occupancy</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 mt-6"
                    >
                        {loading ? "Processing..." : "Book Now"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;