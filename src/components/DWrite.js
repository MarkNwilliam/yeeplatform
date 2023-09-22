import React, { useState } from "react";
import {
    Button,
    TextField,
    Box,
    Typography,
    InputLabel,
    FormControl,
  } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import Swal from "sweetalert2";
import {
  storage,
  firestore
} from "../firebase";
import { getAuth } from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import {
  getDatabase,
  ref as dbRef,
  set,
  update,
  get
} from "firebase/database";
import {
  collection,
  addDoc
} from "firebase/firestore";

const DWrite = () => {
  const [chapterData, setChapterData] = useState({
    bookTitle: "",
    chapterNumber: "",
    chapterName: "",
    description: "",
    content: "",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setCoverImage(file);
    setSelectedFileName(file.name);
  };

  const validateContent = (content) => {
    const minLength = 20;
    const maxLength = 5000; // Set an appropriate maximum length
    return content.length >= minLength && content.length <= maxLength;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChapterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    Swal.fire({
      title: "Submitting...",
      html: "Please wait while your chapter is being submitted.",
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  
    try {
      const user = getAuth().currentUser;
      const userId = user.uid;
  
      let downloadURL = null;
  
      // Upload cover image to Firebase Storage (if selected)
      if (coverImage) {
        const storageRef = ref(storage, `cover_images/${coverImage.name}`);
        const snapshot = await uploadBytes(storageRef, coverImage);
  
        // Get download URL for cover image
        downloadURL = await getDownloadURL(snapshot.ref);
        console.log("this is url" + downloadURL);
        console.log(firestore);
      }
  
      // Add chapter data and cover image URL to Firestore
      const docRef = await addDoc(collection(firestore, "chapters"), {
        bookTitle: chapterData.bookTitle,
        chapterNumber: chapterData.chapterNumber,
        chapterName: chapterData.chapterName,
        description: chapterData.description,
        content: chapterData.content,
        coverImageURL: downloadURL,
        authorId: userId,
      });
  
      // Add chapter ID to user's data in Realtime Database
      const chapterId = docRef.id;
  
      // Update the user's data in the Realtime Database
      const database = getDatabase();
      const userRef = dbRef(database, `users/${user.uid}`);
  
      // Retrieve the current list of book IDs
      const userSnapshot = await get(userRef);
  
      let myChapters = [];
      if (userSnapshot.exists() && userSnapshot.val().myChapters) {
        myChapters = userSnapshot.val().myChapters;
      } else {
        await set(userRef, { myChapters: [] });
      }
  
      myChapters.push(chapterId);
      await update(userRef, { myChapters });
  
      console.log("chapter successfully submitted");
      console.log("Document written with ID: ", docRef.id);
  
      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Chapter Submitted",
        text: "Your chapter has been successfully submitted.",
      });
    } catch (error) {
      console.error(error);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
      });
    }
  };
  

  

  return (
    <form onSubmit={handleFormSubmit}>
      <Box mb={2}>
        <TextField
          label="Book Title"
          name="bookTitle"
          value={chapterData.bookTitle}
          onChange={handleInputChange}
          required
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Chapter Number"
          name="chapterNumber"
          value={chapterData.chapterNumber}
          onChange={handleInputChange}
          required
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Chapter Name"
          name="chapterName"
          value={chapterData.chapterName}
          onChange={handleInputChange}
          required
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Description"
          name="description"
          value={chapterData.description}
          onChange={handleInputChange}
          required
          multiline
          rows={3}
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Content"
          name="content"
          value={chapterData.content}
          onChange={handleInputChange}
          required
          multiline
          rows={10}
          fullWidth
          error={!validateContent(chapterData.content)}
          helperText={
            !validateContent(chapterData.content)
              ? "Content must be between 20 and 5000 characters."
              : ""
          }
        />
      </Box>
      <Box mb={2}>
        <InputLabel htmlFor="cover-image">Cover Image</InputLabel>
        <FormControl fullWidth>
          <Button
            variant="outlined"
            component="label"
            htmlFor="cover-image"
            fullWidth
          >
            Choose File
          </Button>
          <input
            type="file"
            id="cover-image"
            onChange={handleFileUpload}
            accept="image/*"
            style={{ display: "none" }}
          />
        </FormControl>
        {selectedFileName && (
          <Typography variant="body2" color="textSecondary">
            {selectedFileName}
          </Typography>
        )}
      </Box>
      <Box mb={2}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<AddCircle />}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default DWrite;