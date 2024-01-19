import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { auth } from "../firebase";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import uploadToAzure from '../functions/azureUpload';
import SuccessDialog from '../subcomponents/SuccessDialog';
import UploadButton from '../subcomponents/UploadButton';
import SubmitButton from '../subcomponents/SubmitButton';
import { resizeImage } from '../functions/imageUtils';

function DUpload({ user }) {
  const [ebookFile, setEbookFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [ebookFileName, setEbookFileName] = useState("");
const [coverFileName, setCoverFileName] = useState("");
const [successMessage, setSuccessMessage] = useState("Well done! You're a real YeePlatform author.");
  const [pointsAwarded, setPointsAwarded] = useState(100);
  const [previewFile, setPreviewFile] = useState(null);
  const [previewFileName, setPreviewFileName] = useState("");
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publicationDate, setPublicationDate] = useState(''  );
  const [subtitle, setSubtitle] = useState('');
  const [monetization, setMonetization] = useState(false); 
  const [coverPreview, setCoverPreview] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [file, setFile] = useState(null);

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

  const maxDescriptionLength = 500; // Set maximum length for description
  const maxCoverImageSizeMB = 5; // Maximum cover image size in MB
  const maxTitleLength = 100;
const maxEbookFileSizeMB = 300; // Example limit for eBook file size in MB
const maxSubtitleLength = 200;
const maxPreviewFileSizeMB = 10;


const availableCategories = [
  "Fiction", "Nonfiction", "Science Fiction", "Romance",
  "Mystery/Thriller", "Fantasy", "Biography", "History",
  "Business/Economics", "Self-help", "Health/Fitness",
  "Cooking/Food", "Travel", "Technology"
];

const firebaseId = auth.currentUser.uid;

const handleCategoryChange = (event, value) => {
  if (Array.isArray(value)) {
    if (value.length > 3) {
      Swal.fire('Error', 'You can select up to 3 categories only.', 'error');
      return;
    }
    setSelectedCategories(value);
  } else {
    console.error('Expected an array for selected categories, received:', value);
  }
};

const handleCoverChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    if (!isFileSizeWithinRange(file, 0.001, maxCoverImageSizeMB)) {
      Swal.fire('Error', `Cover image size should not exceed ${maxCoverImageSizeMB} MB.`, 'error');
      return;
    }

    const isDimensionsValid = await isImageDimensionsValid(file, 512, 800);
    if (!isDimensionsValid) {
      Swal.fire('Error', 'Invalid image dimensions.', 'error');
      return;
    }

    try {
      const resizedImageBlob = await resizeImage(file, 256);
      const resizedFile = new File([resizedImageBlob], file.name, { type: 'image/jpeg' });
      setCoverFile(resizedFile);
      setCoverFileName(resizedFile.name);
      setCoverPreview(URL.createObjectURL(resizedImageBlob));
    } catch (error) {
      console.error('Error resizing image:', error);
      Swal.fire('Error', 'Failed to resize the image.', 'error');
    }
  }
};

const handlePreviewChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    if (!isFileSizeWithinRange(file, 0.1, maxPreviewFileSizeMB)) {
      Swal.fire('Error', `Preview file size should not exceed ${maxPreviewFileSizeMB} MB.`, 'error');
      return;
    }

    setPreviewFile(file);
    setPreviewFileName(file.name);
  }
};

const handleEbookChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (!isFileSizeWithinRange(file, 0.1, maxEbookFileSizeMB)) {
      Swal.fire('Error', `eBook file size should not exceed ${maxEbookFileSizeMB} MB.`, 'error');
      return;
    }

    setEbookFile(file);
    setEbookFileName(file.name);
  }
};

const resetForm = () => {
  setEbookFile(null);
  setCoverFile(null);
  setEbookFileName("");
  setCoverFileName("");
  setTitle('');
  setDescription('');
  setSubtitle('');
  setGenres('');
  setIsbn('');
  setPublicationDate('');
  setCoverPreview('');
  setDescription('');
  setSelectedCategories([]);
  setPreviewFile(null);
  setPreviewFileName('');
};

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

    // Check for title length
  if (title.length > maxTitleLength) {
    Swal.fire('Error', 'Title is too long.', 'error');
    return;
  }

  // Check for description length
  if (description.length > maxDescriptionLength) {
    Swal.fire('Error', 'Description is too long.', 'error');
    return;
  }

  if (subtitle.length > maxSubtitleLength) {
    Swal.fire('Error', 'Subtitle is too long.', 'error');
    return;
  }

  // Check for eBook file size
  if (ebookFile && (ebookFile.size / 1024 / 1024) > maxEbookFileSizeMB) {
    Swal.fire('Error', 'eBook file size is too large.', 'error');
    return;
  }

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

// Resize the image to thumbnail size
const thumbnailBlob = await resizeImage(coverFile, 256);

// Upload files to Azure Blob Storage (optional, can be moved outside)
const coverUrl = await uploadToAzure(coverFile);
const thumbnailUrl = await uploadToAzure(thumbnailBlob, true);
const previewUrl = await uploadToAzure(previewFile);

// Ensure valid URLs
if (!coverUrl || !thumbnailUrl) {
  throw new Error('Failed to get valid URLs for the files.');
}

let ebookUrl;

