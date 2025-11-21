import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import RecipeList from './pages/RecipeList';
import RecipeForm from './pages/RecipeForm';
import Schedule from './pages/Schedule';
import ShoppingList from './pages/ShoppingList';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <PrivateRoute>
            <div className="p-8 text-center">
              <h1 className="text-4xl font-bold text-blue-600">Household Manager</h1>
              <p className="mt-4 text-xl">Welcome back!</p>
            </div>
          </PrivateRoute>
        } />
        <Route path="/recipes" element={
          <PrivateRoute>
            <RecipeList />
          </PrivateRoute>
        } />
        <Route path="/recipes/new" element={
          <PrivateRoute>
            <RecipeForm />
          </PrivateRoute>
        } />
        <Route path="/schedule" element={
          <PrivateRoute>
            <Schedule />
          </PrivateRoute>
        } />
        <Route path="/shopping-list" element={
          <PrivateRoute>
            <ShoppingList />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
