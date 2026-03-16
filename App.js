import React, { useState, useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Navbar, AuthModal, Toast } from './components/Common';
import { Dashboard } from './components/Dashboard';
import { Forum } from './components/Forum';
import { Notes } from './components/Notes';
import { Chat } from './components/Chat';
import { Profile } from './components/Profile';

function App() {
  const { toasts } = useApp();
  const [currentPath, setCurrentPath] = useState(window.location.hash.split('?')[0] || '#');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const newPath = window.location.hash.split('?')[0] || '#';
      if (newPath !== currentPath) {
        setCurrentPath(newPath);
        window.scrollTo(0, 0);
      } else {
        // If it's the same path but different params, just update path (no scroll to top)
        setCurrentPath(newPath);
      }
    };

    const handleOpenAuth = () => setIsAuthOpen(true);

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('openAuth', handleOpenAuth);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('openAuth', handleOpenAuth);
    };
  }, []);

  const renderPage = () => {
    switch (currentPath) {
      case '#forum': return <Forum />;
      case '#notes': return <Notes />;
      case '#chat': return <Chat />;
      case '#profile': return <Profile />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Navbar onAuthClick={() => setIsAuthOpen(true)} />

      <main style={{ minHeight: 'calc(100vh - 80px)' }}>
        {renderPage()}
      </main>

      <footer style={{
        padding: '60px 5%', borderTop: '1px solid var(--border-light)',
        textAlign: 'center', background: 'var(--bg-glass)'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '24px', fontWeight: '800' }}>StudyHive</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>The ultimate student collaboration hub.</p>
        </div>
        <div className="flex gap-24" style={{ justifyContent: 'center' }}>
          <a href="#" className="btn-ghost">About</a>
          <a href="#" className="btn-ghost">Guidelines</a>
          <a href="#" className="btn-ghost">Privacy</a>
          <a href="#" className="btn-ghost">Support</a>
        </div>
        <div style={{ marginTop: '40px', fontSize: '12px', color: 'var(--text-muted)' }}>
          © 2026 StudyHive. Created by <strong>Shweta Rathod</strong> | Built for students, by students.
        </div>
      </footer>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <div className="toast-container">
        {toasts.map(t => <Toast key={t.id} item={t} />)}
      </div>
    </div>
  );
}

export default App;
