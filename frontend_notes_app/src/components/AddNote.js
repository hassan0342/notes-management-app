import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddNote.css'; // Importing the CSS file for styling

function AddNote({ fetchNotes }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Title and content are required!');
      return;
    }

    // Create a new note via the API
    axios.post('http://127.0.0.1:8000/api/notes', { title, content })
      .then(() => {
        alert('Note Added!');
        fetchNotes(); // Refresh the notes list
        navigate('/'); // Redirect to the main page
      })
      .catch((error) => console.error('Error adding note:', error));
  };

  return (
    <div className="add-note-container">
      <h2 className="add-note-title">Add New Note</h2>
      <form className="note-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="form-label">Content:</label>
          <textarea
            id="content"
            className="form-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Add Note</button>
      </form>
    </div>
  );
}

export default AddNote;
