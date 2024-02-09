import React, { useState , useEffect} from "react";
import Swal from "sweetalert2";
import { auth } from "../firebase";
import axios from 'axios';
import {

  TextField,
  Typography,
 
} from "@mui/material";

import Autocomplete from "@mui/material/Autocomplete";
import SuccessDialog from "../subcomponents/SuccessDialog";
import SubmitButton from "../subcomponents/SubmitButton";
import UploadButton from "../subcomponents/UploadButton";
import uploadToAzure from '../functions/azureUpload';
import { resizeImage, isFileSizeWithinRange, checkFileExtension } from '../functions/imageUtils';

const maxDescriptionLength = 500; // Maximum length for description
const maxAudiobookFileSizeMB = 300;
const minTitleLength = 3; // Minimum length for title
const maxTitleLength = 100; // Maximum length for title
const minGenresRequired = 1;

function DAudio() {
  const africanLanguages = [
    { code: "eng", label: "English" },
    { code: "French", label: "French" },
    { code: "swahili", label: "Swahili" },
    { code: "amharic", label: "Amharic" },
    { code: "yoruba", label: "Yoruba" },
    { code: "oromo", label: "Oromo" },
    { code: "igbo", label: "Igbo" },
    { code: "zulu", label: "Zulu" },
    { code: "shona", label: "Shona" },
    { code: "xhosa", label: "Xhosa" },
    { code: "hausa", label: "Hausa" },
    { code: "fulani", label: "Fulani" },
  ];

  const categories = [
    "Fiction",
    "Nonfiction",
    "Science Fiction",
    "Romance",
    "Mystery/Thriller",
    "Fantasy",
    "Biography",
    "History",
    "Business/Economics",
    "Self-help",
    "Health/Fitness",
    "Cooking/Food",
    "Travel",
    "Technology",
  ];

  const targetAudiences = ["Children", "Young Adult", "Adult", "Senior"];

  const [audiobookFile, setAudiobookFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState([]);
  const [language, setLanguage] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [selectedCoverFileName, setSelectedCoverFileName] = useState("");
  const [selectedAudioFileName, setSelectedAudioFileName] = useState("");
  const [Duration, setDuration] = useState("");
  const [monetization, setMonetization] = useState('free');
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const LottieAnimation = React.lazy(() => import('lottie-react'));


  const firebaseId = auth.currentUser.uid;

  useEffect(() => {
    const handlePageUnload = () => {
      if (isSuccessDialogOpen) {
        setIsSuccessDialogOpen(false);
      }
    };

    // Register the event listener
    window.addEventListener('beforeunload', handlePageUnload);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('beforeunload', handlePageUnload);
    };
  }, [isSuccessDialogOpen]);


  const resetForm = () => {
    setAudiobookFile(null);
    setCoverFile(null);
    setTitle('');
    setDescription('');
    setGenres([]);
    setLanguage('');
    setIsbn('');
    setDuration('')
    setPublicationDate('');
    setSelectedCoverFileName("");
    setSelectedAudioFileName("");
    setMonetization('free');
    setImagePreviewUrl("")
  };


  const getAudioDuration = (audioFile) => {
    const objectURL = URL.createObjectURL(audioFile);
    let audio = new Audio(objectURL);
    
    audio.onloadedmetadata = () => {
      setDuration(Math.floor(audio.duration));
      URL.revokeObjectURL(objectURL);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isMonetized = monetization === 'notfree';
    if (description.length > maxDescriptionLength) {
      Swal.fire('Error', `Description should not exceed ${maxDescriptionLength} characters.`, 'error');
      return;
    }

    if (audiobookFile && audiobookFile.size > maxAudiobookFileSizeMB * 1024 * 1024) {
      Swal.fire('Error', `Audiobook file size should not exceed ${maxAudiobookFileSizeMB} MB.`, 'error');
      return;
    }

    if (title.length < minTitleLength || title.length > maxTitleLength) {
      Swal.fire('Error', `Title should be between ${minTitleLength} and ${maxTitleLength} characters.`, 'error');
      return;
    }
    if (!language) {
      Swal.fire('Error', 'Please select a language.', 'error');
      return;
    }
    const today = new Date();
    const selectedDate = new Date(publicationDate);
    
    if (selectedDate > today) {
      Swal.fire('Error', 'Publication date cannot be in the future.', 'error');
      return;
    }
            
    if (genres.length < minGenresRequired) {
      Swal.fire('Error', `Please select at least ${minGenresRequired} genre(s).`, 'error');
      return;
    }
    

    // Initial Swal progress bar
    Swal.fire({
      title: 'Uploading...',
      html: 'Progress ....',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showCancelButton: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      onOpen: () => {
        // Progress bar container
        const container = Swal.getHtmlContainer();
        const progress = document.createElement('div');
        progress.setAttribute('class', 'sweetalert2-progress-steps');
        container.appendChild(progress);
      }
    });

    const handleProgressUpdate = (progress) => {
      const content = Swal.getContent();
      if (content) {
        const b = content.querySelector('b');
        if (b) {
          b.textContent = progress;
        }
      }
    };

    try {
      let audioUrl, coverUrl;

      let thumbnailUrl;

      if (coverFile) {
        const resizedImageBlob = await resizeImage(coverFile, 128); // Example size
   
        thumbnailUrl = await uploadToAzure(resizedImageBlob, true);
        console.log("Here is my thumbnail url "+thumbnailUrl)
      }
  
      if (audiobookFile) {
        audioUrl = await uploadToAzure(audiobookFile)
      }
  
      if (coverFile) {
        console.log("Uploading coverFile: ", coverFile);
        coverUrl = await uploadToAzure(coverFile)        
      
        console.log("This is my coverurl "+coverUrl)
      }
      if (description.length > maxDescriptionLength) {
        Swal.fire('Error', `Description should not exceed ${maxDescriptionLength} characters.`, 'error');
        return;
      }
      
      if (!audioUrl || !coverUrl) {
        throw new Error('Please select both audio and cover files.');
      }

    
  const data = {
      
        title: title,
        description: description,
        genres: genres.join(", "),
        categories: genres.join(", "),
        language: language,
        isbn: isbn,
        ebookUrl: audioUrl,
        coverUrl: coverUrl,
        thumbnailUrl:  thumbnailUrl,
        publicationDate: publicationDate,
        author_platform_id: firebaseId,
        Duration: Duration,
        monetization: isMonetized,
        audioUrl: audioUrl,
      };

      const response = await axios.post(`https://yeeplatformbackend.azurewebsites.net/audiobookupload/${firebaseId}`, data);

      Swal.close();

      if (response.status === 200) {
    resetForm()
       //Swal.fire('Success!', 'Ebook uploaded successfully!', 'success');
       setIsSuccessDialogOpen(true);
      } else {
        throw new Error('Error while sending data to the server.');
      }

    } catch (error) {
      Swal.fire('Error', 'Error uploading the audio. Please try again.', 'error');
      console.error('Error uploading the audio:', error);
    }
  };


  const handleCloseSuccessDialog = () => {
    console.log("Closing success dialog");
    setIsSuccessDialogOpen(false);
  };
  

  const isFileSizeValid = (file) => {
    const maxSizeInMB = 5; // 5MB limit
    const sizeInMB = file.size / 1024 / 1024;
    return sizeInMB <= maxSizeInMB;
  };
  
  const isImageDimensionsValid = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve(img.width === 512 && img.height === 800);
      };
      img.src = URL.createObjectURL(file);
    });
  };
  

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    console.log("Handle Cover Change Function Called");
    if (file) {
      if (!isFileSizeValid(file)) {

        try{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Image size should not exceed 5MB.',
        }).then(() => {
          // Close the SweetAlert2 and reset state
          setCoverFile(null);
          setSelectedCoverFileName("");
          setImagePreviewUrl("");
        });
      }
      catch(error){
        console.log(error)
      }
        return;
      }
  
      const dimensionsValid = await isImageDimensionsValid(file);
      if (!dimensionsValid) {
        try{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Image dimensions should be exactly 512x800 pixels.',
          timer: 3000,
        }).then(() => {
          // Close the SweetAlert2 and reset state
          setCoverFile(null);
          setSelectedCoverFileName("");
          setImagePreviewUrl("");
        });
      }
      catch(error){
        console.log(error)
      }
        return;
      }
  
      setCoverFile(file);
      setSelectedCoverFileName(file.name);
      setImagePreviewUrl(URL.createObjectURL(file));

      console.log("Function Execution Completed");
    }
  };
  
  
  


  return (
    <div className="p-8 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <Typography variant="h4" className="text-center mb-6">Upload your Audiobook</Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <TextField fullWidth variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
  <TextField
    fullWidth
    multiline
    rows={4}
    variant="outlined"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    required
    helperText={`${description.length}/${maxDescriptionLength}`}
  />
</div>


        <div className="mb-4">
 <UploadButton
  label="Upload Cover Image:"
  onChange={handleCoverChange}
  fileName={selectedCoverFileName}
  accept=".jpg, .jpeg, .png"
  required={true}
/>
{imagePreviewUrl && (
  <div className="image-preview">
    <img src={imagePreviewUrl} alt="Cover Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
  </div>
)}

</div>


        <div className="mb-4">
          <Autocomplete
            multiple
            options={categories}
            value={genres}
            onChange={(event, newValue) => setGenres(newValue)}
            renderInput={(params) => <TextField {...params} variant="outlined" label="Genres" />}
          />
        </div>

        <div className="mb-4">
          <Autocomplete
            options={africanLanguages.map((option) => option.label)}
            value={language}
            onChange={(event, newValue) => setLanguage(newValue)}
            renderInput={(params) => <TextField {...params} variant="outlined" label="Language" />}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">ISBN:</label>
          <TextField fullWidth variant="outlined" value={isbn} onChange={(e) => setIsbn(e.target.value)}/>
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Publication Date:</label>
          <TextField type="date" fullWidth variant="outlined" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} required />
        </div>

        <div className="mb-4">
        <UploadButton
  label="Upload Audio File:"
  onChange={(e) => {
    setAudiobookFile(e.target.files[0]);
    setSelectedAudioFileName(e.target.files[0]?.name || "");
    getAudioDuration(e.target.files[0]);
  }}
  fileName={selectedAudioFileName}
  accept=".mp3, .wav"
  required={true}
/>

           <div className="text-sm text-gray-600">
    Maximum file size: {maxAudiobookFileSizeMB} MB
  </div>
        </div>

        <div className="flex justify-center">
        <SubmitButton buttonText="Upload" />
        </div>
      </form>
      {isSuccessDialogOpen && (
        <SuccessDialog isOpen={isSuccessDialogOpen}
        onClose={handleCloseSuccessDialog}
         points={100} 
         message="Well done! You're a real YeePlatform author." />
)}
    </div>
  );
}

export default DAudio;
