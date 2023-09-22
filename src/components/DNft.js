import React from "react";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Box,
  Chip
} from "@mui/material";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
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

function DNft() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

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

  return (
    <>
       <Typography variant="h4" gutterBottom>
        Create NFT
      </Typography>
      <Typography color="error" variant="subtitle1">
        Note: This page is still in the test phase.
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Number of Shares"
              variant="outlined"
              type="number"
              {...register("shares", { required: "Please enter the number of shares" })}
              error={!!errors.shares}
              helperText={errors.shares?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Share Price (in ETH)"
              variant="outlined"
              type="number"
              {...register("sharePrice", { required: "Please enter the share price in ETH" })}
              error={!!errors.sharePrice}
              helperText={errors.sharePrice?.message}
            />
          </Grid>
     
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
            <Autocomplete
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
              control={control}
              name="categories"
              rules={{ required: "Please select at least one category" }}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
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
              control={control}
              name="targetAudiences"
              rules={{ required: "Please select at least one target audience" }}
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
            />
            <label htmlFor="cover-image">
              <Button
                component="span"
                variant="outlined"
                startIcon={<ImageIcon />}
              >
                Upload Cover Image
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
            />
            <label htmlFor="back-image">
              <Button
                component="span"
                variant="outlined"
                startIcon={<ImageIcon />}
              >
                Upload Back Image
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
        />
        <label htmlFor="ebook-pdf">
          <Button component="span" variant="outlined" startIcon={<ImageIcon />}>
            Upload Ebook PDF
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

      <Grid item xs={12}>
        <SubmitButton type="submit" fullWidth variant="contained" color="primary">
          Submit
        </SubmitButton>
      </Grid>
    </Grid>
  </Form>
</>
);
}

export default DNft;