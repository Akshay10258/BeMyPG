import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'; 
import pgimage from '../../assets/images/WhatsApp3.jpeg';

const server_URL = import.meta.env.VITE_server_URL;

function Login() {
    const navigate = useNavigate(); 
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            const result = await fetch(`${server_URL}/owner/login/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            });

            const res = await result.json();

            if (res.success) {
                navigate('/OwnerHome');
            } else {
                alert(res.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login');
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen font-sans">
            {/* Form section - Full width on mobile */}
            <div className="w-full md:w-1/2 bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center p-6 md:p-8 lg:p-12 h-screen">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8 tracking-tight font-poppins">Owner Login</h2>
                <div className="bg-indigo-900 text-white p-4 rounded-lg mb-6 text-sm">
                        <p className="font-semibold mb-1">📝 Note: Test Credentials : </p>
                        <p className="font-bold font-xl">Test Email: testOwner@gmail.com</p>
                        <p className="font-bold font-xl">Test Password: 1234</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full max-w-xs md:max-w-sm">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-base font-medium text-white mb-2 font-poppins">Email address</label>
                        <input
                            {...register('email', {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
                            })}
                            type="email"
                            id="email"
                            className="w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm text-base"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1 font-light">{errors.email.message}</p>}
                    </div>
                    
                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-base font-medium text-white mb-2 font-poppins">Password</label>
                        <input
                            {...register('password', { required: "Password is required" })}
                            type="password"
                            id="password"
                            className="w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm text-base"
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-400 text-sm mt-1 font-light">{errors.password.message}</p>}
                    </div>
                    
                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="w-full px-4 py-4 font-medium text-white bg-cyan-500 rounded-xl hover:bg-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mt-8 text-base font-poppins"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                    
                    <div className="text-center text-white mt-6 font-poppins">
                        <span className="font-light">Don't have an account?</span>{" "}
                        <Link to="/OwnerSignUp" className="text-cyan-400 hover:text-cyan-300 font-medium ml-1">
                            Sign up
                        </Link>
                    </div>
                </form>
                
                <div className="mt-12 text-gray-400 text-sm font-light tracking-wide">
                    Manage your properties with ease
                </div>
            </div>

            {/* Right side image - Hidden on mobile */}
            <div className="hidden md:block md:w-1/2 h-screen">
                <img 
                    src={pgimage}
                    alt="PG Accommodation" 
                    className="w-full h-full object-cover" 
                />
            </div>
        </div>
    );
}

export default Login;
