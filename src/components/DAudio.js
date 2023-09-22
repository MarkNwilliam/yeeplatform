import React, { useState } from "react";
import Swal from "sweetalert2";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { auth, firestore, storage } from "../firebase";
import { getDatabase, ref as dbRef,get ,update} from "firebase/database";


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
} from "@mui/material";
import { styled } from "@mui/system";
import { useForm, Controller } from "react-hook-form";
import ImageIcon from "@mui/icons-material/Image";
import Autocomplete from "@mui/material/Autocomplete";

const FileInput = styled("input")({
  display: "none",
});

const Form = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

function DAudio() {
  const [coverImageUploaded, setCoverImageUploaded] = useState(false);
  const [backImageUploaded, setBackImageUploaded] = useState(false);
  const [audiobookMp3Uploaded, setAudiobookMp3Uploaded] = useState(false)
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm();
  const [coverImageName, setCoverImageName] = useState("");
  const [audiobookMp3Name, setAudiobookMp3Name] = useState("");
  const [backImageName, setBackImageName] = useState("");


  const handleClear = () => {
    setCoverImageUploaded(false);
    setBackImageUploaded(false);
    setAudiobookMp3Uploaded(false);
    reset();
  };

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

 
 

  const onSubmit = async (data) => {
    const user = auth.currentUser;
    if (!user) {
      console.log("User not authenticated");
      return;
    }
    console.log("Clicked submit ")
    console.log("Data received from the form:");
console.log(data);
    console.log("data.coverImage:", data.coverImage);
console.log("data.backImage:", data.backImage);
console.log("data.audiobookMp3:", data.audiobookMp3);


    
    // Show progress bar
    Swal.fire({
      title: "Uploading Audiobook",
      html: "Please wait...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    try {
      // Upload cover image to Firebase Storage
      const coverImageRef = ref(storage, `coverImages/${user.uid}/${data.title}/coverImage`);
      await uploadBytes(coverImageRef, data.coverImage[0]);
      const coverImageUrl = await getDownloadURL(coverImageRef);
  console.log("This is my "+coverImageUrl)
      // Upload back image to Firebase Storage
      const backImageRef = ref(storage, `backImages/${user.uid}/${data.title}/backImage`);
      await uploadBytes(backImageRef, data.backImage[0]);
      const backImageUrl = await getDownloadURL(backImageRef);
      console.log("This is my "+backImageUrl)
      // Upload audiobook to Firebase Storage
      const audiobookRef = ref(storage, `audiobooks/${user.uid}/${data.title}/audiobook`);
      await uploadBytes(audiobookRef, data.audiobookMp3[0]);
      const audiobookUrl = await getDownloadURL(audiobookRef);
  
      // Save the audiobook metadata to Firestore
      const audiobookDoc = {
        title: data.title,
        author: data.author,
        description: data.description,
        categories: data.categories,
        targetAudience: data.targetAudience,
        voice: data.voice,
        duration: data.duration,
        language: data.language,
        coverImage: coverImageUrl,
        backImage: backImageUrl,
        audiobookUrl: audiobookUrl,
        userId: user.uid,
      };
      const database = getDatabase();
      const docRef = await addDoc(collection(firestore, "audio"), audiobookDoc);

      // Add the audiobook ID to the user's myAudiobooks array in the Realtime Database
      const userRef =  dbRef(database, `users/${user.uid}`);
      const userSnapshot = await get(userRef);
      let myAudiobooks = [];
  
      if (userSnapshot.exists() && userSnapshot.val().myAudiobooks) {
        myAudiobooks = userSnapshot.val().myAudiobooks;
      }
      myAudiobooks.push(docRef.id);
      await update(userRef, { myAudiobooks: myAudiobooks });
  
      // Close progress bar and show success alert
      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Audiobook Uploaded",
        text: "Your audiobook has been successfully uploaded.",
        confirmButtonText: "OK",
      });
  
      console.log("Audiobook added with ID:", docRef.id);

      reset();
      setCoverImageUploaded(false);
      setBackImageUploaded(false);
      setAudiobookMp3Uploaded(false);

    } catch (error) {
      // Close progress bar and show error alert
    
      Swal.close();
console.error("Error:", error);

Swal.fire({
  icon: "error",
  title: "Upload Failed",
  text: "An error occurred while uploading your audiobook. Please try again.",
  confirmButtonText: "OK",
});
    
       
    

    }
  };
  


  
  return (
    <>
    <Typography component="h1" variant="h5">
      Audiobook Submission
    </Typography>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Audiobook Title"
              variant="outlined"
              {...register("title", { required: "Please enter the audiobook title" })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Author"
              variant="outlined"
              {...register("author", { required: "Please enter the author's name" })}
              error={!!errors.author}
              helperText={errors.author?.message}
            />
          </Grid>

          {/* Add other fields as necessary */}

     
<Grid item xs={12}>
  <Controller
    name="categories"
  control={control}
  defaultValue={[]}
    rules={{ required: "Please select at least one category" }}
    render={({ field }) => (
      <Autocomplete
        multiple
        options={categories}
        {...field}
        onChange={(_, data) => field.onChange(data)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Categories"
            placeholder="Select categories"
            variant="outlined"
            error={!!errors.categories}
            helperText={errors.categories?.message}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip key={option} label={option} {...getTagProps({ index })} />
          ))
        }
      />
    )}
  />
</Grid>
      
