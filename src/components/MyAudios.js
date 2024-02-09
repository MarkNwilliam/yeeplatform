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

import { auth } from '../firebase';
import Swal from 'sweetalert2'; 



const MyAudios = () => {
  const [audiobooks, setAudiobooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [selectedDocId, setSelectedDocId] = useState('');

  const fetchAudiobooks = async () => {
    Swal.showLoading();
    try {
      const response = await fetch(`https://yeeplatformbackend.azurewebsites.net/getauthoraudios?userId=${auth.currentUser.uid}`);
      if (response.ok) {
        const data = await response.json();
        setAudiobooks(data);
      } else {
        throw new Error(`Error fetching audiobooks: ${response.statusText}`);
      }
    } catch (err) {
      console.error("Error fetching audiobooks:", err);
    } finally{
      Swal.close();
    }
  }

  useEffect(() => {
    fetchAudiobooks();
  }, []);



  const handleClickOpen = (description, docId) => {
    setEditedText(description);
    setSelectedDocId(docId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSave = async () => {
    try {
      Swal.showLoading();
      const response = await fetch(`https://yeeplatformbackend.azurewebsites.net/updateABD`, { 
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              bookId: selectedDocId,
              description: editedText
          })
      });

      if (response.ok) {
        const updatedAudiobook = await response.json();
        setAudiobooks(prevBooks => prevBooks.map(ab => ab._id === selectedDocId ? updatedAudiobook : ab));
        setOpen(false);
        fetchAudiobooks();
      } else {
        throw new Error(`Failed to update the description: ${response.statusText}`);
      }
    } catch(err) {
      Swal.fire('Oops...', 'Something went wrong while updating the description!', 'error');
    } finally {
      Swal.close();
        handleClose();
    }
  };

  const handleDelete = async (docId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will permanently delete the audiobook.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.showLoading();
          const response = await fetch(`https://yeeplatformbackend.azurewebsites.net/deleteAudiobook/${docId}`, { method: 'DELETE' });
          if (response.ok) {
            setAudiobooks(prevBooks => prevBooks.filter(book => book._id !== docId));
            Swal.fire('Deleted!', 'The audiobook has been deleted.', 'success');
            fetchAudiobooks(); 
          } else {
            throw new Error(`Failed to delete the book: ${response.statusText}`);
          }
        } catch(err) {
          Swal.fire('Oops...', 'Something went wrong while deleting the book!', 'error');
        } finally {
          Swal.close();
          
          handleClose();
        }
      }
    });
  };
  

  return (
    <div>
      <Typography variant="h4" component="h2">
        My Audio books
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Published On</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {audiobooks.map((audiobook) => (
              <TableRow key={audiobook._id}>
                <TableCell>{audiobook.title}</TableCell>
                <TableCell>{audiobook.publishedDate}</TableCell>
                <TableCell>{audiobook.description}</TableCell>
                <TableCell>{audiobook.duration}</TableCell>
                <TableCell>
                  <Button onClick={() => handleClickOpen(audiobook.description, audiobook._id)}>Edit</Button>
                  <Button onClick={() => handleDelete(audiobook._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {audiobooks.length === 0 && (
          <Typography variant="h6" style={{ textAlign: 'center', padding: '20px', color: 'grey' }}>
            No data available.
          </Typography>
        )}

      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Audiobook Description</DialogTitle>
<DialogContent>
<DialogContentText>
Please edit the description of the selected audiobook.
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

export default MyAudios;
