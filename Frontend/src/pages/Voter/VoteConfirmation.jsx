import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function VoteConfirmation() {
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        setTimeout(() => setShowConfetti(false), 3000);
    }, []);

    const voteData = {
        voteId: 'VT-2024-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        pollTitle: 'Municipal Budget Allocation 2024',
        timestamp: new Date().toLocaleString(),
        pollId: 1
    };

    const handleDownload = () => {
        // Generate and download receipt
        alert('Receipt downloaded!');
    };

    return (
        <div className="vote-confirmation-page">
            {showConfetti && <div className="confetti"></div>}

            <div className="container container-sm">
                <div className="confirmation-card card">
                    <div className="success-icon">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                            <circle cx="50" cy="50" r="48" fill="#10B981" opacity="0.1" />
                            <circle cx="50" cy="50" r="40" fill="#10B981" />
                            <path d="M35 50L45 60L65 40" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <h1 className="text-center">Vote Submitted Successfully!</h1>
                    <p className="text-center text-secondary">
                        Thank you for participating in the democratic process. Your vote has been securely recorded.
                    </p>

                    <div className="receipt-section">
                        <h3>Vote Receipt</h3>
                        <div className="receipt-card">
                            <div className="receipt-header">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                    <circle cx="30" cy="30" r="28" fill="#2563EB" opacity="0.1" />
                                    <path d="M30 10L33 22L40 25L33 28L30 40L27 28L20 25L27 22L30 10Z" fill="#2563EB" />
                                </svg>
                                <h4>Official Vote Confirmation</h4>
                            </div>

                            <div className="receipt-details">
                                <div className="detail-row">
                                    <span className="detail-label">Vote ID:</span>
                                    <span className="detail-value vote-id">{voteData.voteId}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Poll:</span>
                                    <span className="detail-value">{voteData.pollTitle}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Timestamp:</span>
                                    <span className="detail-value">{voteData.timestamp}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Status:</span>
                                    <span className="badge badge-success">Verified & Recorded</span>
                                </div>
                            </div>

                            <div className="receipt-footer">
                                <p className="security-note">
                                    🔒 This Vote ID confirms your participation but cannot be used to trace your vote choice.
                                </p>
                            </div>
                        </div>

                        <button className="btn btn-outline btn-block" onClick={handleDownload}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2V12M10 12L6 8M10 12L14 8M4 14V16C4 17.1 4.9 18 6 18H14C15.1 18 16 17.1 16 16V14" />
                            </svg>
                            Download Receipt (PDF)
                        </button>
                    </div>

                    <div className="info-boxes">
                        <div className="info-box">
                            <h4>What happens next?</h4>
                            <ul>
                                <li>Your vote is encrypted and stored securely</li>
                                <li>Results will be published after the poll closes</li>
                                <li>You can view results in the Results section</li>
                                <li>Your vote history is updated automatically</li>
                            </ul>
                        </div>

                        <div className="info-box">
                            <h4>Important Notes</h4>
                            <ul>
                                <li>Save your Vote ID for future reference</li>
                                <li>You cannot change your vote after submission</li>
                                <li>Your vote choice remains confidential</li>
                                <li>Contact support if you notice any issues</li>
                            </ul>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <Link to="/voter/dashboard" className="btn btn-primary">
                            Back to Dashboard
                        </Link>
                        <Link to="/voter/polls" className="btn btn-outline">
                            View More Polls
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .vote-confirmation-page {
          min-height: 100vh;
          padding: 3rem 0;
          background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
          position: relative;
        }

        .confetti {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          background-image: 
            radial-gradient(circle, #FFD700 20%, transparent 20%),
            radial-gradient(circle, #2563EB 20%, transparent 20%),
            radial-gradient(circle, #10B981 20%, transparent 20%);
          background-size: 50px 50px;
          background-position: 0 0, 25px 25px, 50px 50px;
          animation: confettiFall 3s linear;
          opacity: 0;
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(-100%);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        .confirmation-card {
          max-width: 700px;
          margin: 0 auto;
        }

        .success-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
          animation: scaleIn 0.5s ease-out;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .confirmation-card h1 {
          color: var(--color-success);
          margin-bottom: 1rem;
        }

        .receipt-section {
          margin: 2rem 0;
        }

        .receipt-section h3 {
          margin-bottom: 1rem;
        }

        .receipt-card {
          background: var(--color-gray-50);
          border: 2px dashed var(--color-border);
          border-radius: var(--radius-lg);
          padding: 2rem;
          margin-bottom: 1rem;
        }

        .receipt-header {
          text-align: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px dashed var(--color-border);
        }

        .receipt-header svg {
          margin: 0 auto 0.5rem;
        }

        .receipt-header h4 {
          margin: 0;
          color: var(--color-primary);
        }

        .receipt-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: white;
          border-radius: var(--radius-md);
        }

        .detail-label {
          font-weight: 600;
          color: var(--color-text-secondary);
        }

        .detail-value {
          font-weight: 500;
          color: var(--color-text-primary);
        }

        .vote-id {
          font-family: monospace;
          font-size: 1.125rem;
          color: var(--color-primary);
          font-weight: 700;
        }

        .receipt-footer {
          padding-top: 1rem;
          border-top: 2px dashed var(--color-border);
        }

        .security-note {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          text-align: center;
          margin: 0;
        }

        .info-boxes {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin: 2rem 0;
        }

        .info-box {
          background: var(--color-gray-50);
          padding: 1.5rem;
          border-radius: var(--radius-lg);
        }

        .info-box h4 {
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .info-box ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .info-box li {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          padding-left: 1.5rem;
          position: relative;
        }

        .info-box li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--color-success);
          font-weight: 700;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .info-boxes {
            grid-template-columns: 1fr;
          }

          .action-buttons {
            flex-direction: column;
          }
        }
      `}</style>
        </div>
    );
}
