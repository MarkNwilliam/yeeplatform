import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importing sweetalert2
import { auth } from "../firebase";
import Autocomplete from "@mui/material/Autocomplete";
import {
  TextField,
  Typography,
  Box,

  Chip,
} from "@mui/material";
import SuccessDialog from '../subcomponents/SuccessDialog';
import uploadToAzure from '../functions/azureUpload';
import { resizeImage } from '../functions/imageUtils';
import UploadButton from '../subcomponents/UploadButton';
import SubmitButton from '../subcomponents/SubmitButton';
function DAudioChapter() {
  const LottieAnimation = React.lazy(() => import('lottie-react'));

  const [file, setFile] = useState(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState("");
  const [monetization, setMonetization] = useState('free');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCoverFileName, setSelectedCoverFileName] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successDialogPoints, setSuccessDialogPoints] = useState(0);
  const [successDialogMessage, setSuccessDialogMessage] = useState('');
  const [audioDetails, setAudioDetails] = useState({
    duration: 0, // initial state for audio duration
    url: "", // this will hold the audio file URL after uploading
  });
  const [coverImage, setCoverImage] = useState(null); // State for the original cover image
const [thumbnail, setThumbnail] = useState(null);
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
     setCoverPreviewUrl("");
  };

  const firebaseId = auth.currentUser.uid;

  useEffect(() => {
    const handlePageUnload = () => {
      if (isSuccessDialogOpen) {
        setShowSuccessDialog(false);
      }
    };

    // Register the event listener
    window.addEventListener('beforeunload', handlePageUnload);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('beforeunload', handlePageUnload);
    };
  }, [isSuccessDialogOpen]);

  const availableCategories = [
    "Fiction", "Nonfiction", "Science Fiction", "Romance",
    "Mystery/Thriller", "Fantasy", "Biography", "History",
    "Business/Economics", "Self-help", "Health/Fitness",
    "Cooking/Food", "Travel", "Technology"
  ];

  const maxDescriptionLength = 500;
  const minTitleLength = 3; // Minimum length for title
const maxTitleLength = 100; // Maximum length for title
const maxAudioFileSizeMB = 150;
const minCategoriesRequired = 1;

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

  // Image size validation
  const isFileSizeValid = (file) => {
    const maxSizeInMB = 5; // 5MB limit
    const sizeInMB = file.size / 1024 / 1024;
    return sizeInMB <= maxSizeInMB;
  };

  // Image dimensions validation
  const isImageDimensionsValid = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve(img.width === 512 && img.height === 800);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  // Modified handleCoverImageChange to include thumbnail creation
  const handleCoverImageChange = async (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      if (!isFileSizeValid(imageFile)) {
        Swal.fire('Error', 'Image size should not exceed 5MB.', 'error');
        return;
      }

      const dimensionsValid = await isImageDimensionsValid(imageFile);
      if (!dimensionsValid) {
        Swal.fire('Error', 'Image dimensions should be exactly 512x800 pixels.', 'error');
        return;
      }


      setCoverImage(imageFile); // Set the original cover image in state

      // Generate and set the thumbnail
      const thumbnailBlob = await resizeImage(imageFile, 256);
      setThumbnail(thumbnailBlob);
      setSelectedCoverFileName(imageFile.name);
      setCoverPreviewUrl(URL.createObjectURL(imageFile));
  
      // Update chapterDetails with the local URL of the image for preview
      setChapterDetails({ ...chapterDetails, coverimage: URL.createObjectURL(imageFile) });
    }
  };

 
  const isAudioFileSizeValid = (file) => {
    return file && file.size <= maxAudioFileSizeMB * 1024 * 1024;
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
   

     // Check if the files are selected
  if (!file || !coverImage) {
    Swal.fire({
      icon: 'error',
      title: 'Missing Files',
      text: 'Please ensure all required files are selected.',
    });
    return;
  }


        setShowSuccessDialog(true);
        setSuccessDialogPoints(5); // Set points as per your logic
        setSuccessDialogMessage('Well done! You\'re a real YeePlatform author.');

      // Check for cover image
if (!chapterDetails.coverimage) {
  Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please provide a cover image.',
  });
  return;
}

