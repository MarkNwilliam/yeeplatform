import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Box,
  Chip,
} from "@mui/material";
import { getDatabase, ref as dbRef, update , get} from "firebase/database";
import Swal from "sweetalert2";
import { getDownloadURL } from "firebase/storage";
import { styled } from "@mui/system";
import { useForm, Controller } from "react-hook-form";
import ImageIcon from "@mui/icons-material/Image";
import Autocomplete from "@mui/material/Autocomplete";
import { useAuth } from "../contexts/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { storage, firestore } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";

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

function DUpload() {
  const { user } = useAuth();

  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const coverImage = watch("coverImage");
  const backImage = watch("backImage");
  const ebookPdf = watch("ebookPdf");


  const [coverImageName, setCoverImageName] = useState("");
  const [backImageName, setBackImageName] = useState("");
  const [ebookPdfName, setEbookPdfName] = useState("");

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
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "User not logged in. Please log in before submitting the data.",
      });
      return;
    }

    const submitData = async (formValues) => {
      // Display Swal progress
      Swal.fire({
        title: "Uploading Data...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const bookData = {
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          categories: data.categories,
          targetAudiences: data.targetAudiences,
          publicationDate: data.publicationDate,
          isbn: data.isbn,
          userId: user.uid,
          createdAt: new Date(),
          };


  console.log("Bow getting urls ...")
              // Check if files are available before accessing their 0 index

 

      const coverImageRef = ref(
        storage,
        `coverImages/${user.uid}/${data.title}/coverImage`
      );
      await uploadBytes(coverImageRef, coverImage[0]);
      const coverImageURL = await getDownloadURL(coverImageRef);
      bookData.coverImageURL = coverImageURL;

      console.log("url coverimage"+coverImageURL)
    
  


      const backImageRef = ref(
        storage,
        `backImages/${user.uid}/${data.title}/backImage`
      );
      await uploadBytes(backImageRef, backImage[0]);
      const backImageURL = await getDownloadURL(backImageRef);
      bookData.backImageURL = backImageURL;
      console.log("url  backImageURL"+ backImageURL)
    

      const ebookPdfRef = ref(
        storage,
        `ebookPdfs/${user.uid}/${data.title}/ebookPdf`
      );
      await uploadBytes(ebookPdfRef, ebookPdf[0]);
      const ebookPdfURL = await getDownloadURL(ebookPdfRef);
      bookData.ebookPdfURL = ebookPdfURL;
      console.log("url  backImageURL"+ ebookPdfURL)

    // Generate a unique ID for the book and save the book data to Firestore
    const booksCollection = collection(firestore, "books");
    const bookDocRef = await addDoc(booksCollection, bookData);

    // Get the book ID
    const bookId = bookDocRef.id;

    console.log("Book successfully submitted with ID:", bookId);

    // Update the user's data in the Realtime Database
    const database = getDatabase();
    const userRef = dbRef(database, `users/${user.uid}`);

    // Retrieve the current list of book IDs
    const userSnapshot = await get(userRef);

    // Update the list of book IDs
    let myBooks = [];
    if (userSnapshot.exists() && userSnapshot.val().myBooks) {
      myBooks = userSnapshot.val().myBooks;
    }

    myBooks.push(bookId);
    await update(userRef, { myBooks });

    console.log("Book successfully submitted");

      // Close the progress Swal
      Swal.close();

      // Display the success Swal
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your book has been successfully submitted.",
        showConfirmButton: true,
      });
  } 
  catch (error) {
    console.error("Error submitting the book:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "An error occurred while submitting the book.",
    });
  } finally {
    setUploading(false);
  
  }
};

// Pass the form values to submitData function
await submitData(data);

// Clear the form after successful submission
reset();
setCoverImageName("");
 setBackImageName("");
 setEbookPdfName("");
};

const handleClear = () => {
reset();
setCoverImageName("");
 setBackImageName("");
 setEbookPdfName("");
};

const handleFileInputChange = (event, fileType) => {
if (event.target.files.length > 0) {
const fileName = event.target.files[0].name;
switch (fileType) {
case "coverImage":
setCoverImageName(fileName);
break;
case "backImage":
setBackImageName(fileName);
break;
case "ebookPdf":
setEbookPdfName(fileName);
break;
default:
break;
}
} else {
switch (fileType) {
case "coverImage":
  setCoverImageName("");
break;
case "backImage":
setBackImageName("");
break;
case "ebookPdf":
setEbookPdfName("");
break;
default:
break;
}
}
};

