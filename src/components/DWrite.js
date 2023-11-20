import React, { useState } from "react";
import {
    Button,
    TextField,
    Box,
    Typography,
    InputLabel,
    FormControl,
    Dialog,
    DialogTitle,
    DialogContent,
  } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import Swal from "sweetalert2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload"; 
import Lottie from 'lottie-react';
import congs1Animation from '../animations/congs.json';
import { getAuth } from "firebase/auth";



const DWrite = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [selectedCoverFileName, setSelectedCoverFileName] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setContent('');
        setCoverImage(null);
        setSelectedCoverFileName('');
    };

    const auth = getAuth();
      const firebaseId = auth.currentUser?.uid;

    const handleSubmit = async (e) => {
      e.preventDefault();
  
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
    
  
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("type", "Text");
      formData.append("author_platform_id", firebaseId);
    
      if (coverImage) formData.append("coverimage", coverImage);
  
      
  
      try {
          const response = await fetch(`http://localhost:3000/uploadchapter/${firebaseId}`, {
              method: "POST",
              body: formData
          });
          
          Swal.close();


          if (!response.ok) throw new Error("Error uploading chapter");
          
          const data = await response.json();
  
         
      
          setDialogOpen(true);

              
          resetForm();

      } catch (error) {
          // Close the progress dialog and show the error message
          Swal.close();
          Swal.fire("Error!", error.message, "error");
      }
  };
  

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
            <Typography variant="h4" className="text-center mb-6">
                Upload a Chapter
            </Typography>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="w-full p-2 border rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows="3"
                        className="w-full p-2 border rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        Content
                    </label>
                    <textarea
                        id="content"
                        rows="10"
                        className="w-full p-2 border rounded"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                  

<label className="block text-gray-700 text-sm font-bold mb-2">Upload Cover Image:</label>
          <label className={`w-full flex items-center px-4 py-2 rounded-lg shadow-lg tracking-wide uppercase border cursor-pointer hover:bg-blue-500 hover:text-white ${selectedCoverFileName ? "bg-blue-500 text-white" : "bg-white text-blue-500 border-blue-500"}`}>
            <CloudUploadIcon className="mr-2" />
            {selectedCoverFileName || "Choose Cover Image"}
            <input
              type="file"
              onChange={(e) => {
                setCoverImage(e.target.files[0]);
                setSelectedCoverFileName(e.target.files[0]?.name || "");
              }}
              className="hidden"
              accept=".jpg, .jpeg, .png"
              required
            />
          </label>
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
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
<span className="text-4xl text-yellow-500">5 Points!</span>

        </div>
        <p>Your content will be available in the marketplace soon.</p>
    </DialogContent>
</Dialog>
        </div>
    );
};

export default DWrite;
