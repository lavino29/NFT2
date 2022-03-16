import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { DashboardRoutes } from './DashboardRouter';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            
            <Routes>
                
                <Route path="/*" element={ <DashboardRoutes />  } />

            </Routes>
        </BrowserRouter>
    )
}