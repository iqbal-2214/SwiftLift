import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar.jsx';

// --- THE VITE WAY TO HANDLE ASSETS ---
// 1. Import the image directly into your JavaScript/JSX file.
//    Vite will process this image and 'bgImage' will contain the final, public URL to it.  recom-web/src/images/background.png
import bgImage from '../../images/background.png';

const MainLayout = () => {

  // 2. Create a style object for the main background wrapper.
  const backgroundStyle = {
    backgroundImage: `
      linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 80%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.5) 100%),
      url(${bgImage})
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    width: '100%'
  };

  return (
    // 3. Apply the style to a new div that wraps your entire application layout.
    <div style={backgroundStyle}>
      <Navbar />
      <main> {/* Remove the 'container' class from here */}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;