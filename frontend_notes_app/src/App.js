import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import NoteList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all notes from the API
  const fetchNotes = () => {
    axios.get('http://127.0.0.1:8000/api/notes')
      .then((response) => {
        setNotes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the notes:', error);
        setLoading(false);
      });
  };

  // Handle deleting a note
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      axios.delete(`http://127.0.0.1:8000/api/notes/${id}`)
        .then(() => {
          alert('Note Deleted!');
          fetchNotes(); // Refresh the list after deletion
        })
        .catch(error => console.log(error));
    }
  };

  useEffect(() => {
    fetchNotes(); // Fetch notes when the component mounts
  }, []);

  return (
    <Router>
      <div className="container">
        <h1>Note Taking App</h1>
        <Routes>
          <Route
            path="/"
            element={<NoteList notes={notes} onDelete={handleDelete} loading={loading} />}
          />
          <Route path="/add" element={<AddNote fetchNotes={fetchNotes} />} />
          <Route path="/edit/:id" element={<EditNote fetchNotes={fetchNotes} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
