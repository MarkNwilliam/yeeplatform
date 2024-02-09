import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import {IconButton} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "tailwindcss/tailwind.css";
import { auth } from "../firebase";
import axios from 'axios';
import { countries } from '../constants/countries';

const AccountPage = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      country: userData.country,
      age: userData.age,
      preferredReadingMode: userData.preferredReadingMode,
      "socialLinks.twitter": userData.socialLinks?.twitter,
      "socialLinks.instagram": userData.socialLinks?.instagram,
      "socialLinks.facebook": userData.socialLinks?.facebook
    }
  });
  const firebaseId = auth.currentUser.uid;

  useEffect(() => {
    const firebaseId = auth.currentUser.uid;

    axios.get(`http://localhost:3000/userDetails/${firebaseId}`)
      .then(response => {
        const user = response.data;
        setUserData(user);

        for (let key in user) {
          if (Object.prototype.hasOwnProperty.call(user, key)) {
            setValue(key, user[key]);
          }
        }

        // For nested objects
        if (user.socialLinks) {
          setValue("socialLinks.twitter", user.socialLinks.twitter);
          setValue("socialLinks.instagram", user.socialLinks.instagram);
          setValue("socialLinks.facebook", user.socialLinks.facebook);
        }

        console.log(user);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });

  }, []);


  const handleBecomeAuthor = async () => {
    try {
        // Displaying a progress/loading alert
        Swal.fire({
            title: 'Becoming an Author...',
            onBeforeOpen: () => {
                Swal.showLoading();
            },
            allowOutsideClick: false // Prevents user from closing the dialog
        });
  
        const data = {
          isAuthor: true
        };
  
        const response = await axios.put(`http://localhost:3000/becomeAuthor/${firebaseId}`, data);
        console.log(response.data);
  
        // Displaying a success alert
        Swal.fire({
            icon: 'success',
            title: 'Congratulations!',
            text: 'You have successfully become an author.',
            confirmButtonColor: '#3085d6',
        }).then(() => {
            // After the user acknowledges the success, redirect them to the dashboard.
            window.location.href = '/dashboard';  // Redirect to dashboard
        });
  
    } catch (err) {
        console.error('Error:', err);
  
        // Displaying an error alert
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong. Please try again.',
            confirmButtonColor: '#d33',
        });
    }
  };
  


  const onSubmit = (formData) => {
    const firebaseId = auth.currentUser.uid;

    // Displaying a progress/loading alert
    Swal.fire({
        title: 'Saving Changes...',
        onBeforeOpen: () => {
            Swal.showLoading();
        },
        allowOutsideClick: false // Prevents user from closing the dialog
    });

    axios.put(`http://localhost:3000/updateaccountinfo/${firebaseId}`, formData)
         .then(response => {
             console.log('User data updated:', response.data);

             // Displaying a success alert
             Swal.fire({
                 icon: 'success',
                 title: 'Success!',
                 text: 'Your data has been updated.',
                 confirmButtonColor: '#3085d6',
             });
         })
         .catch(error => {
             console.error('Error updating user data:', error);

             // Displaying an error alert
             Swal.fire({
                 icon: 'error',
                 title: 'Oops...',
                 text: 'Something went wrong. Please try again.',
                 confirmButtonColor: '#d33',
             });
         });
};



return (
  <div className="bg-gray-100 min-h-screen p-4">
    <header className="flex items-center border-b border-gray-300 mb-6">
        <IconButton onClick={() => navigate(-1)} className="mr-2">
          <ArrowBack />
        </IconButton>
        <h1 className="text-xl font-semibold text-yellow-500 text-center flex-grow">Account Settings</h1>
      </header>
    <div className="bg-white shadow-md rounded p-6 mx-auto max-w-xl">
      <h2 className="text-lg font-medium mb-4">Personal Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          {...register("username", { required: true, maxLength: 20 })} 
          className="w-full p-2 mb-4 border rounded" 
          placeholder="Username"
          defaultValue={userData.username}
        />
        <input 
          {...register("email")} 
          className="w-full p-2 mb-4 border rounded" 
          placeholder="Email"
          defaultValue={userData.email}
          disabled
        />
        <input 
          {...register("phone", { pattern: /^[0-9]{10}$/ })} 
          className="w-full p-2 mb-4 border rounded" 
          placeholder="Phone Number"
          defaultValue={userData.phone}
        />
       <select 
          {...register("country")} 
          className="w-full p-2 mb-4 border rounded"
          defaultValue={userData.country}
        >
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <input 
          {...register("age", { min: 0, max: 150 })} 
          className="w-full p-2 mb-4 border rounded" 
          placeholder="Age"
          defaultValue={userData.age}
        />
        <select 
          {...register("preferredReadingMode")} 
          className="w-full p-2 mb-4 border rounded"
          defaultValue={userData.preferredReadingMode}
        >
          <option value="LTR">Left to Right</option>
          <option value="RTL">Right to Left</option>
        </select>
        <h2 className="text-lg font-medium mt-4 mb-4">Social Links</h2>
        <input 
          {...register("socialLinks.twitter")} 
          className="w-full p-2 mb-4 border rounded" 
          placeholder="Twitter"
          defaultValue={userData.socialLinks?.twitter}
        />
        <input 
          {...register("socialLinks.instagram")} 
          className="w-full p-2 mb-4 border rounded" 
          placeholder="Instagram"
          defaultValue={userData.socialLinks?.instagram}
        />
        <input 
          {...register("socialLinks.facebook")} 
          className="w-full p-2 mb-4 border rounded" 
          placeholder="Facebook"
          defaultValue={userData.socialLinks?.facebook}
        />
        <div className="flex justify-between gap-4 mt-4">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Save Changes
          </button>
          <button onClick={handleBecomeAuthor} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded shadow-md transition duration-300">
  Become an Author
</button>

        </div>
      </form>
    </div>
  </div>
);
};

export default AccountPage;