return (
<>
<Typography variant="h4" gutterBottom>
Submit your Book
</Typography>
<Form onSubmit={handleSubmit(onSubmit)}>
<Grid container spacing={2}>
<Grid item xs={12}>
<TextField
fullWidth
label="Book Title"
variant="outlined"
{...register("title", { required: "Please enter the book title" })}
error={!!errors.title}
helperText={errors.title?.message}
/>
</Grid>
<Grid item xs={12}>
        <TextField
          fullWidth
          label="Book Subtitle"
          variant="outlined"
          {...register("subtitle")}
          error={!!errors.subtitle}
          helperText={errors.subtitle?.message}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Book Description"
          variant="outlined"
          {...register("description", { required: "Please enter the book description" })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="categories"
          control={control}
          defaultValue={[]}
          rules={{ required: "Please select at least one category" }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              onChange={(_, data) => field.onChange(data)}
              multiple
              options={categories}
              getOptionLabel={(option) => option}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    key={index}
                    {...getTagProps({ index })}
                    disabled={true}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categories"
                  variant="outlined"
                  fullWidth
                  helperText={errors.categories?.message}
                  error={!!errors.categories}
                />
              )}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="targetAudiences"
          control={control}
          defaultValue={[]}
          rules={{ required: "Please select at least one target audience" }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              onChange={(_, data) => field.onChange(data)}
              multiple
              options={targetAudiences}
              getOptionLabel={(option) => option}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    key={index}
                    {...getTagProps({ index })}
                    disabled={true}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Target Audiences"
                  variant="outlined"
                  fullWidth
                  helperText={errors.targetAudiences?.message}
                  error={!!errors.targetAudiences}
                />
              )}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Publication Date (if published)"
          type="date"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          {...register("publicationDate")}
          error={!!errors.publicationDate}
          helperText={errors.publicationDate?.message}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="ISBN (if applicable)"
      variant="outlined"
      {...register("isbn")}
      error={!!errors.isbn}
      helperText={errors.isbn?.message}
    />
  </Grid>

  <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Upload Cover Image (JPG, PNG)
        </Typography>
        <FileInput
          accept="image/jpeg, image/png"
          id="cover-image"
          type="file"
          {...register("coverImage", {
            required: "Please upload a cover image in JPG or PNG format",
          })}
          onChange={(event) => handleFileInputChange(event, "coverImage")}
        />
        <label htmlFor="cover-image">
          <Button
            component="span"
            variant="outlined"
            startIcon={<ImageIcon />}
          >
             {coverImageName ? coverImageName : "Upload Cover Image"}
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

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Upload Back Image (JPG, PNG)
        </Typography>
        <FileInput
          accept="image/jpeg, image/png"
          id="back-image"
          type="file"
          {...register("backImage", {
            required: "Please upload a back image in JPG or PNG format",
          })}
          onChange={(event) => handleFileInputChange(event, "backImage")}
        />
        <label htmlFor="back-image">
          <Button
            component="span"
            variant="outlined"
            startIcon={<ImageIcon />}
          >
            {backImageName ? backImageName : "Upload Back Image"}
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

  <Grid item xs={12}>
    <Typography variant="h6" gutterBottom>
      Upload Ebook (PDF format)
    </Typography>
    <FileInput
      accept=".pdf"
      id="ebook-pdf"
      type="file"
      {...register("ebookPdf", {
        required: "Please upload the ebook in PDF format",
      })}
      onChange={(event) => handleFileInputChange(event, "ebookPdf")}
    />
    <label htmlFor="ebook-pdf">
      <Button component="span" variant="outlined" startIcon={<ImageIcon />}>
      {ebookPdfName ? ebookPdfName : " Upload Ebook PDF"}
       
      </Button>
    </label>
    {errors.ebookPdf && (
      <Box mt={1}>
        <Typography variant="caption" color="error">
          {errors.ebookPdf.message}
        </Typography>
      </Box>
    )}
  </Grid>

  <Grid container spacing={3} alignItems="center">
    <Grid item xs={12} sm={6}>
      <SubmitButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        style={{ borderRadius: "50px" }}
      >
        Submit
      </SubmitButton>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        style={{ borderRadius: "50px" }}
        onClick={handleClear}
      >
        Clear
      </Button>
    </Grid>
  </Grid>
</Grid>
</Form>
</>
  );
}
export default DUpload;
