import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '@/routes/HomePage';
import OriginalIpPage from '@/routes/OriginalIpPage';

/**
 * React Router keeps the scroll position across navigations, which lands you
 * halfway down a page you have never seen.
 *
 * Hash targets are the exception: the header links to #services and friends,
 * and jumping to the top would defeat them.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/original-ip" element={<OriginalIpPage />} />
        {/*
          /work-for-hire was the live URL for this content and is linked from
          the footer of the currently deployed site. It is now the front page,
          so keep the old path resolving rather than 404ing anyone who bookmarked
          or shared it.
        */}
        <Route path="/work-for-hire" element={<Navigate to="/" replace />} />
        {/* nginx serves index.html for unknown paths, so anything else lands here. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
