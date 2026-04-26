import React, { useState, useEffect } from 'react';
import { getAllFiles, getFilesByUser, deleteFile } from '../services/fileService';
import FileCard from '../components/FileCard';
import './MyFilesPage.css';

const MyFilesPage = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchFiles = async (username = '') => {
    setLoading(true);
    setError('');
    try {
      const data = username
        ? await getFilesByUser(username)
        : await getAllFiles();
      setFiles(data);
    } catch (err) {
      setError('Could not load files. Make sure the backend is running.');
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFiles(filterInput.trim());
    setSearchUser(filterInput.trim());
  };

  const handleShowAll = () => {
    setFilterInput('');
    setSearchUser('');
    fetchFiles('');
  };

  const confirmDelete = (id) => setDeleteConfirm(id);

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await deleteFile(deleteConfirm);
      setFiles((prev) => prev.filter((f) => f.id !== deleteConfirm));
    } catch {
      setError('Delete failed.');
    } finally {
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="myfiles-page">
      <div className="page-header">
        <div>
          <h1>My Files</h1>
          <p className="page-subtitle">
            {searchUser
              ? `Showing files by "${searchUser}"`
              : `All uploaded files · ${files.length} total`}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Filter by uploader name..."
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
        />
        <button type="submit" className="btn-search">Search</button>
        {searchUser && (
          <button type="button" className="btn-show-all" onClick={handleShowAll}>
            Show All
          </button>
        )}
      </form>

      {/* Loading */}
      {loading && (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading files...</p>
        </div>
      )}

      {/* Error */}
      {error && <div className="error-banner">{error}</div>}

      {/* Empty state */}
      {!loading && !error && files.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🗂</div>
          <h3>No files found</h3>
          <p>
            {searchUser
              ? `No files uploaded by "${searchUser}"`
              : 'Upload your first file to get started'}
          </p>
        </div>
      )}

      {/* Files Grid */}
      {!loading && files.length > 0 && (
        <div className="files-grid">
          {files.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              showDelete={true}
              onDelete={confirmDelete}
            />
          ))}
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete File?</h3>
            <p>This action cannot be undone. The file will be permanently removed.</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </button>
              <button className="btn-confirm-delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFilesPage;
