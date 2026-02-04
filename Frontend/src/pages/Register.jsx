import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        aadhaar: '',
        password: '',
        confirmPassword: ''
    });

    const [step, setStep] = useState(1);
    const [passwordStrength, setPasswordStrength] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'password') {
            calculatePasswordStrength(value);
        }
    };

    const calculatePasswordStrength = (password) => {
        if (password.length < 6) setPasswordStrength('weak');
        else if (password.length < 10) setPasswordStrength('medium');
        else setPasswordStrength('strong');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Navigate to OTP verification
        window.location.href = '/otp-verification';
    };

    return (
        <div className="register-page">
            <div className="container container-sm">
                <div className="register-card card">
                    <div className="card-header text-center">
                        <h2>Create Your Account</h2>
                        <p className="text-secondary">Join the democratic process - Register to vote</p>
                    </div>

                    <div className="progress-steps">
                        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
                            <div className="step-circle">1</div>
                            <span>Personal Info</span>
                        </div>
                        <div className="progress-line"></div>
                        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
                            <div className="step-circle">2</div>
                            <span>Verification</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="card-body">
                        {step === 1 && (
                            <>
                                <div className="form-group">
                                    <label className="form-label">Full Name *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        className="form-input"
                                        placeholder="Enter your full name as per Aadhaar"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="grid grid-2">
                                    <div className="form-group">
                                        <label className="form-label">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-input"
                                            placeholder="your.email@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Mobile Number *</label>
                                        <input
                                            type="tel"
                                            name="mobile"
                                            className="form-input"
                                            placeholder="+91 XXXXX XXXXX"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Aadhaar Number *</label>
                                    <input
                                        type="text"
                                        name="aadhaar"
                                        className="form-input"
                                        placeholder="XXXX XXXX XXXX"
                                        maxLength="12"
                                        value={formData.aadhaar}
                                        onChange={handleChange}
                                        required
                                    />
                                    <p className="form-help">
                                        🔒 Your Aadhaar is encrypted and used only for verification
                                    </p>
                                </div>

                                <div className="grid grid-2">
                                    <div className="form-group">
                                        <label className="form-label">Password *</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-input"
                                            placeholder="Create a strong password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        {formData.password && (
                                            <div className={`password-strength ${passwordStrength}`}>
                                                <div className="strength-bar"></div>
                                                <span className="strength-text">{passwordStrength}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Confirm Password *</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            className="form-input"
                                            placeholder="Re-enter password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="checkbox-label">
                                        <input type="checkbox" required />
                                        <span>I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link></span>
                                    </label>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block btn-lg">
                                    Continue to Verification
                                </button>
                            </>
                        )}

                        <div className="text-center mt-3">
                            <p className="text-secondary">
                                Already have an account? <Link to="/login">Login here</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx>{`
        .register-page {
          min-height: 100vh;
          padding: 3rem 0;
          background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
          display: flex;
          align-items: center;
        }

        .register-card {
          max-width: 700px;
          margin: 0 auto;
        }

        .progress-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 2rem 0;
          padding: 0 2rem;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          opacity: 0.4;
          transition: opacity 0.3s;
        }

        .progress-step.active {
          opacity: 1;
        }

        .step-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-gray-300);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          transition: background 0.3s;
        }

        .progress-step.active .step-circle {
          background: var(--color-primary);
          color: white;
        }

        .progress-line {
          flex: 1;
          height: 2px;
          background: var(--color-gray-300);
          margin: 0 1rem;
          max-width: 100px;
        }

        .password-strength {
          margin-top: 0.5rem;
        }

        .strength-bar {
          height: 4px;
          border-radius: 2px;
          background: var(--color-gray-200);
          position: relative;
          overflow: hidden;
        }

        .strength-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          transition: width 0.3s, background 0.3s;
        }

        .password-strength.weak .strength-bar::after {
          width: 33%;
          background: var(--color-error);
        }

        .password-strength.medium .strength-bar::after {
          width: 66%;
          background: var(--color-warning);
        }

        .password-strength.strong .strength-bar::after {
          width: 100%;
          background: var(--color-success);
        }

        .strength-text {
          font-size: 0.75rem;
          text-transform: capitalize;
          margin-top: 0.25rem;
          display: block;
        }

        .password-strength.weak .strength-text {
          color: var(--color-error);
        }

        .password-strength.medium .strength-text {
          color: var(--color-warning);
        }

        .password-strength.strong .strength-text {
          color: var(--color-success);
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          cursor: pointer;
        }

        .checkbox-label input[type="checkbox"] {
          margin-top: 0.25rem;
        }

        @media (max-width: 768px) {
          .progress-steps {
            padding: 0;
          }

          .progress-step span {
            font-size: 0.75rem;
          }
        }
      `}</style>
        </div>
    );
}
