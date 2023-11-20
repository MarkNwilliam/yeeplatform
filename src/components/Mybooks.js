import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import Swal from 'sweetalert2'; 
import { auth } from '../firebase';



const Mybooks = () => {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [selectedDocId, setSelectedDocId] = useState('');

  
  const fetchBooks = async () => {
    try {
      Swal.showLoading();  // Show the loading indicator
  
      const authorId = auth.currentUser.uid;
      console.log("here is the author id"+authorId)
      const response = await fetch(`http://localhost:3000/getAllBooks/${authorId}`);
      const data = await response.json();
      setBooks(data);
  
      Swal.close();  // Close the loading indicator once data is fetched
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while fetching books!',
      });
    }
  };
  

  useEffect(() => {
  

    fetchBooks();
}, []);


const handleDeleteConfirmation = (book) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await handleDelete(book._id);
      fetchBooks();
      Swal.fire(
        'Deleted!',
        'Your book has been deleted.',
        'success'
      );
    }
  });
};


  const handleClickOpen = (description, docId) => {
    setEditedText(description);
    setSelectedDocId(docId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const handleDelete = async (docId) => {
    try {
      Swal.showLoading();  // Show the loading indicator
  
      const response = await fetch(`http://localhost:3000/deleteBook/${docId}`, { method: 'DELETE' });
      if(response.status === 200) {
          setBooks(prevBooks => prevBooks.filter(book => book.id !== docId));
      } else {
          throw new Error("Failed to delete the book.");  // Throw an error to be caught below
      }
      Swal.close();  // Close the loading indicator once deletion is complete
  
    } catch(err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while deleting the book!',
      });
    }
  };
  


  const handleSave = async () => {
    try {
      Swal.showLoading();  // Show the loading indicator
      console.log("Here is book id "+selectedDocId)
      const response = await fetch(`http://localhost:3000/updateDescription`, { 
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              bookId: selectedDocId,
              description: editedText
          })

         
      });
      if(response.status === 200) {
          setBooks(prevBooks => prevBooks.map(book => book.id === selectedDocId ? {...book, description: editedText} : book));
          setOpen(false);
      } else {
          throw new Error("Failed to update the description.");  // Throw an error to be caught below
      }
      Swal.close();  // Close the loading indicator once update is complete
  
    } catch(err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while updating the description!',
      });
    }
  };
  



  return (
    <div>
      <Typography variant="h4" component="h2">
        My Books
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Subtitle</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Publication Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.subtitle}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell>{book.publicatedDate}</TableCell>
                <TableCell>
                  <Button onClick={() => handleClickOpen(book.description, book._id)}>Edit</Button>
                  <Button onClick={() => handleDeleteConfirmation(book)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {books.length === 0 && (
          <Typography variant="h6" style={{ textAlign: 'center', padding: '20px', color: 'grey' }}>
            No data available.
          </Typography>
        )}
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Book Description</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit the description of the selected book.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Mybooks;



