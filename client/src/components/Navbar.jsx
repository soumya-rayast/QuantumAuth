import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('user'));

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); 
    setIsAuthenticated(false);
    navigate('/auth');
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');  
    }
  }, [isAuthenticated, navigate]);
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-brand">Auth</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>

        {isAuthenticated ? (
          <>
            <Link to="/table" className="navbar-link">Table</Link>
            <Link className="navbar-link " onClick={handleLogout}>
              Logout
            </Link>
          </>

        ) : (
          <Link to="/auth" className="navbar-link">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
