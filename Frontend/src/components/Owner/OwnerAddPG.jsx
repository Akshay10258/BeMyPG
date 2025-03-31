import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
const server_URL=import.meta.env.VITE_server_URL;

const OwnerAddPG = () => {
    const navigate = useNavigate();
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        const result = await fetch(`${server_URL}/AddNewPgOwner/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data)
        });

        navigate("/OwnerHome")
        const res = await result.text(); 
        console.log(res);
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="relative w-full max-w-md">
                {/* Background design elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-xl transform -rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-800/20 to-gray-900/20 rounded-xl transform rotate-3"></div>
                
                {/* Main card */}
                <div className="relative bg-gray-800 text-gray-100 p-8 rounded-xl shadow-2xl border border-gray-700 backdrop-blur-sm z-10">
                    <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Add Your PG
                    </h2>

                    {isSubmitting && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 rounded-xl z-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                        </div>
                    )}
                    
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-1">
                            <input 
                                className='w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-colors placeholder-gray-400 text-gray-100' 
                                type='text' 
                                placeholder='PG Name' 
                                {...register("pgName", {required: {value: true, message: "PG name is required"}})} 
                            />
                            {errors.pgName && <span className='text-red-400 text-sm'>{errors.pgName.message}</span>}
                        </div>

                        <div className="space-y-1">
                            <select 
                                className='w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-colors text-gray-100' 
                                {...register("gender", {required: {value: true, message: "Gender preference is required"}})}
                            >
                                <option value="" className="text-gray-400">Select Gender Preference</option>
                                <option value="Boys">Boys</option>
                                <option value="Girls">Girls</option>
                                <option value="Boys and Girls">Boys and Girls</option>
                            </select>
                            {errors.gender && <span className='text-red-400 text-sm'>{errors.gender.message}</span>}
                        </div>

                        <div className="space-y-1">
                            <input 
                                className='w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-colors placeholder-gray-400 text-gray-100' 
                                type='number' 
                                placeholder="Phone Number" 
                                {...register("phNumber", {
                                    required: {value: true, message: "Phone number is required"},
                                    valueAsNumber: true,
                                    validate: {
                                        validNumber: (value) =>
                                            /^[6-9]\d{9}$/.test(value) || "Phone number must be a valid 10-digit number starting with 6-9",
                                    },
                                })} 
                            />
                            {errors.phNumber && <span className='text-red-400 text-sm'>{errors.phNumber.message}</span>}
                        </div>

                        <div className="space-y-1">
                            <input 
                                className='w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-colors placeholder-gray-400 text-gray-100' 
                                type='text' 
                                placeholder="Address" 
                                {...register("address", {required: {value: true, message: "Address is required"}})} 
                            />
                            {errors.address && <span className='text-red-400 text-sm'>{errors.address.message}</span>}
                        </div>

                        <div className="space-y-1">
                            <input 
                                className='w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-colors placeholder-gray-400 text-gray-100' 
                                type='text' 
                                placeholder="City" 
                                {...register("city", {required: {value: true, message: "City is required"}})} 
                            />
                            {errors.city && <span className='text-red-400 text-sm'>{errors.city.message}</span>}
                        </div>

                        <div className="space-y-1">
                            <input 
                                className='w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-colors placeholder-gray-400 text-gray-100' 
                                type='text' 
                                placeholder='Price Range' 
                                {...register("price", {
                                    required: {value: true, message: "Price is required"},
                                })} 
                            />
                            {errors.price && <span className='text-red-400 text-sm'>{errors.price.message}</span>}
                        </div>

                        <div className="space-y-1">
                            <input 
                                className='w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-colors placeholder-gray-400 text-gray-100' 
                                type='text' 
                                placeholder="Food Menu" 
                                {...register("foodmenu", {required: {value: true, message: "Food menu is required"}})} 
                            />
                            {errors.foodmenu && <span className='text-red-400 text-sm'>{errors.foodmenu.message}</span>}
                        </div>
                        
                        <button 
                            disabled={isSubmitting} 
                            className='mt-4 py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all disabled:opacity-70 disabled:cursor-not-allowed'
                            type="submit"
                        >
                            {isSubmitting ? 'Submitting...' : 'Add PG Listing'}
                        </button>
                    </form>

                    <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-xl"></div>
                    <div className="absolute -top-3 -left-3 w-20 h-20 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 rounded-full blur-xl"></div>
                </div>
            </div>
        </div>
    )
}

export default OwnerAddPG