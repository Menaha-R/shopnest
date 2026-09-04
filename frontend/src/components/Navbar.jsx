import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate('/login');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={closeMenu}>
          <img src="/ShopNestLogo.png" alt="ShopNest" style={{ height: '36px', width: '36px', borderRadius: '8px', objectFit: 'cover', filter: 'drop-shadow(0 2px 8px rgba(249, 115, 22, 0.35))' }} />
          ShopNest
        </Link>
      </div>

      {/* Hamburger Toggle Button */}
      <button className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Navigation Drawer Menu */}
      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        {user && user.role === 'admin' ? (
          <>
            <li><Link to="/admin" onClick={closeMenu}>Dashboard</Link></li>
            <li><Link to="/admin/products" onClick={closeMenu}>Products</Link></li>
            <li><Link to="/admin/orders" onClick={closeMenu}>Orders</Link></li>
            <li><Link to="/admin/users" onClick={closeMenu}>Users</Link></li>
            <li><span style={{ color: '#a1a1aa', marginRight: '10px', fontSize: '0.95rem' }}>Hi, {user.name}</span></li>
            <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/shop" onClick={closeMenu}>Shop</Link></li>
            <li><Link to="/cart" onClick={closeMenu}>Cart ({cartItems.length})</Link></li>
            {user ? (
              <>
                <li><Link to="/profile" onClick={closeMenu}>Hi, {user.name}</Link></li>
                <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
              </>
            ) : (
              <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
