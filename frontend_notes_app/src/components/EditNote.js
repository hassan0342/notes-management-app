import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EditNote.css'; // Importing the CSS file for styling

function EditNote({ fetchNotes }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the note by ID
    axios.get(`http://127.0.0.1:8000/api/notes/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch((error) => console.error('Error fetching note:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Title and content are required!');
      return;
    }

    // Update the note via the API
    axios.put(`http://127.0.0.1:8000/api/notes/${id}`, { title, content })
      .then(() => {
        alert('Note Updated!');
        fetchNotes(); // Refresh the notes list
        navigate('/'); // Redirect to the main page
      })
      .catch((error) => console.error('Error updating note:', error));
  };

  return (
    <div className="edit-note-container">
      <h2 className="edit-note-title">Edit Note</h2>
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
        <button type="submit" className="submit-btn">Update Note</button>
      </form>
    </div>
  );
}

export default EditNote;
