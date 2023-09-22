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

import { auth, firestore } from '../firebase';

import { doc, getDocs, collection, query, where, updateDoc, deleteDoc } from 'firebase/firestore';

const Mybooks = () => {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [selectedDocId, setSelectedDocId] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(firestore, 'books'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const books = [];
        querySnapshot.forEach((doc) => {
          books.push({ id: doc.id, ...doc.data() });
        });
        setBooks(books);
      }
    };

    fetchBooks();
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
    const bookDoc = doc(firestore, 'books', selectedDocId);
    await updateDoc(bookDoc, { description: editedText });
    setBooks(books.map((book) => (book.id === selectedDocId ? { ...book, description: editedText } : book)));
    setOpen(false);
  };

  const handleDelete = async (docId) => {
    const bookDoc = doc(firestore, 'books', docId);
    await deleteDoc(bookDoc);
    setBooks(books.filter((book) => book.id !== docId));
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
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.subtitle}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell>{book.publicationDate}</TableCell>
                <TableCell>
                  <Button onClick={() => handleClickOpen(book.description, book.id)}>Edit</Button>
                  <Button onClick={() => handleDelete(book.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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



