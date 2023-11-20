import React, { useState } from "react";
import Swal from "sweetalert2";
import { auth } from "../firebase";
import axios from 'axios';
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
import { styled } from "@mui/system";
import { useForm, Controller } from "react-hook-form";
import ImageIcon from "@mui/icons-material/Image";
import Autocomplete from "@mui/material/Autocomplete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload"; 
import Lottie from 'lottie-react';
import congs1Animation from '../animations/congs.json';


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
  const [dialogOpen, setDialogOpen] = useState(false);

  const firebaseId = auth.currentUser.uid;


  const resetForm = () => {
    setAudiobookFile(null);
    setCoverFile(null);
    setTitle('');
    setDescription('');
    setGenres([]);
    setLanguage('');
    setIsbn('');
    setPublicationDate('');
    setSelectedCoverFileName("");
    setSelectedAudioFileName("");
    setMonetization('free');
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
  
      if (audiobookFile) {
        audioUrl = await uploadToAzure(audiobookFile, progress => {
          const totalProgress = Math.floor(progress / 2); // Assuming 50% for the audio upload
          handleProgressUpdate(totalProgress);
        });
      }
  
      if (coverFile) {
        coverUrl = await uploadToAzure(coverFile, progress => {
          const totalProgress = 50 + Math.floor(progress / 2); // The latter 50% for the cover upload
          handleProgressUpdate(totalProgress);
        });
      }
  
      if (!audioUrl || !coverUrl) {
        throw new Error('Please select both audio and cover files.');
      }

      const data = {
        ebookUrl: audioUrl,
        coverUrl: coverUrl,
        title: title,
        description: description,
        genres: genres.join(", "),
        language: language,
        isbn: isbn,
        publicationDate: publicationDate,
        author_platform_id: firebaseId,
        Duration: Duration,
      };

      const response = await axios.post(`http://localhost:3000/audiobookupload/${firebaseId}`, data);

      Swal.close();

      if (response.status === 200) {
    resetForm()
       //Swal.fire('Success!', 'Ebook uploaded successfully!', 'success');
        setDialogOpen(true);
      } else {
        throw new Error('Error while sending data to the server.');
      }

    } catch (error) {
      Swal.fire('Error', 'Error uploading the audio. Please try again.', 'error');
      console.error('Error uploading the audio:', error);
    }
  };

  async function uploadToAzure(file) {

    if (!file) {
      throw new Error('No file provided for upload.');
    }
    
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


  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };


  return (
    <div className="p-8 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <TextField fullWidth variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <TextField fullWidth multiline rows={4} variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Upload Cover Image:</label>
          <label className={`w-full flex items-center px-4 py-2 rounded-lg shadow-lg tracking-wide uppercase border cursor-pointer hover:bg-blue-500 hover:text-white ${selectedCoverFileName ? "bg-blue-500 text-white" : "bg-white text-blue-500 border-blue-500"}`}>
            <CloudUploadIcon className="mr-2" />
            {selectedCoverFileName || "Choose Cover Image"}
            <input
              type="file"
              onChange={(e) => {
                setCoverFile(e.target.files[0]);
                setSelectedCoverFileName(e.target.files[0]?.name || "");
              }}
              className="hidden"
              accept=".jpg, .jpeg, .png"
              required
            />
          </label>
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
        <label className="block text-gray-700 text-sm font-bold mb-2">Upload Audio File:</label>
          <label className={`w-full flex items-center px-4 py-2 rounded-lg shadow-lg tracking-wide uppercase border cursor-pointer hover:bg-blue-500 hover:text-white ${selectedAudioFileName ? "bg-blue-500 text-white" : "bg-white text-blue-500 border-blue-500"}`}>
            <CloudUploadIcon className="mr-2" />
            {selectedAudioFileName || "Choose Audio File"}
            <input
              type="file"
              onChange={(e) => {
                setAudiobookFile(e.target.files[0]);
                setSelectedAudioFileName(e.target.files[0]?.name || "");
                getAudioDuration(e.target.files[0]);
              }}
              className="hidden"
              accept=".mp3, .wav"
              required
            />
          </label>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="contained" color="primary">Upload</Button>
        </div>
      </form>

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
<span className="text-4xl text-yellow-500">100 Points!</span>

        </div>
        <p>Your content will be available in the marketplace soon.</p>
    </DialogContent>
</Dialog>

    </div>
  );
}

export default DAudio;
