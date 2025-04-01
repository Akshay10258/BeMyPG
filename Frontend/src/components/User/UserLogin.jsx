import React from 'react';
import { useForm } from 'react-hook-form';
import pgimage from '../../assets/images/WhatsApp5.jpeg';
import { Link, useNavigate } from 'react-router-dom'; 

const server_URL = import.meta.env.VITE_server_URL;

function Login() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate(); 
    
    const onSubmit = async (data) => {
        console.log('Form Data:', data);
        try {
            const result = await fetch(`${server_URL}/user/login/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            });
            const res = await result.json();
    
            if (res.success) {
                navigate('/UserHome');
            } else {
                alert(res.message || 'Login failed');
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
                    <h2 className="text-3xl font-bold text-center text-white mb-8 font-sans">Welcome Back</h2>
                    <div className="bg-indigo-900 text-white p-4 rounded-lg mb-6 text-sm">
                        <p className="font-semibold mb-1">📝 Note: Test Credentials </p>
                        <p className="font-bold font-xl">Test Email: testUser@gmail.com</p>
                        <p className="font-bold font-xl">Test Password: 1234</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">Email Address</label>
                            <input
                                {...register('email', { 
                                    required: "Email is required", 
                                    pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" } 
                                })}
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 mt-1 border-0 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">Password</label>
                            <input
                                {...register('password', { required: "Password is required" })}
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 mt-1 border-0 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        <button 
                            type="submit" 
                            className="w-full px-4 py-3 mt-6 font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 ease-in-out transform hover:-translate-y-1"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Logging in...' : 'Sign In'}
                        </button>
                        
                        <div className="text-center mt-6">
                            <p className="text-gray-300">
                                Don't have an account?{' '}
                                <Link to="/UserSignup" className="font-medium text-indigo-300 hover:text-white transition duration-200">
                                    Create Account
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

export default Login;
