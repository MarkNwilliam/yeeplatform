import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";
import { Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import UploadButton from '../subcomponents/UploadButton';  // Import UploadButton component
import SubmitButton from '../subcomponents/SubmitButton'; // Import SubmitButton component
import SuccessDialog from '../subcomponents/SuccessDialog';
import { resizeImage, isImageDimensionsValid, isFileSizeWithinRange } from '../functions/imageUtils';
import uploadToAzure from '../functions/azureUpload';

const DWrite = () => {
  const LottieAnimation = React.lazy(() => import('lottie-react'));
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);


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

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [selectedCoverFileName, setSelectedCoverFileName] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [coverPreviewUrl, setCoverPreviewUrl] = useState("");

    const [thumbnail, setThumbnail] = useState(null);
    const resetForm = () => {
        setTitle('');
        setDescription('');
        setContent('');
        setCoverImage(null);
        setSelectedCoverFileName('');
        setCoverPreviewUrl('');
        setCategories([]);
    };

    const availableCategories = [
        "Fiction", "Nonfiction", "Science Fiction", "Romance",
        "Mystery/Thriller", "Fantasy", "Biography", "History",
        "Business/Economics", "Self-help", "Health/Fitness",
        "Cooking/Food", "Travel", "Technology"
      ];
  
      const maxTitleLength = 100; // Example limit for title
const minTitleLength = 5;   // Minimum length for title
const maxDescriptionLength = 500; // Already defined
const minDescriptionLength = 20;  // Example minimum for description
const maxContentLength = 10000;   // Example limit for chapter content
const minContentLength = 100;     // Minimum length for chapter content
const maxSizeInMB = 5;

const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
      if (!isFileSizeWithinRange(file, 0.001, maxSizeInMB)) {
          Swal.fire('Error', 'Image size should not exceed 5MB.', 'error');
          return;
      }

      const isDimensionsValid = await isImageDimensionsValid(file, 512, 800);
      if (!isDimensionsValid) {
          Swal.fire('Error', 'Invalid image dimensions.', 'error');
          return;
      }

      try {
         
          setCoverImage(file);
          setSelectedCoverFileName(file.name);
          setCoverPreviewUrl(URL.createObjectURL(file));
      } catch (error) {
          console.error('Error resizing image:', error);
          Swal.fire('Error', 'Failed to resize the image.', 'error');
      }
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

    const auth = getAuth();
      const firebaseId = auth.currentUser?.uid;





const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (title.length < minTitleLength || description.length < minDescriptionLength || content.length < minContentLength) {
          Swal.fire("Error!", "Please ensure all fields meet the minimum length requirements.", "error");
          return;
        }
    
        // Show loading progress dialog
        Swal.fire({
          title: 'Uploading...',
          text: 'Please wait...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: false,
          onBeforeOpen: () => {
              Swal.showLoading();
          }
        });

        let thumbnailUrl = ''; // Declare thumbnailUrl here
        if (thumbnail) {
            try {
                const thumbnailBlob = await resizeImage(coverImage, 256); // Resize the image for thumbnail
                thumbnailUrl = await uploadToAzure(thumbnailBlob, true); // Assign value to thumbnailUrl
            } catch (error) {
                console.error('Error resizing image:', error);
                Swal.fire('Error', 'Failed to resize the image.', 'error');
                return;
            }
        }
    
    
        // Create FormData object
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("content", content);
        formData.append("type", "Text");
        formData.append("author_platform_id", firebaseId);
        formData.append("categories", categories.join(", "));
        formData.append("thumbnailUrl", thumbnailUrl);

    
        // Append cover image if available
        if (coverImage) formData.append("coverimage", coverImage);
    
        try {
            const response = await fetch(`http://localhost:3000/uploadchapter/${firebaseId}`, {
                method: "POST",
                body: formData
            });
            const responseBody = await response.text();
            console.log("Response Status:", response.status);
            console.log("Response Body:", responseBody);
    
            // Close the loading dialog
            Swal.close();
    
            // Check if response is OK and handle accordingly
            if (!response.ok) throw new Error("Error uploading chapter")
            const data = JSON.parse(responseBody);   
            setIsSuccessDialogOpen(true);
            resetForm();
    
        } catch (error) {
            // Handle any errors
            Swal.close();
            Swal.fire("Error!", error.message, "error");
        }
    };
    
 
  

  return (
    <div className="p-8 bg-white shadow-md rounded-lg max-w-md mx-auto">
        <Typography variant="h4" className="text-center mb-6">Upload a Chapter</Typography>

        <form onSubmit={handleSubmit}>
            {/* Title Input */}
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input
                    type="text"
                    id="title"
                    className="w-full p-2 border rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <p className="text-right text-xs">{title.length}/{maxTitleLength}</p>
            </div>

            {/* Description Input */}
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea
                    id="description"
                    className="w-full p-2 border rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <p className="text-right text-xs">{description.length}/{maxDescriptionLength}</p>
            </div>

            {/* Category Selector */}
            <div className="mb-4">
                <Autocomplete
                    multiple
                    options={availableCategories}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    value={categories}
                    onChange={(event, newValue) => setCategories(newValue)}
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Categories" placeholder="Select Categories" />
                    )}
                />
            </div>

            {/* Content Input */}
            <div className="mb-4">
                <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
                <textarea
                    id="content"
                    rows="10"
                    className="w-full p-2 border rounded"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <p className="text-right text-xs">{content.length}/{maxContentLength}</p>
            </div>

            {/* Cover Image Upload */}
            <div className="mb-4">
                <UploadButton
                    onChange={handleImageChange}
                    fileName={selectedCoverFileName}
                    accept=".jpg, .jpeg, .png"
                    label={`Upload Cover Image (Max size: ${maxSizeInMB}MB)`}
                />
                {coverPreviewUrl && (
                    <img src={coverPreviewUrl} alt="Cover Preview" className="mt-4 w-full h-auto" />
                )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
                <SubmitButton buttonText="Upload" />
            </div>
        </form>

        {isSuccessDialogOpen && (
            <SuccessDialog
                isOpen={isSuccessDialogOpen}
                onClose={() => setIsSuccessDialogOpen(false)}
                points={5}
                message="Well done! You're a real YeePlatform author."
            />
        )}
    </div>
  );
};

export default DWrite;