import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Landing() {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 className="hero-title">
                                Secure Digital Voting for a Democratic Future
                            </h1>
                            <p className="hero-subtitle">
                                Participate in transparent, accessible, and secure online polls. Your voice matters in shaping our democracy.
                            </p>
                            <div className="hero-buttons">
                                <Link to="/register" className="btn btn-primary btn-lg">
                                    Register to Vote
                                </Link>
                                <Link to="/login" className="btn btn-outline btn-lg">
                                    Login
                                </Link>
                            </div>
                            <div className="hero-stats">
                                <div className="stat-item">
                                    <div className="stat-number">50K+</div>
                                    <div className="stat-label">Registered Voters</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">200+</div>
                                    <div className="stat-label">Polls Conducted</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">99.9%</div>
                                    <div className="stat-label">Uptime</div>
                                </div>
                            </div>
                        </div>
                        <div className="hero-image">
                            <div className="hero-illustration">
                                <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="200" cy="200" r="150" fill="#2563EB" opacity="0.1" />
                                    <rect x="120" y="120" width="160" height="200" rx="8" fill="#2563EB" />
                                    <rect x="130" y="130" width="140" height="180" rx="4" fill="white" />
                                    <circle cx="200" cy="200" r="40" fill="#2563EB" />
                                    <path d="M185 200L195 210L215 190" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                    <rect x="150" y="150" width="100" height="20" rx="4" fill="#E2E8F0" />
                                    <rect x="150" y="180" width="80" height="12" rx="4" fill="#E2E8F0" />
                                    <rect x="150" y="250" width="100" height="20" rx="4" fill="#E2E8F0" />
                                    <rect x="150" y="280" width="80" height="12" rx="4" fill="#E2E8F0" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="section how-it-works">
                <div className="container">
                    <h2 className="text-center mb-4">How Online Voting Works</h2>
                    <p className="text-center text-secondary mb-4" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
                        Our secure platform makes voting simple, transparent, and accessible to all eligible citizens.
                    </p>

                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <div className="step-icon">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                    <circle cx="30" cy="30" r="28" fill="#2563EB" opacity="0.1" />
                                    <path d="M30 15C21.7 15 15 21.7 15 30C15 38.3 21.7 45 30 45C38.3 45 45 38.3 45 30C45 21.7 38.3 15 30 15ZM30 25C32.2 25 34 26.8 34 29C34 31.2 32.2 33 30 33C27.8 33 26 31.2 26 29C26 26.8 27.8 25 30 25ZM30 41C26 41 22.5 38.7 21 35.4C21.1 32 28 30.2 30 30.2C32 30.2 38.9 32 39 35.4C37.5 38.7 34 41 30 41Z" fill="#2563EB" />
                                </svg>
                            </div>
                            <h3>Register</h3>
                            <p>Create your account using Aadhaar verification for secure identity confirmation.</p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">2</div>
                            <div className="step-icon">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                    <circle cx="30" cy="30" r="28" fill="#0EA5E9" opacity="0.1" />
                                    <path d="M38 18H22C19.8 18 18 19.8 18 22V38C18 40.2 19.8 42 22 42H38C40.2 42 42 40.2 42 38V22C42 19.8 40.2 18 38 18ZM30 24C32.2 24 34 25.8 34 28C34 30.2 32.2 32 30 32C27.8 32 26 30.2 26 28C26 25.8 27.8 24 30 24ZM38 38H22V36C22 33.3 27.3 32 30 32C32.7 32 38 33.3 38 36V38Z" fill="#0EA5E9" />
                                </svg>
                            </div>
                            <h3>Verify Identity</h3>
                            <p>Complete OTP verification to ensure secure access to your voting account.</p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">3</div>
                            <div className="step-icon">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                    <circle cx="30" cy="30" r="28" fill="#10B981" opacity="0.1" />
                                    <path d="M38 18H22C19.8 18 18 19.8 18 22V38C18 40.2 19.8 42 22 42H38C40.2 42 42 40.2 42 38V22C42 19.8 40.2 18 38 18ZM28 36L20 28L22.4 25.6L28 31.2L37.6 21.6L40 24L28 36Z" fill="#10B981" />
                                </svg>
                            </div>
                            <h3>Cast Your Vote</h3>
                            <p>Browse active polls and cast your vote securely with end-to-end encryption.</p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">4</div>
                            <div className="step-icon">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                    <circle cx="30" cy="30" r="28" fill="#F59E0B" opacity="0.1" />
                                    <path d="M22 18C19.8 18 18 19.8 18 22V38C18 40.2 19.8 42 22 42H38C40.2 42 42 40.2 42 38V26L34 18H22ZM32 28V20L40 28H32Z" fill="#F59E0B" />
                                </svg>
                            </div>
                            <h3>Get Receipt</h3>
                            <p>Receive a unique vote ID as confirmation while maintaining ballot secrecy.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section features-section">
                <div className="container">
                    <h2 className="text-center mb-4">Why Choose Our Platform</h2>
                    <div className="grid grid-3">
                        <div className="feature-card card">
                            <div className="feature-icon">🔒</div>
                            <h3>Secure & Encrypted</h3>
                            <p>Military-grade encryption ensures your vote remains confidential and tamper-proof.</p>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon">✓</div>
                            <h3>Transparent Process</h3>
                            <p>Real-time results and audit trails provide complete transparency in the voting process.</p>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon">📱</div>
                            <h3>Accessible Anywhere</h3>
                            <p>Vote from any device - desktop, tablet, or mobile - at your convenience.</p>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon">⚡</div>
                            <h3>Fast & Efficient</h3>
                            <p>Quick registration and voting process saves time while maintaining security.</p>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon">🛡️</div>
                            <h3>Aadhaar Verified</h3>
                            <p>Government-backed identity verification prevents fraud and duplicate voting.</p>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon">📊</div>
                            <h3>Live Results</h3>
                            <p>Watch results update in real-time as votes are counted automatically.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container text-center">
                    <h2>Ready to Make Your Voice Heard?</h2>
                    <p className="text-secondary mb-4">Join thousands of citizens participating in democratic decision-making.</p>
                    <Link to="/register" className="btn btn-primary btn-lg">
                        Get Started Now
                    </Link>
                </div>
            </section>

            <style jsx>{`
        .landing-page {
          min-height: 100vh;
        }

        .hero-section {
          background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
          padding: 4rem 0;
          min-height: 600px;
          display: flex;
          align-items: center;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          color: var(--color-gray-900);
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--color-gray-600);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--color-gray-600);
        }

        .hero-illustration {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }

        .hero-illustration svg {
          width: 100%;
          height: auto;
        }

        .how-it-works {
          background: white;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .step-card {
          text-align: center;
          padding: 2rem 1rem;
          position: relative;
        }

        .step-number {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          background: var(--color-primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.25rem;
        }

        .step-icon {
          margin: 3rem auto 1.5rem;
          display: flex;
          justify-content: center;
        }

        .step-card h3 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          color: var(--color-gray-900);
        }

        .step-card p {
          font-size: 0.875rem;
          color: var(--color-gray-600);
          line-height: 1.6;
        }

        .features-section {
          background: var(--color-gray-50);
        }

        .feature-card {
          text-align: center;
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }

        .feature-card p {
          font-size: 0.875rem;
          line-height: 1.6;
        }

        .cta-section {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
          color: white;
          padding: 4rem 0;
        }

        .cta-section h2 {
          color: white;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .cta-section .text-secondary {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.125rem;
        }

        .cta-section .btn {
          background: white;
          color: var(--color-primary);
        }

        .cta-section .btn:hover {
          background: var(--color-gray-100);
        }

        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
          }

          .hero-title {
            font-size: 2rem;
          }

          .steps-grid {
            grid-template-columns: 1fr;
          }

          .hero-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}
