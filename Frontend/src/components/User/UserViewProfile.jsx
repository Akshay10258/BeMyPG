import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const server_URL=import.meta.env.VITE_server_URL;
const UserProfile = () => {
    const [UserData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const { userData } = location.state || {};

    useEffect(()=>{
        setUserData(userData);
    },[]);
    console.log("ddd",userData);
    // useEffect(() => {
    //     // Fetch User profile and PG details from the backend
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`${server_URL}/UserProfile`,
    //                 {method: "GET",
    //                 credentials:"include"}); // Adjust API endpoint as needed
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch data');
    //             }
    //             const data = await response.json();
    //             setUserData(data);
    //             console.log(data)
    //             setLoading(false);
    //         } catch (err) {
    //             setError(err.message);
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;

    return (
        <div className="h-screen p-8 bg-repeat" style={{ backgroundImage: 'url("https://i0.wp.com/picjumbo.com/wp-content/uploads/abstract-image-glass-city-skyscrapers-free-photo.jpeg?w=600&quality=80")' }}>

            <h1 className="text-5xl font-bold text-center text-white mb-4">User Profile</h1>


           {/* User Profile Section */}
            {UserData ? (
                <div className="bg-gray-300 shadow-md rounded-lg p-6 mb-10">
                    <h2 className="text-5xl font-semibold mb-10">User Information</h2>
                    <p className="text-black text-2xl mb-5"><strong>Name:</strong> {UserData.user.name}</p>
                    <p className="text-black text-2xl"><strong>Email:</strong> {UserData.user.email}</p>
                    {/* <p className="text-gray-600"><strong>Phone:</strong> {UserData.User.phone}</p> */}
                </div>
            ) : (
                <div className="bg-gray-200 shadow-md rounded-lg p-6 mb-10 text-center">
                    <h2 className="text-3xl font-semibold mb-4">User Profile</h2>
                    <p className="text-gray-700 text-xl mb-4">Please login to view your profile information.</p>
                    <button onClick={()=>{navigate('/UserLogin')}} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg">
                        Login
                    </button>
                </div>
            )}
</div>);
                
        {/* //             PG Details Section
        //             <div className="space-y-8">
        //                 <h2 className="text-xl font-semibold text-gray-700 mb-4">PGs Added by User</h2>
        //                 {UserData.pgDetails.map((pg, index) => (
        //                     <div key={index} className="bg-white shadow-md rounded-lg p-6">
        //                         <h3 className="text-lg font-semibold text-gray-800 mb-2">{pg.PGname}</h3>
        //                         <p className="text-gray-600"><strong>Address:</strong> {pg.Address}</p>
        //                         <p className="text-gray-600"><strong>City:</strong> {pg.City}</p>
        //                         <p className="text-gray-600"><strong>Phone Number:</strong> {pg.PhNumber}</p>
        //                         <p className="text-gray-600"><strong>Price Range:</strong> ₹{pg.PriceRange}</p>
        //                     </div>
        //                 ))}
        //             </div>
        //         </>
        //     )}
        // </div> */}
    
};

export default UserProfile;
