import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ref, set, onValue, off, update } from 'firebase/database';
import { storage, database } from '../firebase';
import { getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function DProfile() {

  const africanCountries = [
    'Algeria',
    'Angola',
    'Benin',
    'Botswana',
    'Burkina Faso',
    'Burundi',
    'Cape Verde',
    'Cameroon',
    'Central African Republic',
    'Chad',
    'Comoros',
    'Democratic Republic of the Congo',
    'Republic of the Congo',
    'Djibouti',
    'Egypt',
    'Equatorial Guinea',
    'Eritrea',
    'Eswatini',
    'Ethiopia',
    'Gabon',
    'Gambia',
    'Ghana',
    'Guinea',
    'Guinea-Bissau',
    'Ivory Coast',
    'Kenya',
    'Lesotho',
    'Liberia',
    'Libya',
    'Madagascar',
    'Malawi',
    'Mali',
    'Mauritania',
    'Mauritius',
    'Morocco',
    'Mozambique',
    'Namibia',
    'Niger',
    'Nigeria',
    'Rwanda',
    'São Tomé and Príncipe',
    'Senegal',
    'Seychelles',
    'Sierra Leone',
    'Somalia',
    'South Africa',
    'South Sudan',
    'Sudan',
    'Tanzania',
    'Togo',
    'Tunisia',
    'Uganda',
    'Zambia',
    'Zimbabwe',
  ];

  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [author, setAuthor] = useState(false);

  const [bio, setBio] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      const userRef = ref(database, `users/${user.uid}`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserData(data);

        if (data) {
          setName(data.name || '');
          setAge(data.age || '');
          setAuthor(data.author || false);
          setBio(data.bio || '');
          setCountry(data.country || '');
          setEmail(data.email || '');
          setPhone(data.phone || '');
          setProfilePic(data.photoURL || null);
        }
      });

      return () => off(userRef, 'value', unsubscribe);
    }
  }, [user]);

  const updateProfile = async () => {
    if (user) {
      const userRef = ref(database, `users/${user.uid}`);

      try {
        await update(userRef, {
          name,
          age,
          author,
          bio,
          country,
          email,
          phone,
          profilePic,
        });

        Swal.fire({
          icon: 'success',
          title: 'Profile updated successfully',
        });
      } catch (error) {
        console.error('Error updating profile:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error updating profile',
          text: error.message,
        });
      }
    }
  };

 
  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setImageUploading(true);
  
    Swal.fire({
      title: 'Uploading image...',
      html: '<div class="progress"><div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
  
    try {
      const metadata = {
        contentType: file.type,
      };
  
      const storageLocationRef = storageRef( storage , `profilePictures/${user.uid}`);
      const uploadTask = uploadBytesResumable(storageLocationRef, file, metadata);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          const progressBar = document.querySelector('.progress-bar');
          if (progressBar) {
            progressBar.style.width = `${progress}%`;
          }
        },
        (error) => {
          console.error('Error uploading profile picture:', error);
          setImageUploading(false);
          Swal.fire({
            icon: 'error',
            title: 'Error uploading profile picture',
            text: error.message,
          });
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setProfilePic(downloadURL);
  
          // Update profile picture in the database
          const userRef = ref(database, `users/${user.uid}`);
          await update(userRef, {
            photoURL: downloadURL,
          });
  
          setImageUploading(false);
          Swal.fire({
            icon: 'success',
            title: 'Profile picture uploaded successfully',
          });
        }
      );
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      setImageUploading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error uploading profile picture',
        text: error.message,
      });
    }
  };
  
  

  return (
    <Box className="p-8 space-y-4">
      <h1 className="text-xl font-semibold">Author Profile</h1>
      <Box className="flex items-center justify-center">
        <Avatar alt="Profile Picture" src={profilePic} className="w-32 h-32" />
          <input type="file" id="profilePic"
           hidden
           onChange={(e) => handleProfilePicChange(e)} />
            <label htmlFor="profilePic">
    <IconButton
      color="primary"
      aria-label="upload picture"
      component="span"
      className="ml-4"
    >
          <PhotoCamera />
        </IconButton>
        </label>
      </Box>
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        variant="outlined"
      />
      
      <TextField
        fullWidth
        label="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        variant="outlined"
        multiline
      />
      <TextField
        fullWidth
        select
        label="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        variant="outlined"
        SelectProps={{
          native: true,
        }}
      >
        <option value="">Select a country</option>
        {africanCountries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </TextField>
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        variant="outlined"
      />
      <Button
        fullWidth
        variant="contained"
color="primary"
onClick={updateProfile}
disabled={imageUploading}
>
{imageUploading ? 'Uploading image...' : 'Update Profile'}
</Button>
</Box>
);
}