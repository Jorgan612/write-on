import { Navigate } from 'react-router-dom';
import React from 'react';

export const RequireAuth = ({ children }: { children: React.JSX.Element }) => {
    const isAuthenticated = !! localStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};