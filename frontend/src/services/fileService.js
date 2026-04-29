import axios from 'axios';

const API_BASE = 'https://file-share-g79o.onrender.com/api/files';

// Upload a file
export const uploadFile = async (file, uploadedBy = 'Anonymous', onProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('uploadedBy', uploadedBy);

  const response = await axios.post(`${API_BASE}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      if (onProgress) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percent);
      }
    },
  });
  return response.data;
};

// Get all files
export const getAllFiles = async () => {
  const response = await axios.get(`${API_BASE}/all`);
  return response.data;
};

// Get files by user
export const getFilesByUser = async (username) => {
  const response = await axios.get(`${API_BASE}/user/${username}`);
  return response.data;
};

// Get file info by share code
export const getFileInfo = async (shareCode) => {
  const response = await axios.get(`${API_BASE}/info/${shareCode}`);
  return response.data;
};

// Delete a file
export const deleteFile = async (id) => {
  const response = await axios.delete(`${API_BASE}/${id}`);
  return response.data;
};

// Get download URL
export const getDownloadUrl = (shareCode) => {
  return `${API_BASE}/download/${shareCode}`;
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Get file icon based on type
export const getFileIcon = (fileType) => {
  if (!fileType) return '📄';
  if (fileType.includes('image')) return '🖼️';
  if (fileType.includes('video')) return '🎬';
  if (fileType.includes('audio')) return '🎵';
  if (fileType.includes('pdf')) return '📕';
  if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('tar')) return '📦';
  if (fileType.includes('word') || fileType.includes('document')) return '📝';
  if (fileType.includes('sheet') || fileType.includes('excel')) return '📊';
  if (fileType.includes('presentation') || fileType.includes('powerpoint')) return '📽️';
  if (fileType.includes('text')) return '📃';
  if (fileType.includes('javascript') || fileType.includes('json') || fileType.includes('html')) return '💻';
  return '📄';
};
