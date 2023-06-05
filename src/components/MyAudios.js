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

const MyAudios = () => {
  const [audiobooks, setAudiobooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [selectedDocId, setSelectedDocId] = useState('');

  useEffect(() => {
    const fetchAudiobooks = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(firestore, 'audio'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const audiobooks = [];
        querySnapshot.forEach((doc) => {
          audiobooks.push({ id: doc.id, ...doc.data() });
        });
        setAudiobooks(audiobooks);
      }
    };

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
    const audiobookDoc = doc(firestore, 'audio', selectedDocId);
    await updateDoc(audiobookDoc, { description: editedText });
    setAudiobooks(audiobooks.map((audiobook) => (audiobook.id === selectedDocId ? { ...audiobook, description: editedText } : audiobook)));
    setOpen(false);
  };

  const handleDelete = async (docId) => {
    const audiobookDoc = doc(firestore, 'audio', docId);
    await deleteDoc(audiobookDoc);
    setAudiobooks(audiobooks.filter((audiobook) => audiobook.id !== docId));
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
              <TableCell>Author</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {audiobooks.map((audiobook) => (
              <TableRow key={audiobook.id}>
                <TableCell>{audiobook.title}</TableCell>
                <TableCell>{audiobook.author}</TableCell>
                <TableCell>{audiobook.description}</TableCell>
                <TableCell>{audiobook.duration}</TableCell>
                <TableCell>
                  <Button onClick={() => handleClickOpen(audiobook.description, audiobook.id)}>Edit</Button>
                  <Button onClick={() => handleDelete(audiobook.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
