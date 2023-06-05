import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { ref, set, update, get, onValue } from "firebase/database";


import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Button,
  Typography,
  InputAdornment,
  FormControl,
  OutlinedInput,
  InputLabel,
  Card,
  CardContent,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import "tailwindcss/tailwind.css";
import { auth, database, firestore } from "../firebase";


const AccountPage = () => {
 
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm();


  useEffect(() => {
    const userRef = ref(database, "users/" + auth.currentUser.uid);
  
    const onUserDataChange = (snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.val());
        console.log("This is my data:", JSON.stringify(snapshot.val(), null, 2));
        console.log("This is my data name:", snapshot.val().name);
  
        // Set the values for the form fields
        setValue("name", snapshot.val().name);
        setValue("age", snapshot.val().age);
        setValue("phoneNumber", snapshot.val().phone);
        setValue("country", snapshot.val().country);
      }
    };
  
    const unsubscribe = onValue(userRef, onUserDataChange, {
      onlyOnce: false,
    });
  
    return () => {
      unsubscribe();
    };
  }, [setValue]);
  



  const saveProfile = async (data) => {
    try {
      Swal.fire({
        title: "Updating profile...",
        text: "Please wait...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        onOpen: () => {
          Swal.showLoading();
        },
      });
  
      const userRef = ref(database, "users/" + auth.currentUser.uid);
      await update(userRef, {
        ...data,
      });
  
      console.log("Profile updated for user: ", auth.currentUser.uid);
  
      Swal.fire({
        title: "Success!",
        text: "Your profile has been updated.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
     
      });
    } catch (e) {
      console.error("Error updating user data: ", e);
  
      Swal.fire({
        title: "Error",
        text: "Something went wrong while updating your profile.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  

  const onSubmit = (data) => {
    saveProfile(data);
  };
 


  const becomeAuthor = async () => {
    Swal.fire({
      title: "Please wait...",
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
  
    try {
      const userRef = ref(database, "users/" + auth.currentUser.uid);
      const userSnapshot = await get(userRef);
    
      if (userSnapshot.exists()) {
        await update(userRef, {
          author: true,
          isAuthor: true,
          bio: "A short bio",
          website: "",
          socialLinks: {
            twitter: "",
            linkedin: "",
          },
          genres: [],
          publishedWorks: [],
          authorStatus: "pending",
        });
      } else {
        await set(userRef, {
          author: true,
          isAuthor: true,
          bio: "A short bio",
          website: "",
          socialLinks: {
            twitter: "",
            linkedin: "",
          },
          genres: [],
          publishedWorks: [],
          authorStatus: "pending",
        });
      }
  
      Swal.close();
  
      Swal.fire({
        title: "Congratulations!",
        text: "You are now part of the author community 🎉",
        icon: "success",
        timer: 3000,
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      console.error("Error updating user data:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong while updating your user data.",
        icon: "error",
      });
    }
  };
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#b8860b" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => navigate("/")}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Account
          </Typography>
          <Typography variant="subtitle1" className="mr-4">
            {auth.currentUser.email}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        className="bg-yellow-100 h-full py-10"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/Y.png"
          alt="Logo"
          className="mb-8"
          style={{ maxWidth: "120px", alignSelf: "center" }}
        />
        <Typography variant="h5" className="mb-4">
          Update your profile information
        </Typography>
        <Card style={{ maxWidth: "400px" }}>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* ... (existing code for form fields) */}

              <TextField
  {...register("name")}
  label="Name"
  variant="outlined"
  className="w-full mb-4 rounded"
/>
<TextField
  {...register("age")}
  label="Age"
  type="number"
  variant="outlined"
  className="w-full mb-4 rounded"
/>
<FormControl variant="outlined" className="w-full mb-4">
  <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
  <OutlinedInput
    {...register("phoneNumber")}
    id="phoneNumber"
    startAdornment={
      <InputAdornment position="start">+</InputAdornment>
    }
    label="Phone Number"
    className="rounded"
  />
</FormControl>
<TextField
  {...register("country")}
  label="Country"
  variant="outlined"
  className="w-full mb-4 rounded"
/>


<Button
                type="submit"
                variant="contained"
                onClick={saveProfile}
                sx={{ backgroundColor: "#b8860b" }}
                className="w-2/3 mb-4 rounded"
              >
                Save Changes
              </Button>
            </form>
            <Button
              variant="contained"
              color="error"
              onClick={becomeAuthor}
              className="w-2/3 rounded"
            >
              Become an Author
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AccountPage;