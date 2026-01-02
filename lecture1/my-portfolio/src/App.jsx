import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Navigation from './components/common/navigation.jsx';
import HomePage from './pages/home-page.jsx';
import AboutPage from './pages/about-page.jsx';
import ProjectsPageShadcn from './pages/projects-page-shadcn.jsx';

/**
 * App 컴포넌트
 *
 * Props:
 * - 없음
 *
 * Example usage:
 * <App />
 */
function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'background.default',
        }}
      >
        <Navigation />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPageShadcn />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
