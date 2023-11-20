import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importing sweetalert2
import { auth } from "../firebase";

import {
  Button,
  TextField,
  Typography,
  Grid,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload"; 
import Lottie from 'lottie-react';
import congs1Animation from '../animations/congs.json';

function DAudioChapter() {
  const [file, setFile] = useState(null);
  const [monetization, setMonetization] = useState('free');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCoverFileName, setSelectedCoverFileName] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [audioDetails, setAudioDetails] = useState({
    duration: 0, // initial state for audio duration
    url: "", // this will hold the audio file URL after uploading
  });
  const [chapterDetails, setChapterDetails] = useState({
    title: '',
    description: '',
    content: '',
    coverimage: '', // Consider this as a URL after uploading
    type: "Audio",
    author_platform_id:'',
    categories: [],
    genres: [],
    // ... more fields as needed
  });

  const resetForm = () => {
    setFile(null);
    setMonetization('free');
    setSelectedCoverFileName("");
    setSelectedFileName("");
    setChapterDetails({
      title: '',
      description: '',
      content: '',
      coverimage: '',
      type: "Audio",
      author_platform_id:'',
      categories: [],
      genres: [],
      // Reset other fields if necessary
    });
  };

  const firebaseId = auth.currentUser.uid;


  const handleAudioFileChange = (event) => {
    const audioFile = event.target.files[0];
    if (audioFile) {
      setFile(audioFile);
      setSelectedFileName(audioFile.name); // This correctly sets the selected file name for the audio file
  
      // To get the audio duration
      const audio = new Audio(URL.createObjectURL(audioFile));
      audio.onloadedmetadata = function() {
        setAudioDetails({ ...audioDetails, duration: audio.duration });
      };
    }
  };

  const handleCoverImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      setChapterDetails({ ...chapterDetails, coverimage: imageFile });
      setSelectedCoverFileName(imageFile.name); // Now this will correctly set the selected file name for the cover image
    }
  };


  const handleSubmit = async () => {
    try {
        // Check for audio file
        if (!file) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No audio file selected for upload.',
            });
            return;
        }

      // Check for cover image
if (!chapterDetails.coverimage) {
  Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please provide a cover image.',
  });
  return;
}


        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait while your chapter is being uploaded.',
            showConfirmButton: false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        // 1. Upload the cover image to Azure Blob Storage
        const coverImageURL = await uploadToAzure(chapterDetails.coverimage);

        // 2. Upload the audio file to Azure Blob Storage
        const blobURL = await uploadToAzure(file);

        // 3. Save chapter details to the database
        const user = auth.currentUser;
        if (!user) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No user logged in.',
            });
            return;
        }

        const response = await axios.post(`http://localhost:3000/AudioChapterupload/${user.uid}`, {
            ...chapterDetails,
            content: blobURL,
            duration: audioDetails.duration,
            author_platform_id: firebaseId,
            coverimage: coverImageURL  // Assign the URL to coverImage field
        });

           console.log('Attempting to close Swal and open dialog...');
          Swal.close();
        if (response.data && response.data.message) {
     
       
          resetForm();
          console.log('Form reset, attempting to open dialog...');
          setDialogOpen(true);
          console.log('Dialog should now be open:', dialogOpen);

            // Reset the form, or navigate to a success page, or show a success message
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to save chapter details.',
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error during chapter upload.',
        });
    }
};



  async function uploadToAzure(file) {
    const response = await fetch('http://localhost:3000/generateSasToken');
    const data = await response.json();
    const sasToken = data.sasToken;

    const blobURL = `https://yeeplatform.blob.core.windows.net/yeeusers/${file.name}?${sasToken}`;

    const requestOptions = {
        method: 'PUT',
        body: file,
        headers: {
            'x-ms-blob-type': 'BlockBlob'
        }
    };

    const uploadResponse = await fetch(blobURL, requestOptions);

    if (uploadResponse.ok) {
        return blobURL; // Return the blob URL of the uploaded file
    } else {
        throw new Error('Error uploading to Azure Blob Storage');
    }
}


  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Upload Audio Chapter</h1>



      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Upload Cover Image:</label>
          <label className={`w-full flex items-center px-4 py-2 rounded-lg shadow-lg tracking-wide uppercase border cursor-pointer hover:bg-blue-500 hover:text-white ${selectedCoverFileName ? "bg-blue-500 text-white" : "bg-white text-blue-500 border-blue-500"}`}>
            <CloudUploadIcon className="mr-2" />
            {selectedCoverFileName || "Choose cover image"} {/* Updated to reflect cover image selection */}
            <input
              type="file"
              onChange={handleCoverImageChange}
              className="hidden"
              accept="image/*"
              required
            />
          </label>
      </div>



     

<div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <TextField fullWidth variant="outlined"
           type="text"
           placeholder="Title"
          value={chapterDetails.title}
          onChange={(e) => setChapterDetails({ ...chapterDetails, title: e.target.value })}
          required />
        </div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Monetization:</label>
  <select
    value={monetization}
    onChange={(e) => setMonetization(e.target.value)}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  >
    <option value="free">Free</option>
    <option value="notfree">Not Free</option>
  </select>
</div>

  
    
    <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <TextField fullWidth multiline rows={4} variant="outlined"
           value={chapterDetails.description}
           placeholder="Description"
           onChange={(e) => setChapterDetails({ ...chapterDetails, description: e.target.value })}
            required />
        </div>

        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Upload Audio File:</label> {/* Corrected label text */}
          <label className={`w-full flex items-center px-4 py-2 rounded-lg shadow-lg tracking-wide uppercase border cursor-pointer hover:bg-blue-500 hover:text-white ${selectedFileName ? "bg-blue-500 text-white" : "bg-white text-blue-500 border-blue-500"}`}>
            <CloudUploadIcon className="mr-2" />
            {selectedFileName || "Choose audio file"} {/* Corrected to reflect audio file selection */}
            <input
              type="file"
              onChange={handleAudioFileChange}
              className="hidden"
              accept="audio/*"
              required
            />
          </label>
      </div>




<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
    <DialogTitle className="text-center">Success!</DialogTitle>
    <DialogContent className="flex flex-col items-center justify-center space-y-4">
        <Lottie 
            animationData={congs1Animation} 
            style={{ width: 'auto', maxWidth: '100%', height: 200 }} 
        />
        <p>Well done! You&apos;re a real YeePlatform author.</p>
        <div className="text-center animate-pulse">
        <p className="text-yellow-500 font-bold text-xl">You&#39;ve got</p>
<span className="text-4xl text-yellow-500">5 Points!</span>

        </div>
        <p>Your content will be available in the marketplace soon.</p>
    </DialogContent>
</Dialog>

      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
        Upload Chapter
      </button>
    </div>
  );
}

export default DAudioChapter;
