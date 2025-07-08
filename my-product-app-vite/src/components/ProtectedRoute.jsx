// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // เราจะสร้างไฟล์นี้ในข้อถัดไป

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // ถ้าไม่มี user, ให้ redirect ไปหน้า login
    return <Navigate to="/" />;
  }

  return children;
}
