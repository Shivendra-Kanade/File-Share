import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFile, formatFileSize, getFileIcon } from '../services/fileService';
import './UploadPage.css';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedBy, setUploadedBy] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      setResult(null);
      setError('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setProgress(0);
    setError('');

    try {
      const data = await uploadFile(
        selectedFile,
        uploadedBy || 'Anonymous',
        (pct) => setProgress(pct)
      );
      setResult(data);
      setSelectedFile(null);
    } catch (err) {
      setError('Upload failed. Please check if the backend server is running.');
    } finally {
      setUploading(false);
    }
  };

  const copyLink = () => {
    const shareUrl = `${window.location.origin}/download/${result.shareCode}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const reset = () => {
    setResult(null);
    setSelectedFile(null);
    setProgress(0);
    setError('');
    setCopied(false);
  };

  return (
    <div className="upload-page">
      <div className="page-header">
        <h1>Upload a File</h1>
        <p className="page-subtitle">Share files up to 100MB — get an instant shareable link</p>
      </div>

      {/* Success State */}
      {result && (
        <div className="upload-success">
          <div className="success-icon">✓</div>
          <h2>File Uploaded Successfully!</h2>
          <p className="success-filename">{result.originalFileName}</p>

          <div className="share-code-box">
            <span className="share-label">Share Code</span>
            <span className="share-code font-mono">{result.shareCode}</span>
          </div>

          <div className="share-url-row">
            <input
              className="share-url-input font-mono"
              value={`${window.location.origin}/download/${result.shareCode}`}
              readOnly
            />
            <button
              className={`btn-copy-big ${copied ? 'copied' : ''}`}
              onClick={copyLink}
            >
              {copied ? '✓ Copied!' : '⎘ Copy'}
            </button>
          </div>

          <div className="success-meta">
            <span>Size: {formatFileSize(result.fileSize)}</span>
            <span>·</span>
            <span>Expires in 7 days</span>
          </div>

          <button className="btn-upload-another" onClick={reset}>
            ⬆ Upload Another File
          </button>
        </div>
      )}

      {/* Upload Form */}
      {!result && (
        <div className="upload-container">
          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? 'drag-active' : ''} ${selectedFile ? 'has-file' : ''}`}
          >
            <input {...getInputProps()} />

            {selectedFile ? (
              <div className="selected-file">
                <span className="selected-icon">{getFileIcon(selectedFile.type)}</span>
                <div className="selected-info">
                  <p className="selected-name">{selectedFile.name}</p>
                  <p className="selected-size">{formatFileSize(selectedFile.size)}</p>
                </div>
                <button
                  className="btn-remove"
                  onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="dropzone-inner">
                <div className="drop-icon">⬆</div>
                <p className="drop-title">
                  {isDragActive ? 'Drop it here!' : 'Drag & drop your file here'}
                </p>
                <p className="drop-subtitle">or click to browse · Max 100MB</p>
              </div>
            )}
          </div>

          {/* Uploader Name */}
          <div className="form-group">
            <label className="form-label">Your Name (optional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. John Doe"
              value={uploadedBy}
              onChange={(e) => setUploadedBy(e.target.value)}
            />
          </div>

          {/* Progress Bar */}
          {uploading && (
            <div className="progress-container">
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="progress-label">{progress}%</span>
            </div>
          )}

          {/* Error */}
          {error && <div className="error-banner">{error}</div>}

          {/* Upload Button */}
          <button
            className="btn-upload-main"
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
          >
            {uploading ? `Uploading... ${progress}%` : '⬆ Upload File'}
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
