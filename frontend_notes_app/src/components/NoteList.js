import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/NoteList.css'; // Importing the CSS file for styling
import debounce from 'lodash.debounce'; // Import debounce

function NoteList({ onDelete }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Debounced search function to avoid multiple API calls on every keystroke
  const fetchNotes = async (page = 1, searchQuery = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/notes`, {
        params: {
          search: searchQuery, // Pass search query
          page: page,          // Pass current page number
        }
      });
      setNotes(response.data.data);        // Notes for the current page
      setTotalPages(response.data.last_page); // Total pages for pagination
      setCurrentPage(page);                   // Set current page
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect for initial fetch
  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle search input change and apply debounce
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value); // Call debounced search
  };

  // Debounced version of the fetch function
  const debouncedSearch = debounce((query) => {
    fetchNotes(1, query);  // Fetch notes starting from page 1 when search changes
  }, 500);  // 500ms delay before making the API call

  // Handle page change
  const handlePageChange = (page) => {
    fetchNotes(page, search);
  };

  if (loading) return <p className="loading-text">Loading notes...</p>;

  return (
    <div className="note-list-container">
      <h2 className="title">All Notes</h2>
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by title or content"
          value={search}
          onChange={handleSearchChange}
        />
        <button className="search-btn">Search</button>
      </div>
      <Link to="/add">
        <button className="add-note-btn">Add New Note</button>
      </Link>
      {notes.length === 0 ? (
        <p className="no-notes-text">No notes available</p>
      ) : (
        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note.id} className="note-item">
              <h3 className="note-title">{note.title}</h3>
              <p className="note-content">{note.content}</p>
              <div className="note-actions">
                <Link to={`/edit/${note.id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>
                <button className="delete-btn" onClick={() => onDelete(note.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-btn ${index + 1 === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NoteList;
