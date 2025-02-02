import React from 'react'
import { useForm } from "react-hook-form";

const OwnerAddPG = () => {
    const { register, 
        handleSubmit, 
        watch, 
        formState: { errors,isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        const result =  await fetch('https://be-my-pg-77p4.vercel.app/AddNewPgOwner/',{method: "POST",headers:{"Content-Type":"application/json",} ,credentials:"include",body: JSON.stringify(data)})
        const res= await result.text(); 
        console.log(res);
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-repeat" style={{ backgroundImage: 'url("https://st3.depositphotos.com/3336339/37106/i/450/depositphotos_371068526-stock-photo-dark-silver-cubes-abstract-metallic.jpg")' }}>"
        <div className="bg-gradient-to-r from-black to-gray-500 text-white p-8 rounded-lg shadow-xl max-w-md w-full">
        {isSubmitting && <div>Loading...</div>}
        
        <form className='flex flex-col gap-6 bg-gradient-to-r from-black to-gray-500' onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
            <input className='border-2 rounded-md h-11 bg-gradient-to-r from-black to-gray-500 text-white placeholder-white' type='text' placeholder='Enter Name of Your PG' {...register("pgName",{required:{value : true, message : "Mandatory field"}})} />
            {errors.pgName && <span className='text-red-600'>{errors.pgName.message}</span>}

            <input className='border-2 rounded-md h-11 bg-gradient-to-r from-black to-gray-500 text-white placeholder-white' type='text' placeholder='Boys/Girls' {...register("gender",{required:{value : true, message : "Mandatory field"}})} />
            {errors.pgName && <span className='text-red-600'>{errors.pgName.gender}</span>}

            <input className='border-2 rounded-md h-11 bg-gradient-to-r from-black to-gray-500 text-white placeholder-white' type='number' placeholder="Phone Number" {...register("phNumber",{required:{value : true, message : "Mandatory field"},valueAsNumber: true,validate: {
                validNumber: (value) =>
                    /^[6-9]\d{9}$/.test(value) || "Phone number must be a valid 10-digit number starting with 6-9",
                },})} />
            {errors.phNumber && <span className='text-red-600'>{errors.phNumber.message}</span>}

            <input className='border-2 rounded-md h-11 bg-gradient-to-r from-black to-gray-500 text-white placeholder-white' type='text' placeholder="Address" {...register("address",{required:{value : true, message : "Mandatory field"}})} />
            {errors.address && <span className='text-red-600'>{errors.address.message}</span>}

            <input className='border-2 rounded-md h-11 bg-gradient-to-r from-black to-gray-500 text-white placeholder-white' type='text' placeholder="City" {...register("city",{required:{value : true, message : "Mandatory field"}})} />
            {errors.city && <span className='text-red-600'>{errors.city.message}</span>}

            <input className='border-2 rounded-md h-11 bg-gradient-to-r from-black to-gray-500 text-white placeholder-white' type='number' placeholder='Price Range'{...register("price",{required:{value : true, message : "Mandatory field"},valueAsNumber: true,
                validate: (value) => !isNaN(value) || "Please enter a valid number"})} />
            {errors.price && <span className='text-red-600'>{errors.price.message}</span>}

            <input className='border-2 rounded-md h-11 bg-gradient-to-r from-black to-gray-500 text-white placeholder-white' type='text' placeholder="Food Menu" {...register("foodmenu",{required:{value : true, message : "Mandatory field"}})} />
            {errors.foodmenu && <span className='text-red-600'>{errors.foodmenu.message}</span>}
            
            <input disabled={isSubmitting} className='h-10 bg-gray-400 text-black rounded-md' type="submit" />
    </form>
    </div>
    </div>
    )
}

export default OwnerAddPG
