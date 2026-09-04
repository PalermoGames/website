import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import IndexPage from '@/routes/IndexPage';
import WorkForHirePage from '@/routes/WorkForHirePage';

/**
 * React Router keeps the scroll position across navigations, which lands you
 * halfway down the work-for-hire page after clicking the dock.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/work-for-hire" element={<WorkForHirePage />} />
        {/* nginx serves index.html for unknown paths, so anything else lands here. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
