import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PgListPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pgData } = location.state || {};
    const [searchTerm, setSearchTerm] = useState('');
    const [priceFilter, setPriceFilter] = useState('all');
    const [genderFilter, setGenderFilter] = useState('all');
    
    console.log("datatatat",pgData);

    const handlePgClick = (pg) => {
        navigate('/PgDetailPage', { state: { pg } });
    };

    // Filter PGs based on search term and filters
    const filteredPGs = pgData ? pgData.filter(pg => {
        const matchesSearch = pg.PGname.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            pg.City.toLowerCase().includes(searchTerm.toLowerCase());
        // console.log("pff",typeof(parseInt(priceFilter)), typeof(pg.PriceRange) )
        const matchesPrice = priceFilter === 'all' || pg.PriceRange === parseInt(priceFilter);
        
        const matchesGender = genderFilter === 'all' || pg.Gender === genderFilter;
        
        return matchesSearch && matchesPrice && matchesGender;
    }) : [];

    // Extract unique price ranges and genders for filters
    const priceRanges = pgData ? [...new Set(pgData.map(pg => pg.PriceRange))] : [];
    const genders = pgData ? [...new Set(pgData.map(pg => pg.Gender))] : [];

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            {/* Header Section */}
            <div className="relative bg-cover bg-center h-48" 
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1920&q=80")' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-black/60"></div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
                        Available PGs in {pgData && pgData.length > 0 ? pgData[0]?.City : 'the City'}
                    </h1>
                    <p className="text-gray-300 mt-2">Find your perfect accommodation</p>
                </div>
            </div>
            
            {/* Search and Filter Section */}
            <div className="container mx-auto px-4 py-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Search PGs by name or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <svg className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        
                        {/* Price Filter */}
                        <div className="md:w-48">
                            <select
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(e.target.value)}
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="all">All Prices</option>
                                {priceRanges.map((price, index) => (
                                    <option key={index} value={price}>{price}</option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Gender Filter */}
                        <div className="md:w-48">
                            <select
                                value={genderFilter}
                                onChange={(e) => setGenderFilter(e.target.value)}
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="all">All Genders</option>
                                {genders.map((gender, index) => (
                                    <option key={index} value={gender}>{gender}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                
                {/* Results Count */}
                <div className="mb-6 flex justify-between items-center">
                    <p className="text-gray-400">
                        Showing <span className="text-white font-semibold">{filteredPGs.length}</span> results
                        {searchTerm && <span> for "<span className="text-purple-400">{searchTerm}</span>"</span>}
                    </p>
                    
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Cities
                    </button>
                </div>
                
                {/* PG Cards */}
                {filteredPGs.length > 0 ? (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredPGs.map((pg, index) => (
                            <div
                                key={index}
                                onClick={() => handlePgClick(pg)}
                                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all hover:translate-y-[-5px] duration-300 cursor-pointer"
                            >
                                {/* Image Section */}
                                <div className="relative h-48 overflow-hidden">
                                    {pg.Images && pg.Images.length > 0 ? (
                                        <img
                                            src={pg.Images[0]}
                                            alt={`${pg.PGname} Image`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-r from-purple-700 to-indigo-800 flex items-center justify-center">
                                            <span className="text-white text-lg font-medium">No Image Available</span>
                                        </div>
                                    )}
                                    <div className="absolute top-0 right-0 m-2 px-2 py-1 bg-purple-600 text-white text-sm font-semibold rounded">
                                        {pg.Gender}
                                    </div>
                                </div>
                                
                                {/* Content Section */}
                                <div className="p-5">
                                    <h3 className="text-xl font-semibold text-white mb-2 truncate">{pg.PGname}</h3>
                                    
                                    <div className="flex items-center text-gray-400 mb-2">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{pg.City}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center text-gray-400">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                            <span>{pg.PriceRange}</span>
                                        </div>
                                        
                                        <div className="flex items-center text-gray-400">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <span>{pg.PhNumber}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4">
                                        <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2 rounded-lg font-medium transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-800/50 rounded-xl p-8 text-center">
                        <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xl text-gray-400">No PGs available with the current filters.</p>
                        <button 
                            onClick={() => {
                                setSearchTerm('');
                                setPriceFilter('all');
                                setGenderFilter('all');
                            }}
                            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Clear Filters
                        </button>
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

export default PgListPage;