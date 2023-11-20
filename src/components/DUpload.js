import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { auth } from "../firebase";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Lottie from 'lottie-react';
import congs1Animation from '../animations/congs.json';


function DUpload({ user }) {
  const [ebookFile, setEbookFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [ebookFileName, setEbookFileName] = useState("");
const [coverFileName, setCoverFileName] = useState("");
const [dialogOpen, setDialogOpen] = useState(false);


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publicationDate, setPublicationDate] = useState(''  );
  const [subtitle, setSubtitle] = useState('');
  const [monetization, setMonetization] = useState('free'); // defaulting to 'free'
  

  const firebaseId = auth.currentUser.uid;
  

  const resetForm = () => {
    setEbookFile(null);
    setCoverFile(null);
    setEbookFileName("");
    setCoverFileName("");
    setTitle('');
    setDescription('');
    setGenres('');
    setIsbn('');
    setPublicationDate('');
}

  const checkFileExtension = (file, validExtensions) => {
    const extension = file.name.split('.').pop();
    return validExtensions.includes(extension);
};

const isDescriptionValid = (desc) => {
  const words = desc.split(/\s+/);
  return words.length <= 300;
};

const isValidISBN = (isbn) => {
  const regex = /^(97(8|9))?\d{9}(\d|X)$/;
  return regex.test(isbn);
};

const isFileSizeWithinRange = (file, minSizeInMB, maxSizeInMB) => {
  const sizeInMB = file.size / (1024 * 1024);
  return sizeInMB >= minSizeInMB && sizeInMB <= maxSizeInMB;
};

const isImageDimensionsValid = async (file, width, height) => {
  return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
          resolve(img.width === width && img.height === height);
      };
      img.src = URL.createObjectURL(file);
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      icon: 'info',
      title: 'Uploading...',
      text: 'Please wait while your file is being uploaded.',
      showConfirmButton: false, // Hides the OK button
      allowOutsideClick: false
  });

    if (!title.trim()) {
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The title cannot be empty. Please provide a title and try again.'
      });
      return;
  }
    
if (!checkFileExtension(ebookFile, ['pdf', 'epub', 'mobi'])) {

  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Invalid eBook format. Please upload in .pdf, .epub, or .mobi format.'
});
  return;
}

const isCoverDimensionsValid = await isImageDimensionsValid(coverFile, 600, 800);
/*if (!isCoverDimensionsValid) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Cover image dimensions should be 600x800 pixels. Please adjust the image size and try again.'
    });
    return;
} */

if (!isFileSizeWithinRange(ebookFile, 0.1, 200)) {
  Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'eBook size should be between 100KB and 200MB. Please adjust the file size and try again.'
  });
  return;
}

if (!isFileSizeWithinRange(coverFile, 0.001, 5)) {
  Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Cover image size should be between 1KB and 5MB. Please adjust the file size and try again.'
  });
  return;
}

if (!checkFileExtension(coverFile, ['jpg', 'jpeg', 'png'])) {

  
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Invalid cover image format. Please upload in .jpg or .png format.'
});
  return;
}

if (!isDescriptionValid(description)) {
  Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Description exceeds 300 words. Please shorten it and try again.'
  });
  return;
}

if (!isValidISBN(isbn) && isbn) {
 
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Invalid ISBN format. Please check and try again.'
});
  return;
}
    try {
        // Upload files to Azure Blob Storage
        const ebookUrl = await uploadToAzure(ebookFile);
        const coverUrl = await uploadToAzure(coverFile);

        // Ensure both URLs are valid
        if (!ebookUrl || !coverUrl) {
            throw new Error('Failed to get valid URLs for the files.');
        }

        const data = {
          ebookUrl: ebookUrl,
          coverUrl: coverUrl,
          title: title,
          description: description,
          genres: genres,
          isbn: isbn,
          subtitle: subtitle,
          monetization: monetization,
          publicationDate: publicationDate,
          author_platform_id: firebaseId
      };
      

        const response = await axios.post(`http://localhost:3000/ebookupload/${firebaseId}`, data);

        console.log(response.data);
        Swal.close();
        resetForm()
       //Swal.fire('Success!', 'Ebook uploaded successfully!', 'success');
        setDialogOpen(true);
       
      } catch (error) {
        console.error('Error uploading the ebook:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error uploading the ebook. Please try again.'
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
    <div className="p-8 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Subtitle:</label>
  <input
    type="text"
    value={subtitle}
    onChange={(e) => setSubtitle(e.target.value)}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  />
</div>


        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>

        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2 relative">
    Upload Cover Image:
    <input 
        type="file" 
        onChange={(e) => {
          setCoverFile(e.target.files[0]);
          setCoverFileName(e.target.files[0].name);
      }} 
        className="absolute inset-0 opacity-0 pointer-events-none"
        required 
        accept=".jpg, .jpeg, .png"
    />
    <div className="py-2 px-3 border border-gray-400 rounded cursor-pointer hover:bg-yellow-400">
    {coverFileName ? coverFileName : 'Select Cover Image'}
    </div>
</label>

        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Genres:</label>
          <input
            type="text"
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">ISBN(Optional):</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Publication Date:</label>
          <input
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
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
        <label className="block text-gray-700 text-sm font-bold mb-2 relative">
    Upload eBook File:
    <input 
        type="file" 
        onChange={(e) =>{ 
          setEbookFile(e.target.files[0]);
          setEbookFileName(e.target.files[0].name);
        }}
        className="absolute inset-0 opacity-0 pointer-events-none"
        required 
        accept=".pdf, .epub, .mobi"
    />
    <div className="py-2 px-3 border border-gray-400 rounded cursor-pointer hover:bg-yellow-400">
    {ebookFileName ? ebookFileName : 'Select eBook File'}
    </div>
</label>

        </div>

        <div className="flex justify-end">
        <button 
    type="submit" 
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:shadow-outline"
>
    Upload
</button>

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

export default DUpload;
