import React, { useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import { auth } from "../firebase";
import { countries } from '../constants/countries';
import { AuthContext } from '../contexts/AuthContext';


export default function DProfile() {

    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [isGoogleUser, setIsGoogleUser] = useState(false);

    // Check if the user signed up with Google
    useEffect(() => {
        setIsGoogleUser(user.providerData && user.providerData[0].providerId === 'google.com');
    }, [user]);

    // Handle image upload to the server
    const handleImageUpload = async (event) => {
        if (event.target.files.length === 0) return;

        Swal.fire({
            title: 'Uploading...',
            text: 'Your image is being uploaded. Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const formData = new FormData();
        formData.append('image', event.target.files[0]);

        const firebaseId = auth.currentUser.uid;

        try {
            const response = await axios.post(`https://yeeplatformbackend.azurewebsites.net/userprofilestore/${firebaseId}`, formData);
            if (response.data?.imageUrl) {
                setUserData(prev => ({ ...prev, profileImage: response.data.imageUrl }));
                Swal.fire('Success', 'Image uploaded successfully!', 'success');
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            Swal.fire('Oops...', 'Error uploading the image!', 'error');
        }
    };

    useEffect(() => {
        const firebaseId = auth.currentUser.uid;
        axios.get(`https://yeeplatformbackend.azurewebsites.net/userDetails/${firebaseId}`)
            .then(response => {
                const user = response.data;
                setUserData(user);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    const updateProfile = async () => {
        Swal.fire({
            title: 'Updating...',
            text: 'Your profile is being updated. Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const firebaseId = auth.currentUser.uid;

        try {
            const response = await axios.put(`https://yeeplatformbackend.azurewebsites.net/updateaccountinfo/${firebaseId}`, userData);
            if (response.data.success && response.data.message === 'User data updated successfully') {
                Swal.fire('Success', 'Profile updated successfully!', 'success');
            } else {
                throw new Error('Profile update failed');
            }
        } catch (error) {
            Swal.fire('Oops...', 'Error updating your profile!', 'error');
        }
    };

    const handleChangeEmail = () => {
        // Implement email change functionality here
        Swal.fire('Change Email', 'Email change functionality will be implemented soon.', 'info');
    };

    return (
        <div className="p-8 space-y-4">
            <h1 className="text-xl font-semibold">Author Profile</h1>
            <div className="flex items-center justify-center space-x-4 relative">
                <img
                    alt="Profile Picture"
                    src={userData.profileImage || "https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"}
                    className="w-32 h-32 rounded-full"
                />

                <input
                    type="file"
                    id="profilePic"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                />

                {/* Overlay icon on the profile picture to indicate it's clickable */}
                <label htmlFor="profilePic" className="cursor-pointer absolute bottom-2 right-2 bg-gray-600 bg-opacity-50 rounded-full p-2">
                    {/* Here, ideally, you would have an SVG icon for a camera */}
                    📷
                </label>
            </div>
            <input
                className="w-full p-2 border rounded-md"
                type="text"
                placeholder="Name"
                value={userData.username || ""}
                onChange={(e) => setUserData(prev => ({ ...prev, username: e.target.value }))}
            />
            <input
                className="w-full p-2 border rounded-md"
                type="text"
                placeholder="Age"
                value={userData.age || ""}
                onChange={(e) => setUserData(prev => ({ ...prev, age: e.target.value }))}
            />
            <textarea
                className="w-full p-2 border rounded-md"
                placeholder="Bio"
                value={userData.bio || ""}
                onChange={(e) => setUserData(prev => ({ ...prev, bio: e.target.value }))}
            />
            <select
                className="w-full p-2 border rounded-md"
                value={userData.country || ""}
                onChange={(e) => setUserData(prev => ({ ...prev, country: e.target.value }))}
            >
                <option value="">Select a country</option>
                {countries.map((c) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>
            {!isGoogleUser && (
                <input
                    className="w-full p-2 border rounded-md"
                    type="text"
                    placeholder="Email"
                    value={userData.email || ""}
                    readOnly
                />
            )}
            <input
                className="w-full p-2 border rounded-md"
                type="text"
                placeholder="Phone"
                value={userData.phone || ""}
                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
            />
            <input
                className="w-full p-2 border rounded-md"
                type="text"
                placeholder="Twitter"
                value={userData.socialLinks?.twitter || ""}
                onChange={(e) => setUserData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, twitter: e.target.value } }))}
            />
            <input
                className="w-full p-2 border rounded-md"
                type="text"
                placeholder="Instagram"
                value={userData.socialLinks?.instagram || ""}
                onChange={(e) => setUserData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, instagram: e.target.value } }))}
            />
            <input
                className="w-full p-2 border rounded-md"
                type="text"
                placeholder="Facebook"
                value={userData.socialLinks?.facebook || ""}
                onChange={(e) => setUserData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, facebook: e.target.value } }))}
            />

            {/* Email field */}
            <input
                className="w-full p-2 border rounded-md"
                type="text"
                placeholder="Email"
                value={userData.email || ""}
                readOnly // Make the input field read-only
            />

            {/* Button to update profile */}
            <button
                className="w-full p-2 mt-4 text-white bg-blue-500 rounded-md"
                onClick={updateProfile}
            >
                Update Profile
            </button>

            {/* Display the "Change Email" button for non-Google users */}
            {!isGoogleUser && (
                <button
                    className="w-full p-2 mt-2 text-white bg-yellow-500 rounded-md"
                    onClick={handleChangeEmail}
                >
                    Change Email
                </button>
            )}
        </div>
    );
}
