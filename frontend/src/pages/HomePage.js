import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const features = [
  {
    icon: '⬆',
    title: 'Upload Any File',
    desc: 'Drag & drop or browse. Supports images, documents, videos, archives and more up to 100MB.',
  },
  {
    icon: '⎘',
    title: 'Instant Share Links',
    desc: 'Every upload gets a unique share code and link — copy and send to anyone instantly.',
  },
  {
    icon: '↓',
    title: 'Easy Download',
    desc: 'Recipients download directly via share link with no account required.',
  },
  {
    icon: '⏱',
    title: 'Auto Expiry',
    desc: 'Files automatically expire after 7 days, keeping your storage clean.',
  },
  {
    icon: '📊',
    title: 'Download Tracking',
    desc: 'See exactly how many times each of your files has been downloaded.',
  },
  {
    icon: '🗂',
    title: 'File Dashboard',
    desc: 'Manage all your uploads in one place — view, share, or delete at any time.',
  },
];

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">File Sharing, Simplified</div>
        <h1 className="hero-title">
          Share Files<br />
          <span className="gradient-text">Instantly & Securely</span>
        </h1>
        <p className="hero-subtitle">
          Upload once, share everywhere. No sign-up needed for recipients.
          Files expire automatically — zero clutter.
        </p>
        <div className="hero-actions">
          <Link to="/upload" className="btn-primary">
            ⬆ Upload a File
          </Link>
          <Link to="/my-files" className="btn-secondary">
            View My Files
          </Link>
        </div>

        {/* Stats bar */}
        <div className="stats-bar">
          <div className="stat">
            <span className="stat-number">100MB</span>
            <span className="stat-label">Max file size</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">7 Days</span>
            <span className="stat-label">File lifetime</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">Free</span>
            <span className="stat-label">Always</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <h2 className="section-title">Everything You Need</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">01</div>
            <h3>Upload Your File</h3>
            <p>Drag & drop or select any file from your device. We'll handle the rest.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">02</div>
            <h3>Get a Share Link</h3>
            <p>Instantly receive a unique link and 8-character code for your file.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">03</div>
            <h3>Send & Download</h3>
            <p>Share the link. Anyone with it can download the file directly.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to share your first file?</h2>
        <p>No account needed — just upload and go.</p>
        <Link to="/upload" className="btn-primary large">
          Get Started →
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