if (ebookFile.type === 'application/pdf') {
  // Create a new FormData instance for the file
  const fileData = new FormData();

  // Append ebook file to the fileData instance
  fileData.append('ebookFile', ebookFile);

  try {
    // Upload the ebook file to the server and get the ebookUrl
    const uploadResponse = await axios.post(`http://localhost:3000/fileupload/${firebaseId}`, fileData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    ebookUrl = uploadResponse.data.azureFileUrl;
  } catch (error) {
    // Handle upload errors
    console.error('Error uploading the ebook:', error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error uploading the ebook. Please try again.',
    });
    return;
  }
} else if (ebookFile.type === 'application/epub+zip') {
  // Upload EPUB file to Azure Blob Storage
  const ebookBlob = await uploadToAzure(ebookFile);
  ebookUrl = ebookBlob.url;
} else {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Invalid eBook format. Please upload in .pdf or .epub format.',
  });
  return;
}

// Create a new FormData instance for the rest of the data
const formData = new FormData();

// Append non-chunked data (cover, thumbnail, preview URLs, etc.)
formData.append('coverUrl', coverUrl);
formData.append('thumbnailUrl', thumbnailUrl);
formData.append('title', title);
formData.append('description', description);
formData.append('categories', selectedCategories);
formData.append('isbn', isbn);
formData.append('previewUrl', previewUrl);
formData.append('subtitle', subtitle);
formData.append('monetization', monetization);
formData.append('publicationDate', publicationDate);
formData.append('author_platform_id', firebaseId);
formData.append('ebookUrl', ebookUrl);

try {
  // Submit the complete formData to backend (including remaining data)
  const response = await axios.post(`http://localhost:3000/ebookupload/${firebaseId}`, formData);
  console.log(response.data);
  Swal.close();
  resetForm();
  setIsSuccessDialogOpen(true);
} catch (error) {
  // Handle upload errors
  console.error('Error uploading the ebook:', error);
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Error uploading the ebook. Please try again.',
  });
}


  }


const handleMonetizationChange = (e) => {
  setMonetization(e.target.value === 'notfree');
};

  return (
    <div className="p-8 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <Typography variant="h4" className="text-center mb-6">Upload your Ebook</Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
  <input
    type="text"
    value={title}
    onChange={(e) => {
      if (e.target.value.length <= maxTitleLength) {
        setTitle(e.target.value);
      }
    }}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    required
  />
  <div className="text-right text-sm">
    {title.length}/{maxTitleLength}
  </div>
</div>


<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Subtitle:</label>
  <input
    type="text"
    value={subtitle}
    onChange={(e) => {
      if (e.target.value.length <= maxSubtitleLength) {
        setSubtitle(e.target.value);
      }
    }}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  />
  <div className="text-right text-sm">
    {subtitle.length}/{maxSubtitleLength}
  </div>
</div>


<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Upload Cover Image (Max size: {maxCoverImageSizeMB}MB):
  </label>
  <UploadButton
    onChange={handleCoverChange}
    fileName={coverFileName}
    accept=".jpg, .jpeg, .png"
    required
  />
  {coverPreview && (
    <Box
      component="img"
      sx={{
        height: 240, // Fixed height
        width: 180,  // Width according to aspect ratio 3:4
        maxHeight: { xs: 233, md: 167 },
        maxWidth: { xs: 350, md: 250 },
        objectFit: 'cover', // This will cover the area without stretching the image
      }}
      alt="Cover Preview"
      src={coverPreview}
    />
  )}
</div>


<div className = "mb-4">
      <Autocomplete
  multiple
  id="categories-autocomplete"
  options={availableCategories}
  value={selectedCategories}
  onChange={handleCategoryChange}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Categories"
      placeholder="Select categories"
    />
  )}
  renderTags={(value, getTagProps) =>
    value.map((option, index) => (
      <Chip 
        key={option}  // Use the option itself as a unique key
        label={option} 
        {...getTagProps({ index })} 
      />
    ))
  }
/>

</div>


<div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        maxLength={maxDescriptionLength}
        required
      ></textarea>
      <p className="text-sm text-gray-600">
        {description.length} / {maxDescriptionLength} characters
      </p>
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
  value={monetization ? 'notfree' : 'free'}
  onChange={handleMonetizationChange}
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
>
  <option value="free">Free</option>
  <option value="notfree">Not Free</option>
</select>

</div>

{/* eBook Preview File Upload Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload eBook Previewn (Max size: {maxPreviewFileSizeMB}MB):
          </label>
          <UploadButton
    onChange={handlePreviewChange}
    fileName={previewFileName}
    accept=".pdf, .epub, .mobi"
    required
  />
        </div>


    {/* eBook File Upload Field */}
    <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Upload eBook File (Max size: {maxEbookFileSizeMB}MB):</label>
          <UploadButton
            onChange={handleEbookChange}
            fileName={ebookFileName}
            accept=".pdf, .epub, .mobi"
            required
          />
        </div>


        <div className="flex justify-center">
        <SubmitButton buttonText="Upload" />
</div>

      </form>


      {isSuccessDialogOpen && (
   <SuccessDialog
   isOpen={isSuccessDialogOpen}
   onClose={() => setIsSuccessDialogOpen(false)}
   points={pointsAwarded}
   message={successMessage}
 />
      )}

    </div>
  );
}

export default DUpload;
