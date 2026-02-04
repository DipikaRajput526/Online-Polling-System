import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function VoteCasting() {
    const { pollId } = useParams();
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const pollData = {
        id: pollId,
        title: 'Municipal Budget Allocation 2024',
        description: 'Vote on the allocation of funds for various municipal projects and services for the fiscal year 2024-25.',
        endsIn: '2 days',
        options: [
            {
                id: 'opt1',
                name: 'Infrastructure Development',
                description: 'Focus on roads, bridges, and public transportation',
                percentage: 35
            },
            {
                id: 'opt2',
                name: 'Education & Healthcare',
                description: 'Improve schools, hospitals, and public health facilities',
                percentage: 40
            },
            {
                id: 'opt3',
                name: 'Environmental Projects',
                description: 'Parks, waste management, and green initiatives',
                percentage: 15
            },
            {
                id: 'opt4',
                name: 'Technology & Innovation',
                description: 'Smart city initiatives and digital infrastructure',
                percentage: 10
            }
        ]
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedOption) {
            setShowConfirmModal(true);
        }
    };

    const confirmVote = () => {
        // Submit vote
        navigate('/voter/vote-confirmation');
    };

    return (
        <div className="vote-casting-page">
            <div className="container container-sm">
                <div className="vote-card card">
                    <div className="card-header">
                        <h2>{pollData.title}</h2>
                        <p className="text-secondary">{pollData.description}</p>
                        <div className="poll-timer">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2C5.6 2 2 5.6 2 10C2 14.4 5.6 18 10 18C14.4 18 18 14.4 18 10C18 5.6 14.4 2 10 2ZM10 16C6.7 16 4 13.3 4 10C4 6.7 6.7 4 10 4C13.3 4 16 6.7 16 10C16 13.3 13.3 16 10 16ZM10.5 6H9.5V10.5L13 12.8L13.5 12L10.5 10V6Z" />
                            </svg>
                            <span>Poll closes in <strong>{pollData.endsIn}</strong></span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="alert alert-info">
                            <strong>Important:</strong> You can only vote once. Your choice cannot be changed after submission.
                        </div>

                        <div className="options-list">
                            {pollData.options.map(option => (
                                <label key={option.id} className={`option-card ${selectedOption === option.id ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="vote"
                                        value={option.id}
                                        checked={selectedOption === option.id}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                        required
                                    />
                                    <div className="option-content">
                                        <div className="option-header">
                                            <h3>{option.name}</h3>
                                            <div className="radio-indicator"></div>
                                        </div>
                                        <p className="option-description">{option.description}</p>
                                    </div>
                                </label>
                            ))}
                        </div>

                        <div className="vote-actions">
                            <button type="button" className="btn btn-outline" onClick={() => navigate('/voter/polls')}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={!selectedOption}>
                                Submit Vote
                            </button>
                        </div>
                    </form>
                </div>

                {/* Security Notice */}
                <div className="security-notice card">
                    <h4>🔒 Your Vote is Secure</h4>
                    <ul>
                        <li>Your vote is encrypted end-to-end</li>
                        <li>Your choice remains confidential</li>
                        <li>You will receive a unique vote ID as confirmation</li>
                        <li>The vote ID cannot be used to trace your choice</li>
                    </ul>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
                    <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
                        <h3>Confirm Your Vote</h3>
                        <p className="text-secondary">Are you sure you want to submit your vote? This action cannot be undone.</p>

                        <div className="selected-option-display">
                            <strong>Your Selection:</strong>
                            <p>{pollData.options.find(opt => opt.id === selectedOption)?.name}</p>
                        </div>

                        <div className="modal-actions">
                            <button className="btn btn-outline" onClick={() => setShowConfirmModal(false)}>
                                Go Back
                            </button>
                            <button className="btn btn-primary" onClick={confirmVote}>
                                Confirm & Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .vote-casting-page {
          min-height: 100vh;
          padding: 2rem 0;
        }

        .vote-card {
          margin-bottom: 1.5rem;
        }

        .poll-timer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          padding: 0.75rem 1rem;
          background: var(--color-gray-50);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .options-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .option-card {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
          border: 2px solid var(--color-border);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all 0.3s;
        }

        .option-card:hover {
          border-color: var(--color-primary);
          background: var(--color-gray-50);
        }

        .option-card.selected {
          border-color: var(--color-primary);
          background: rgba(37, 99, 235, 0.05);
        }

        .option-card input[type="radio"] {
          display: none;
        }

        .option-content {
          flex: 1;
        }

        .option-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .option-header h3 {
          font-size: 1.125rem;
          margin: 0;
        }

        .radio-indicator {
          width: 24px;
          height: 24px;
          border: 2px solid var(--color-border);
          border-radius: 50%;
          position: relative;
          transition: all 0.3s;
        }

        .option-card.selected .radio-indicator {
          border-color: var(--color-primary);
          background: var(--color-primary);
        }

        .option-card.selected .radio-indicator::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        }

        .option-description {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          margin: 0;
        }

        .vote-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .security-notice {
          background: var(--color-gray-50);
        }

        .security-notice h4 {
          margin-bottom: 1rem;
        }

        .security-notice ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .security-notice li {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          padding-left: 1.5rem;
          position: relative;
        }

        .security-notice li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--color-success);
          font-weight: 700;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          max-width: 500px;
          width: 100%;
          animation: slideIn 0.3s ease-out;
        }

        .modal-content h3 {
          margin-bottom: 1rem;
        }

        .selected-option-display {
          padding: 1rem;
          background: var(--color-gray-50);
          border-radius: var(--radius-md);
          margin: 1.5rem 0;
        }

        .selected-option-display strong {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .selected-option-display p {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-primary);
          margin: 0;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
}
