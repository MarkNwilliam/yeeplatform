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
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { getDatabase, ref, get } from 'firebase/database';

const MyChapters = () => {
  const [chapters, setChapters] = useState([]);
  const [open, setOpen] = useState(false);
  const [editedChapter, setEditedChapter] = useState(null);
  const [selectedDocId, setSelectedDocId] = useState('');

  useEffect(() => {
    const fetchChapters = async () => {
      const user = auth.currentUser;
      if (user) {
        const db = getDatabase();
        const chapterIdsRef = ref(
          db,
          `users/${user.uid}/myChapters`
        );
        const chapterIdsSnapshot = await get(chapterIdsRef);
        const chapterIds = chapterIdsSnapshot.val();

        if (chapterIds && chapterIds.length > 0) {
          const q = query(
            collection(firestore, 'chapters'),
            where('authorId', '==', user.uid)
          );
          const querySnapshot = await getDocs(q);
          const chapters = [];
          querySnapshot.forEach((doc) => {
            if (chapterIds.includes(doc.id)) {
              chapters.push({ id: doc.id, ...doc.data() });
            }
          });
          setChapters(chapters);
        }
      }
    };

    fetchChapters();
  }, []);

  const handleClickOpen = (chapter, docId) => {
    setEditedChapter(chapter);
    setSelectedDocId(docId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const chapterDoc = doc(firestore, 'chapters', selectedDocId);
    await updateDoc(chapterDoc, { ...editedChapter });
    setChapters(chapters.map((chapter) => (chapter.id === selectedDocId ? { ...editedChapter } : chapter)));
    setOpen(false);
  };

  const handleDelete = async (docId) => {
    const chapterDoc = doc(firestore, 'chapters', docId);
    await deleteDoc(chapterDoc);
    setChapters(chapters.filter((chapter) => chapter.id !== docId));
  };

  const handleInputChange = (e, field) => {
    setEditedChapter({ ...editedChapter, [field]: e.target.value });
  };

  return (
    <div>
      <Typography variant="h4" component="h2">
        My Chapters
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book Title</TableCell>
              <TableCell>Chapter Name</TableCell>
              <TableCell>Chapter Number</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chapters.map((chapter) => (
              <TableRow key={chapter.id}>
                <TableCell>{chapter.bookTitle}</TableCell>
<TableCell>{chapter.chapterName}</TableCell>
<TableCell>{chapter.chapterNumber}</TableCell>
<TableCell>{chapter.description}</TableCell>
<TableCell>
<Button onClick={() => handleClickOpen(chapter, chapter.id)}>Edit</Button>
<Button onClick={() => handleDelete(chapter.id)}>Delete</Button>
</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</TableContainer>
<Dialog open={open} onClose={handleClose}>
    <DialogTitle>Edit Chapter</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Please edit the chapter information.
      </DialogContentText>
      <TextField
        margin="dense"
        id="chapterName"
        label="Chapter Name"
        type="text"
        fullWidth
        value={editedChapter?.chapterName || ''}
        onChange={(e) => handleInputChange(e, 'chapterName')}
      />
      <TextField
        margin="dense"
        id="chapterNumber"
        label="Chapter Number"
        type="text"
        fullWidth
        value={editedChapter?.chapterNumber || ''}
        onChange={(e) => handleInputChange(e, 'chapterNumber')}
      />
      <TextField
        margin="dense"
        id="description"
        label="Description"
        multiline
            rows={4}
        type="text"
        fullWidth
        value={editedChapter?.description || ''}
        onChange={(e) => handleInputChange(e, 'description')}
      />
      <TextField
        margin="dense"
        id="content"
        label="Content"
        type="text"
        fullWidth
        multiline
            rows={10}
        value={editedChapter?.content || ''}
        onChange={(e) => handleInputChange(e, 'content')}
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

export default MyChapters;
