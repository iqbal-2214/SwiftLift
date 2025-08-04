// /src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './store/AuthContext';

function App() {
  return (
    // The AuthProvider must wrap BrowserRouter so that the routes
    // and all their components can access the authentication context.
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;