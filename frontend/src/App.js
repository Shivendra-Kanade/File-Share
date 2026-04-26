import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import MyFilesPage from './pages/MyFilesPage';
import DownloadPage from './pages/DownloadPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/my-files" element={<MyFilesPage />} />
            <Route path="/download/:shareCode" element={<DownloadPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
