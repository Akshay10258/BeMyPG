import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import pgimage from '../../assets/images/WhatsApp5.jpeg';

const server_URL = import.meta.env.VITE_server_URL;

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            const result = await fetch(`${server_URL}/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const res = await result.json();

            if (res.success) {
                navigate('/UserLogin');
            } else {
                alert(res.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            {/* Form section - full width on mobile, half width on desktop */}
            <div className="w-full md:w-1/2 bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center p-6 md:p-8 lg:p-12 h-screen">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-white mb-8 font-sans">Create Account</h2>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">Full Name</label>
                            <input
                                {...register('name', { required: true })}
                                type="text"
                                id="name"
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 mt-1 border-0 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <p className="text-red-300 text-sm mt-1">Name is required</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">Email Address</label>
                            <input
                                {...register('email', { required: true })}
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 mt-1 border-0 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <p className="text-red-300 text-sm mt-1">Email is required</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">Password</label>
                            <input
                                {...register('password', { required: true })}
                                type="password"
                                id="password"
                                placeholder="Create a strong password"
                                className="w-full px-4 py-3 mt-1 border-0 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <p className="text-red-300 text-sm mt-1">Password is required</p>}
                        </div>

                        <button 
                            type="submit" 
                            className="w-full px-4 py-3 mt-6 font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 ease-in-out transform hover:-translate-y-1"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                        </button>
                        
                        <div className="text-center mt-6">
                            <p className="text-gray-300">
                                Already have an account?{' '}
                                <Link to="/UserLogin" className="font-medium text-indigo-300 hover:text-white transition duration-200">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            {/* Image section - hidden on mobile, shown on desktop */}
            <div className="hidden md:block md:w-1/2">
                <img 
                    src={pgimage}  
                    alt="Skyscrapers viewed from below with a clear sky" 
                    className="w-full h-full object-cover" 
                />
            </div>
        </div>
    );
}

export default Signup;