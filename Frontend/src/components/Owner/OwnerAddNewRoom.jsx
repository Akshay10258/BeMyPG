import React from 'react'; 
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
const server_URL = import.meta.env.VITE_server_URL;

const OwnerAddPG = () => {
    const navigate = useNavigate();
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log('Submitting data:', data);
        
            const formData = new FormData();
            formData.append("occupancy", data.occupancy);
            formData.append("Roomprice", data.Roomprice);
            formData.append("VacantRooms", data.VacantRooms);

            // Now there is no image data to append

            const result = await fetch(`${server_URL}/AddNewRoom/`, 
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"}, 
                    credentials: "include",
                    body: JSON.stringify(data)
                });
    
            if (!result.ok) {
                const errorText = await result.text();
                throw new Error(`HTTP error! status: ${result.status}, message: ${errorText}`);
            }
        
            const res = await result.text();
            console.log('Success:', res);
            // Add success notification here
            alert("Added successfully !!")

            navigate("/OwnerHome")
            
        } catch (error) {
            console.error('Fetch Error:', error);
            // Add error notification here
        }
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="relative w-full max-w-lg">
                {/* Background design elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-blue-900/20 rounded-xl transform -rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-800/20 to-gray-900/20 rounded-xl transform rotate-3"></div>
                
                {/* Main card */}
                <div className="relative bg-gray-800 text-gray-100 p-10 rounded-xl shadow-2xl border border-gray-700 backdrop-blur-sm z-10">
                    <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Add New Room
                    </h2>
                    
                    {isSubmitting && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 rounded-xl z-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
                        </div>
                    )}

                    <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-1">
                            <label htmlFor="occupancy" className="text-sm font-medium text-gray-300 mb-1 block">Room Occupancy</label>
                            <select 
                                className='w-full px-4 py-4 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-colors text-gray-100 text-lg' 
                                id="occupancy" 
                                {...register("occupancy", { 
                                    required: {value: true, message: "Occupancy type is required"}
                                })}
                            >
                                <option value="">Select occupancy type</option>
                                <option value="single occupancy">Single Occupancy</option>
                                <option value="double occupancy">Double Occupancy</option>
                                <option value="triple occupancy">Triple Occupancy</option>
                            </select>
                            {errors.occupancy && <span className='text-red-400 text-sm mt-1 block'>{errors.occupancy.message}</span>}
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="roomPrice" className="text-sm font-medium text-gray-300 mb-1 block">Room Price</label>
                            <input 
                                id="roomPrice"
                                className='w-full px-4 py-4 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-colors placeholder-gray-400 text-gray-100 text-lg' 
                                type='number' 
                                placeholder='Enter room price'
                                {...register("Roomprice", {
                                    required: {value: true, message: "Room price is required"},
                                    valueAsNumber: true,
                                    validate: (value) => !isNaN(value) || "Please enter a valid number"
                                })} 
                            />
                            {errors.Roomprice && <span className='text-red-400 text-sm mt-1 block'>{errors.Roomprice.message}</span>}
                        </div>
                        
                        <div className="space-y-1">
                            <label htmlFor="vacantRooms" className="text-sm font-medium text-gray-300 mb-1 block">Number of Vacant Rooms</label>
                            <input 
                                id="vacantRooms"
                                className='w-full px-4 py-4 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-colors placeholder-gray-400 text-gray-100 text-lg' 
                                type='number' 
                                placeholder='Enter number of vacant rooms'
                                {...register("VacantRooms", {
                                    required: {value: true, message: "Number of vacant rooms is required"},
                                    valueAsNumber: true,
                                    validate: (value) => !isNaN(value) || "Please enter a valid number"
                                })} 
                            />
                            {errors.VacantRooms && <span className='text-red-400 text-sm mt-1 block'>{errors.VacantRooms.message}</span>}
                        </div>

                        <button 
                            disabled={isSubmitting} 
                            className='mt-6 py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-medium rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all disabled:opacity-70 disabled:cursor-not-allowed'
                            type="submit"
                        >
                            {isSubmitting ? 'Adding Room...' : 'Add Room'}
                        </button>
                    </form>

                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-xl"></div>
                    <div className="absolute -top-4 -left-4 w-28 h-28 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 rounded-full blur-xl"></div>
                </div>
            </div>
        </div>
    );
};

export default OwnerAddPG;