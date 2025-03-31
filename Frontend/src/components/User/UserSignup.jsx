import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import pgimage from '../../assets/images/WhatsApp5.jpeg'
const server_URL=import.meta.env.VITE_server_URL;
function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
                // Use navigate instead of window.location
                navigate('/UserLogin');
            } else {
                alert(res.message || 'Signup failed'); // Add user feedback
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/2 bg-gradient-to-l from-black to-gray-700 flex flex-col justify-center items-center p-8">
                <h2 className="text-2xl font-bold text-center text-white">Signup</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white">User Name</label>
                        <input
                            {...register('name', { required: true })}
                            type="text"
                            id="name"

                            className="w-full px-4 py-2 mt-1 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-700 "

                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p className="text-red-500 text-sm">User Name is required</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email address</label>
                        <input
                            {...register('email', { required: true })}
                            type="email"
                            id="email"

                            className="w-full px-4 py-2 mt-1 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-700 "

                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                        <input
                            {...register('password', { required: true })}
                            type="password"
                            id="password"

                            className="w-full px-4 py-2 mt-1 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-700 "

                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
                    </div>

                    <button type="submit" className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Signup'}
                    </button>
                    <div>
    <li style={{ listStyleType: "none", textAlign: "center", marginTop: "1rem" }}>
        <Link to="/UserLogin" style={{ color: "white", textDecoration: "underline" }}>
            Login
        </Link>
    </li>
</div>

                    
                </form>
            </div>

            <div className="w-1/2">
            <img 
            src={pgimage}  
            alt="Skyscrapers viewed from below with a clear sky" 
            className="w-full h-full object-fill" 
            />
        </div>
        </div>
    );
}

export default Signup;
