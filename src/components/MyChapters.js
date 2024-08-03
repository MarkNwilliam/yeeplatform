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


const MyChapters = () => {
  const [chapters, setChapters] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [audioChapters, setAudioChapters] = useState([]); 
  const [editedChapter, setEditedChapter] = useState(null);
  const [editedAudioChapter, setEditedAudioChapter] = useState(null);
  const [selectedDocId, setSelectedDocId] = useState('');
  const [openAudioEdit, setOpenAudioEdit] = useState(false);
  const [selectedAudioDocId, setSelectedAudioDocId] = useState('');

  const fetchChapters = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const response = await fetch(`https://yeeplatformbackend.azurewebsites.net/getauthorchapter/${user.uid}`);
        if (!response.ok) {
          
          const errorData = await response.json();
          throw new Error(errorData.message || 'An error occurred while fetching the chapters.');
        }
        const data = await response.json();
        setChapters(data);
        setError(""); 
      } catch (error) {
        console.error("Error fetching text chapters:", error);
        setError(error.toString());
        setChapters([]);
      }
    } else {
      setError("No user found in auth.");
    }
  };
  

  const fetchAudioChapters = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const response = await fetch(`https://yeeplatformbackend.azurewebsites.net/getAudioChapters/${user.uid}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'An error occurred while fetching the audio chapters.');
        }
        const data = await response.json();
        setAudioChapters(data);
        setError("");
      } catch (error) {
        console.error("Error fetching audio chapters:", error);
        setError(error.toString());
        setAudioChapters([]);
      }
    } else {
      setError("No user found in auth.");
    }
  };
  

  const refreshChapters = () => {
    fetchChapters();
    fetchAudioChapters();
  };
  

  useEffect(() => {
    // Call both functions to fetch data on component mount
    fetchChapters();
    fetchAudioChapters();
  }, []);

  const handleClickOpen = (chapter, docId) => {
    console.log("Opening chapter for edit:", chapter);
    setEditedChapter(chapter);
    setSelectedDocId(docId);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    // Start loading, e.g. with a loading spinner or similar
    try {
      const response = await fetch(`https://yeeplatformbackend.azurewebsites.net/updatechapter/${selectedDocId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedChapter),
      });
  
      if (response.ok) {
        // Update the local state to reflect the changes
        setChapters(chapters.map((chapter) => (chapter.id === selectedDocId ? { ...editedChapter } : chapter)));
        // Close the dialog and stop loading
        setOpen(false);
      } else {
        throw new Error('Failed to update the chapter.');
      }
    } catch (error) {
      console.error('Error updating chapter:', error);
      // Handle the error state, stop loading, alert the user, etc.
    }
  };
  

  const handleInputChange = (e) => {
    setEditedChapter({ ...editedChapter, description: e.target.value });
  };
  

  

  const handleAudioInputChange = (e, field) => {
    setEditedAudioChapter({ ...editedAudioChapter, [field]: e.target.value });
  };

 

  


  // Function to open the edit dialog for audio chapters
  const handleClickOpenAudio = (audioChapter, docId) => {
    setEditedAudioChapter(audioChapter);
    setSelectedAudioDocId(docId);
    setOpenAudioEdit(true);
  };


const handleTextChapterSave = async () => {
  Swal.fire({
    title: 'Saving chapter...',
    onBeforeOpen: () => {
      Swal.showLoading();
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });

  try {
    const response = await fetch(`https://yeeplatformbackend.azurewebsites.net/updatechapter/${selectedDocId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedChapter),
    });

    if (response.ok) {
      setOpen(false);
      Swal.fire('Success', 'Chapter updated successfully', 'success');
      refreshChapters(); // Reload chapters after successful update
    } else {
      throw new Error('Failed to update the chapter.');
    }
  } catch (error) {
    console.error('Error updating chapter:', error);
    Swal.fire('Error', 'There was a problem saving the chapter', 'error');
  }
};


const handleDelete = async (docId, isAudio = false) => {
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
      // Start loading
      Swal.showLoading();
      
      try {
      
        const deleteEndpoint = isAudio ? `https://yeeplatformbackend.azurewebsites.net/deleteaudiochapter/${docId}` : `https://yeeplatformbackend.azurewebsites.net/deletechapter/${docId}`;
        const response = await fetch(deleteEndpoint, { method: 'DELETE' });
        
        if (response.ok) {
          refreshChapters();
          // On successful deletion, filter out the deleted chapter from the list
          if (isAudio) {
            setAudioChapters(audioChapters.filter((chapter) => chapter.id !== docId));
          } else {
            setChapters(chapters.filter((chapter) => chapter.id !== docId));
          }
          // Stop loading and show success message
          Swal.hideLoading();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else {
          throw new Error('Failed to delete the chapter.');
        }
      } catch (error) {
        // If there's an error, stop loading and show error message
        Swal.hideLoading();
        Swal.fire(
          'Error!',
          'There was an issue deleting your chapter.',
          'error'
        );
        console.error('Error deleting chapter:', error);
      }
    }
  });
};