if (chapterDetails.title.length < minTitleLength || chapterDetails.title.length > maxTitleLength) {
  Swal.fire('Error', `Title should be between ${minTitleLength} and ${maxTitleLength} characters.`, 'error');
  return;
}

if (!isAudioFileSizeValid(file)) {
  Swal.fire('Error', `Audio file size should not exceed ${maxAudioFileSizeMB}MB.`, 'error');
  return;
}

if (chapterDetails.categories.length < minCategoriesRequired) {
  Swal.fire('Error', `Please select at least ${minCategoriesRequired} category(ies).`, 'error');
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

        const thumbnailURL = await uploadToAzure(chapterDetails.coverimage, true);

        const updatedChapterDetails = {
          ...chapterDetails,
          coverimage: coverImageURL, // Set the cover image URL
          thumbnailURL: thumbnailURL // If you're using a thumbnail
        };

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

        const response = await axios.post(`https://yeeplatformbackend.azurewebsites.net/AudioChapterupload/${user.uid}`, {
            ...chapterDetails,
            content: blobURL,
            duration: audioDetails.duration,
            author_platform_id: firebaseId,
            coverimage: coverImageURL,  // Assign the URL to coverImage field
            thumbnailUrl: thumbnailURL,
        });

           console.log('Attempting to close Swal and open dialog...');
          Swal.close();
        if (response.data && response.data.message) {
     
       
          resetForm();
          console.log('Form reset, attempting to open dialog...');
          setIsSuccessDialogOpen(true);
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

const handleCategoryChange = (event) => {
  const {
    target: { value },
  } = event;
  setChapterDetails({
    ...chapterDetails,
    categories: typeof value === 'string' ? value.split(',') : value,
  });
};

const handleCategoryDelete = (categoryToDelete) => () => {
  setChapterDetails({
    ...chapterDetails,
    categories: chapterDetails.categories.filter((category) => category !== categoryToDelete),
  });
};

const renderSelectedCategories = () => {
  return chapterDetails.categories.map((category) => (
    <Chip
      key={category}
      label={category}
      onDelete={handleCategoryDelete(category)}
      className="m-1"
    />
  ));
};



  return (
    <div className="p-8 bg-white shadow-md rounded-lg max-w-md mx-auto">
    <Typography variant="h4" gutterBottom>Upload Audio Chapter</Typography>


    <form onSubmit={handleSubmit}>
      <div className="mb-4">
      <UploadButton
        label="Upload Cover Image:"
        onChange={handleCoverImageChange}
        fileName={selectedCoverFileName}
        accept="image/*"
        required
      />

         {coverPreviewUrl && (
              <Box
                component="img"
                src={coverPreviewUrl}
                alt="Cover Preview"
                sx={{ width: '100%', height: 'auto', maxWidth: '200px', marginTop: '10px' }} // Adjust image size
              />
            )}
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
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Categories:
  </label>
  <Autocomplete
    multiple
    id="tags-outlined"
    options={availableCategories}
    getOptionLabel={(option) => option}
    filterSelectedOptions
    value={chapterDetails.categories}
    onChange={(event, newValue) => {
      setChapterDetails({ ...chapterDetails, categories: newValue });
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        variant="outlined"
        label="Select Categories"
        placeholder="Categories"
      />
    )}
  />
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
  <TextField
    fullWidth
    multiline
    rows={4}
    variant="outlined"
    value={chapterDetails.description}
    onChange={(e) => {
      if (e.target.value.length <= maxDescriptionLength) {
        setChapterDetails({ ...chapterDetails, description: e.target.value });
      }
    }}
    helperText={`${chapterDetails.description.length}/${maxDescriptionLength}`}
    required
  />
</div>


        <div className="mb-4">
        <UploadButton
        label="Upload Audio File:"
        onChange={handleAudioFileChange}
        fileName={selectedFileName}
        accept="audio/*"
        required
      />

      </div>



      {isSuccessDialogOpen && (
 <SuccessDialog 
 isOpen={showSuccessDialog}
 onClose={() => setShowSuccessDialog(false)}
 points={successDialogPoints}
 message={successDialogMessage}
/>
)}

<SubmitButton buttonText="Upload Chapter" />
</form>
    </div>
  );
}

export default DAudioChapter;
