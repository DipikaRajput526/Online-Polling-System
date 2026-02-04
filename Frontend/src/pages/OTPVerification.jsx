import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function OTPVerification() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleChange = (index, value) => {
        if (value.length > 1) value = value[0];
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = pastedData.split('');
        setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
        inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    };

    const handleResend = () => {
        setTimer(60);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length === 6) {
            // Handle OTP verification
            window.location.href = '/voter/dashboard';
        }
    };

    return (
        <div className="otp-page">
            <div className="container container-sm">
                <div className="otp-card card">
                    <div className="card-header text-center">
                        <div className="otp-icon">
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                <circle cx="40" cy="40" r="38" fill="#10B981" opacity="0.1" />
                                <path d="M40 20C29.5 20 21 28.5 21 39C21 49.5 29.5 58 40 58C50.5 58 59 49.5 59 39C59 28.5 50.5 20 40 20ZM36 48L26 38L28.8 35.2L36 42.4L51.2 27.2L54 30L36 48Z" fill="#10B981" />
                            </svg>
                        </div>
                        <h2>Verify Your Identity</h2>
                        <p className="text-secondary">
                            We've sent a 6-digit OTP to your registered Aadhaar-linked mobile number
                        </p>
                        <p className="masked-number">+91 XXXXX XX<strong>234</strong></p>
                    </div>

                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="otp-inputs">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => inputRefs.current[index] = el}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="1"
                                    className="otp-input"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>

                        <div className="timer-section">
                            {!canResend ? (
                                <p className="text-secondary">
                                    Resend OTP in <strong className="text-primary">{timer}s</strong>
                                </p>
                            ) : (
                                <button
                                    type="button"
                                    className="btn-link text-primary"
                                    onClick={handleResend}
                                >
                                    Resend OTP
                                </button>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-block btn-lg"
                            disabled={otp.join('').length !== 6}
                        >
                            Verify & Continue
                        </button>

                        <div className="alert alert-info mt-3">
                            <strong>Security Note:</strong> OTP is valid for 10 minutes. Never share your OTP with anyone.
                        </div>
                    </form>

                    <div className="card-footer text-center">
                        <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                            Having trouble? <Link to="/support">Contact Support</Link>
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .otp-page {
          min-height: 100vh;
          padding: 3rem 0;
          background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
          display: flex;
          align-items: center;
        }

        .otp-card {
          max-width: 550px;
          margin: 0 auto;
        }

        .otp-icon {
          margin-bottom: 1rem;
        }

        .masked-number {
          font-size: 1.125rem;
          color: var(--color-text-primary);
          margin-top: 0.5rem;
        }

        .otp-inputs {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin: 2rem 0;
        }

        .otp-input {
          width: 60px;
          height: 60px;
          text-align: center;
          font-size: 1.5rem;
          font-weight: 600;
          border: 2px solid var(--color-border);
          border-radius: var(--radius-md);
          transition: all 0.3s;
        }

        .otp-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          transform: scale(1.05);
        }

        .otp-input:not(:placeholder-shown) {
          border-color: var(--color-success);
          background: rgba(16, 185, 129, 0.05);
        }

        .timer-section {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .btn-link {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          text-decoration: underline;
        }

        .btn-link:hover {
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .otp-inputs {
            gap: 0.5rem;
          }

          .otp-input {
            width: 45px;
            height: 45px;
            font-size: 1.25rem;
          }
        }
      `}</style>
        </div>
    );
}
