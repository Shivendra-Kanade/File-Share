import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFileInfo, getDownloadUrl, formatFileSize, getFileIcon } from '../services/fileService';
import { format } from 'date-fns';
import './DownloadPage.css';

const DownloadPage = () => {
  const { shareCode } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const data = await getFileInfo(shareCode);
        setFile(data);
      } catch {
        setError('File not found or has expired.');
      } finally {
        setLoading(false);
      }
    };
    fetchFile();
  }, [shareCode]);

  const handleDownload = () => {
    setDownloading(true);
    const link = document.createElement('a');
    link.href = getDownloadUrl(shareCode);
    link.download = file.originalFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 2000);
  };

  if (loading) {
    return (
      <div className="download-page center-state">
        <div className="spinner" />
        <p>Looking up file...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="download-page center-state">
        <div className="not-found-icon">🔍</div>
        <h2>File Not Found</h2>
        <p>{error}</p>
        <Link to="/" className="btn-home">← Go Home</Link>
      </div>
    );
  }

  return (
    <div className="download-page">
      <div className="download-card">
        <div className="download-header">
          <span className="download-file-icon">{getFileIcon(file.fileType)}</span>
          <div>
            <h1 className="download-filename">{file.originalFileName}</h1>
            <p className="download-uploader">
              Shared by <strong>{file.uploadedBy || 'Anonymous'}</strong>
            </p>
          </div>
        </div>

        <div className="file-details-grid">
          <div className="detail-item">
            <span className="detail-label">File Size</span>
            <span className="detail-value">{formatFileSize(file.fileSize)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">File Type</span>
            <span className="detail-value">{file.fileType || 'Unknown'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Uploaded</span>
            <span className="detail-value">
              {file.uploadedAt ? format(new Date(file.uploadedAt), 'MMM dd, yyyy · HH:mm') : '—'}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Expires</span>
            <span className="detail-value">
              {file.expiresAt ? format(new Date(file.expiresAt), 'MMM dd, yyyy') : '—'}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Downloads</span>
            <span className="detail-value">{file.downloadCount} times</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Share Code</span>
            <span className="detail-value font-mono">{file.shareCode}</span>
          </div>
        </div>

        <button
          className="btn-download-main"
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? '⏳ Starting Download...' : `↓ Download ${file.originalFileName}`}
        </button>

        <p className="download-note">
          This file will be available until {file.expiresAt ? format(new Date(file.expiresAt), 'MMMM dd, yyyy') : 'expiry'}.
        </p>

        <div className="download-footer">
          <Link to="/" className="link-home">← Back to FileShare</Link>
          <Link to="/upload" className="link-upload">Share your own file →</Link>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
