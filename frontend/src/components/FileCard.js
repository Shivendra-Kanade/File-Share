import React, { useState } from 'react';
import { formatFileSize, getFileIcon, getDownloadUrl } from '../services/fileService';
import { format } from 'date-fns';
import './FileCard.css';

const FileCard = ({ file, onDelete, showDelete }) => {
  const [copied, setCopied] = useState(false);

  const copyShareLink = () => {
    const shareUrl = `${window.location.origin}/download/${file.shareCode}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = getDownloadUrl(file.shareCode);
    link.download = file.originalFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="file-card">
      <div className="file-card-header">
        <span className="file-icon">{getFileIcon(file.fileType)}</span>
        <div className="file-meta">
          <p className="file-name" title={file.originalFileName}>
            {file.originalFileName}
          </p>
          <p className="file-size">{formatFileSize(file.fileSize)}</p>
        </div>
        {showDelete && (
          <button className="btn-delete" onClick={() => onDelete(file.id)} title="Delete">
            ✕
          </button>
        )}
      </div>

      <div className="file-info-grid">
        <div className="info-item">
          <span className="info-label">Share Code</span>
          <span className="info-value font-mono">{file.shareCode}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Downloads</span>
          <span className="info-value">{file.downloadCount}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Uploaded</span>
          <span className="info-value">
            {file.uploadedAt ? format(new Date(file.uploadedAt), 'MMM dd, yyyy') : '—'}
          </span>
        </div>
        <div className="info-item">
          <span className="info-label">Expires</span>
          <span className="info-value">
            {file.expiresAt ? format(new Date(file.expiresAt), 'MMM dd, yyyy') : '—'}
          </span>
        </div>
      </div>

      <div className="file-card-actions">
        <button className="btn-action btn-download" onClick={handleDownload}>
          ↓ Download
        </button>
        <button
          className={`btn-action btn-copy ${copied ? 'copied' : ''}`}
          onClick={copyShareLink}
        >
          {copied ? '✓ Copied!' : '⎘ Copy Link'}
        </button>
      </div>
    </div>
  );
};

export default FileCard;
