import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '@/routes/HomePage';
import ShowcasePage from '@/routes/ShowcasePage';
import NotFoundPage from '@/routes/NotFoundPage';

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
        <Route path="/showcase" element={<ShowcasePage />} />
        {/*
          Old paths, kept resolving rather than 404ing anyone who bookmarked or
          shared them.

          /work-for-hire was the live URL for this content and is linked from
          the footer of the currently deployed site; it is now the front page.
          /original-ip held the games page until it stopped being a pitch to
          publishers and became a showcase of both titles.
        */}
        <Route path="/original-ip" element={<Navigate to="/showcase" replace />} />
        <Route path="/work-for-hire" element={<Navigate to="/" replace />} />
        {/*
          Everything else. nginx answers those paths with dist/404.html — the
          same shell, served with a real 404 — and the app renders the
          not-found screen from here. It used to redirect to "/", which turned
          every typo into a 200 answering with the homepage.
        */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