<Grid item xs={12}>
  <Controller
    name="targetAudience"
  control={control}
  defaultValue={[]}
    rules={{ required: "Please select at least one target audience" }}
    render={({ field }) => (
      <Autocomplete
        multiple
        options={targetAudiences}
        {...field}
        onChange={(_, data) => field.onChange(data)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Target Audience"
            placeholder="Select target audience"
            variant="outlined"
            error={!!errors.targetAudience}
            helperText={errors.targetAudience?.message}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip key={option} label={option} {...getTagProps({ index })} />
          ))
        }
      />
    )}
  />
</Grid>

          {/* Voice */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="voice">Voice</InputLabel>
              <Select
                label="Voice"
                {...register("voice", { required: "Please select a voice" })}
                error={!!errors.voice}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            {errors.voice && (
              <Box mt={1}>
                <Typography variant="caption" color="error">
                  {errors.voice.message}
                </Typography>
              </Box>
            )}
          </Grid>

          {/* Duration */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Duration (in minutes)"
              type="number"
              variant="outlined"
              {...register("duration", {
                required: "Please enter the audiobook duration",
                min: { value: 1, message: "Duration must be at least 1 minute" },
              })}
              error={!!errors.duration}
              helperText={errors.duration?.message}
            />
          </Grid>


          <Grid item xs={12}>
  <TextField
    fullWidth
    label="Description"
    variant="outlined"
    multiline
    rows={4}
    {...register("description", { required: "Please enter a description" })}
    error={!!errors.description}
    helperText={errors.description?.message}
  />
</Grid>


<Grid item xs={12}>
      <Controller
        name="language"
        control={control}
        defaultValue={null}
        rules={{ required: "Please select a language" }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={africanLanguages}
            getOptionLabel={(option) => option.label}
            value={field.value ? africanLanguages.find(lang => lang.code === field.value) : null}
            onChange={(_, data) => field.onChange(data ? data.code : null)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Language"
                variant="outlined"
                error={!!errors.language}
                helperText={errors.language?.message}
              />
            )}
          />
        )}
      />
    </Grid>


     {/* Cover Image */}
<Grid item xs={12}>
  <Typography variant="h6" gutterBottom>
    Upload Cover Image (JPG, PNG)
  </Typography>
  <FileInput
    accept="image/jpeg, image/png"
    id="cover-image"
    name="coverImage"
    type="file"
    {...register("coverImage", {
      required: "Please upload a cover image in JPG or PNG format",
    })}
    onChange={(e) => {
      setCoverImageUploaded(e.target.files[0]?.name || false);
    }}
  />
  <label htmlFor="cover-image">
    <Button
      component="span"
      variant="outlined"
      startIcon={<ImageIcon />}
      style={coverImageUploaded ? { color: "green" } : {}}
    >
      {coverImageUploaded || "Upload Cover Image"}
    </Button>
  </label>
  {errors.coverImage && (
    <Box mt={1}>
      <Typography variant="caption" color="error">
        {errors.coverImage.message}
      </Typography>
    </Box>
  )}
</Grid>

{/* Back Image */}
<Grid item xs={12}>
  <Typography variant="h6" gutterBottom>
    Upload Back Image (JPG, PNG)
  </Typography>
  <FileInput
    accept="image/jpeg, image/png"
    id="back-image"
    name="backImage"
    type="file"
    {...register("backImage", {
      required: "Please upload a back image in JPG or PNG format",
    })}
    onChange={(e) => {
      setBackImageUploaded(e.target.files[0]?.name || false);
    }}
  />
  <label htmlFor="back-image">
    <Button
      component="span"
      variant="outlined"
      startIcon={<ImageIcon />}
      style={backImageUploaded ? { color: "green" } : {}}
    >
      {backImageUploaded || "Upload Back Image"}
    </Button>
  </label>
  {errors.backImage && (
    <Box mt={1}>
      <Typography variant="caption" color="error">
        {errors.backImage.message}
      </Typography>
    </Box>
  )}
</Grid>

{/* Audiobook Upload */}
<Grid item xs={12}>
  <Typography variant="h6" gutterBottom>
    Upload Audiobook (MP3 format)
  </Typography>
  <FileInput
    accept=".mp3"
    id="audiobook-mp3"
    name="audiobookMp3"
    type="file"
    {...register("audiobookMp3", {
      required: "Please upload the audiobook in MP3 format",
    })}
    onChange={(e) => {
      setAudiobookMp3Uploaded(e.target.files[0]?.name || false);
    }}
  />
  <label htmlFor="audiobook-mp3">
    <Button
      component="span"
      variant="outlined"

      startIcon={<ImageIcon />}
      style={audiobookMp3Uploaded ? { color: "green" } : {}}
    >
      {audiobookMp3Uploaded || "Upload Audiobook MP3"}
    </Button>
  </label>
  {errors.audiobookMp3 && (
    <Box mt={1}>
      <Typography variant="caption" color="error">
        {errors.audiobookMp3.message}
      </Typography>
    </Box>
  )}
</Grid>

{/* Submit Button */}
<Grid item xs={12}>
<Box display="flex" justifyContent="space-between">
  
<SubmitButton
  type="submit"
  fullWidth
  variant="contained"
  color="primary"
  sx={{
    borderRadius: "50px",
    "@media (max-width:600px)": {
      width: "100%",
    },
  }}
>
  Submit
</SubmitButton>

<Button
  variant="outlined"
  color="secondary"
  onClick={handleClear}
  sx={{
    borderRadius: "50px",
    "@media (max-width:600px)": {
      width: "100%",
    },
  }}
>
  Clear
</Button>


  </Box>


</Grid>
</Grid>
</Form>
</>
);
}

export default DAudio;
