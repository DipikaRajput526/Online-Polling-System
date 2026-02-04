import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'voter'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic
        if (formData.role === 'voter') {
            window.location.href = '/voter/dashboard';
        } else {
            window.location.href = '/admin/dashboard';
        }
    };

    return (
        <div className="login-page">
            <div className="container container-sm">
                <div className="login-card card">
                    <div className="card-header text-center">
                        <div className="login-icon">
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                <circle cx="40" cy="40" r="38" fill="#2563EB" opacity="0.1" />
                                <path d="M40 20C29.5 20 21 28.5 21 39C21 49.5 29.5 58 40 58C50.5 58 59 49.5 59 39C59 28.5 50.5 20 40 20ZM40 28C43.3 28 46 30.7 46 34C46 37.3 43.3 40 40 40C36.7 40 34 37.3 34 34C34 30.7 36.7 28 40 28ZM40 54C35 54 30.5 51.3 28 47.2C28.1 43 38 40.8 40 40.8C42 40.8 51.9 43 52 47.2C49.5 51.3 45 54 40 54Z" fill="#2563EB" />
                            </svg>
                        </div>
                        <h2>Welcome Back</h2>
                        <p className="text-secondary">Login to access your polling account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="role-selector">
                            <button
                                type="button"
                                className={`role-btn ${formData.role === 'voter' ? 'active' : ''}`}
                                onClick={() => setFormData(prev => ({ ...prev, role: 'voter' }))}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.93 6 15.5 7.57 15.5 9.5C15.5 11.43 13.93 13 12 13C10.07 13 8.5 11.43 8.5 9.5C8.5 7.57 10.07 6 12 6ZM12 20C9.97 20 8.14 19.15 6.82 17.79C8.23 16.42 10.02 15.5 12 15.5C13.98 15.5 15.77 16.42 17.18 17.79C15.86 19.15 14.03 20 12 20Z" fill="currentColor" />
                                </svg>
                                Voter
                            </button>
                            <button
                                type="button"
                                className={`role-btn ${formData.role === 'admin' ? 'active' : ''}`}
                                onClick={() => setFormData(prev => ({ ...prev, role: 'admin' }))}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="currentColor" />
                                </svg>
                                Admin
                            </button>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Username or Email</label>
                            <input
                                type="text"
                                name="username"
                                className="form-input"
                                placeholder="Enter your username or email"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-input"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group flex-between">
                            <label className="checkbox-label">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="text-primary">Forgot Password?</Link>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block btn-lg">
                            Login
                        </button>

                        <div className="divider">
                            <span>OR</span>
                        </div>

                        <Link to="/register" className="btn btn-outline btn-block">
                            Create New Account
                        </Link>
                    </form>

                    <div className="card-footer text-center">
                        <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                            🔒 Secure login with end-to-end encryption
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .login-page {
          min-height: 100vh;
          padding: 3rem 0;
          background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
          display: flex;
          align-items: center;
        }

        .login-card {
          max-width: 500px;
          margin: 0 auto;
        }

        .login-icon {
          margin-bottom: 1rem;
        }

        .role-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .role-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          border: 2px solid var(--color-border);
          background: white;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.3s;
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-text-secondary);
        }

        .role-btn:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        .role-btn.active {
          border-color: var(--color-primary);
          background: var(--color-primary);
          color: white;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.875rem;
        }

        .divider {
          position: relative;
          text-align: center;
          margin: 1.5rem 0;
        }

        .divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--color-border);
        }

        .divider span {
          position: relative;
          background: white;
          padding: 0 1rem;
          color: var(--color-text-secondary);
          font-size: 0.875rem;
        }
      `}</style>
        </div>
    );
}
