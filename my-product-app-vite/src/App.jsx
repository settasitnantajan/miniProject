// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; 
import ProductPage from './components/ProductPage';
import UserProductPage from './components/UserProductPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public main page */}
          <Route path="/" element={<ProductPage />} />
          <Route
            path="/my-products"
            element={
              <ProtectedRoute>
                <UserProductPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
