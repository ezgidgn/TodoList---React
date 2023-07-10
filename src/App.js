import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Crud from './components/Crud';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const location = useLocation();

  return (
    <div>
      <AnimatePresence>
        <AuthContextProvider>
          <Routes key={location.pathname} location={location}>
            <Route path='/' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route
              path='/home'
              element={
                <ProtectedRoute>
                  <Crud />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthContextProvider>
      </AnimatePresence>
    </div>
  );
};

export default App;