const handleAudioSave = async () => {
  Swal.fire({
    title: 'Saving Audio Chapter...',
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const audioChapterData = {
      description: editedAudioChapter.description // send only the required fields
    };

    const response = await fetch(`https://yeeplatformbackend.azurewebsites.net/updateAudioChapter/${selectedAudioDocId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(audioChapterData),
    });

    if (response.ok) {
      setOpenAudioEdit(false);
      Swal.fire('Success!', 'Audio chapter updated successfully.', 'success');
      refreshChapters(); // Reload chapters after successful update
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update the audio chapter.');
    }
  } catch (error) {
    Swal.fire('Error!', `There was an issue saving your audio chapter: ${error.message}`, 'error');
    console.error('Error updating audio chapter:', error);
  }
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
             
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chapters.map((chapter) => (
              <TableRow key={chapter._id}>
                <TableCell>{chapter.title}</TableCell>

<TableCell>{chapter.description}</TableCell>
<TableCell>
<Button onClick={() => handleClickOpen(chapter, chapter._id)}>Edit</Button>
<Button onClick={() => handleDelete(chapter._id)}>Delete</Button>
</TableCell>
</TableRow>
))}
</TableBody>

{chapters.length === 0 && (
          <Typography variant="h6" style={{ textAlign: 'center', padding: '20px', color: 'grey' }}>
            No data available.
          </Typography>
        )}
</Table>
</TableContainer>


<Typography variant="h4" component="h2" style={{marginTop: '20px'}}>
        My Audio Chapters
      </Typography>
      {/* New Audio Chapters Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book Title</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Audio File</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {audioChapters.map((chapter) => (
              <TableRow key={chapter._id}>
                <TableCell>{chapter.title}</TableCell>
                <TableCell>{chapter.duration}</TableCell>
                <TableCell>{chapter.description}</TableCell>
                <TableCell>
                <audio controls onError={(e) => console.log('Error playing audio:', e)}>
  <source src={chapter.content} type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>
                </TableCell>
                <TableCell>
                  {/* Sample buttons for Edit and Delete. Adjust as necessary */}
                  <Button onClick={() => handleClickOpenAudio(chapter, chapter._id)}>Edit</Button>
            <Button onClick={() => handleDelete(chapter._id, true)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {audioChapters.length === 0 && (
          <Typography variant="h6" style={{ textAlign: 'center', padding: '20px', color: 'grey' }}>
            No audio data available.
          </Typography>
        )}
      </TableContainer>

<Dialog open={open} onClose={handleClose}>
    <DialogTitle>Edit Chapter</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Please edit the chapter information.
      </DialogContentText>
    
      <TextField
       margin="dense"
       id="description"
       label="Description"
       type="text"
       fullWidth
       multiline
       rows={10}
       value={editedChapter?.description || ''}
       onChange={handleInputChange}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleTextChapterSave}>Save</Button>
    </DialogActions>
  </Dialog>


  {/* New Dialog for editing audio chapters */}
  <Dialog open={openAudioEdit} onClose={() => setOpenAudioEdit(false)}>
    <DialogTitle>Edit Audio Chapter</DialogTitle>
    <DialogContent>
      {/* ... input fields for editing audio chapters */}
      <TextField
        margin="dense"
        id="description"
        label="Description"
        multiline
            rows={4}
        type="text"
        fullWidth
        value={editedAudioChapter?.description || ''}
        onChange={(e) => handleAudioInputChange(e, 'description')}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpenAudioEdit(false)}>Cancel</Button>
      <Button onClick={handleAudioSave}>Save</Button>
    </DialogActions>
  </Dialog>

</div>
);
};

export default MyChapters;
