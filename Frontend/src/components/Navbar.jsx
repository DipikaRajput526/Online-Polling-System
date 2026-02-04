import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('voter'); // 'voter' or 'admin'

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <circle cx="20" cy="20" r="18" fill="#2563EB" opacity="0.1" />
                        <path d="M20 8L24 16H28L22 22L24 30L20 26L16 30L18 22L12 16H16L20 8Z" fill="#2563EB" />
                    </svg>
                    <span>Online Polling System</span>
                </Link>

                <ul className="navbar-nav">
                    <li><Link to="/" className="navbar-link">Home</Link></li>
                    {!isLoggedIn ? (
                        <>
                            <li><Link to="/login" className="navbar-link">Login</Link></li>
                            <li><Link to="/register" className="btn btn-primary btn-sm">Register</Link></li>
                        </>
                    ) : (
                        <>
                            {userRole === 'voter' && (
                                <>
                                    <li><Link to="/voter/dashboard" className="navbar-link">Dashboard</Link></li>
                                    <li><Link to="/voter/polls" className="navbar-link">Polls</Link></li>
                                    <li><Link to="/voter/history" className="navbar-link">History</Link></li>
                                </>
                            )}
                            {userRole === 'admin' && (
                                <>
                                    <li><Link to="/admin/dashboard" className="navbar-link">Dashboard</Link></li>
                                    <li><Link to="/admin/polls" className="navbar-link">Manage Polls</Link></li>
                                    <li><Link to="/admin/users" className="navbar-link">Users</Link></li>
                                </>
                            )}
                            <li><Link to="/results" className="navbar-link">Results</Link></li>
                            <li>
                                <button className="btn btn-outline btn-sm" onClick={() => setIsLoggedIn(false)}>
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
