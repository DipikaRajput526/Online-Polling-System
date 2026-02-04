import { Link } from 'react-router-dom';

export default function VoterDashboard() {
    const voterData = {
        name: 'Rajesh Kumar',
        voterId: 'VTR2024001234',
        aadhaarLinked: true,
        activePolls: 3,
        completedVotes: 12,
        upcomingPolls: 2
    };

    const recentPolls = [
        { id: 1, title: 'Municipal Budget Allocation 2024', status: 'Active', endsIn: '2 days', eligible: true },
        { id: 2, title: 'Community Development Project', status: 'Active', endsIn: '5 days', eligible: true },
        { id: 3, title: 'Local Infrastructure Improvement', status: 'Voted', votedOn: '2 days ago', eligible: true }
    ];

    return (
        <div className="voter-dashboard">
            <div className="container">
                <div className="dashboard-header">
                    <div>
                        <h1>Welcome back, {voterData.name}!</h1>
                        <p className="text-secondary">Voter ID: {voterData.voterId}</p>
                    </div>
                    <Link to="/voter/profile" className="btn btn-outline">
                        View Profile
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="stats-grid grid grid-3">
                    <div className="stat-card card">
                        <div className="stat-icon" style={{ background: '#DBEAFE' }}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="#2563EB">
                                <path d="M16 4L20 12H24L18 18L20 26L16 22L12 26L14 18L8 12H12L16 4Z" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{voterData.activePolls}</div>
                            <div className="stat-label">Active Polls</div>
                        </div>
                        <Link to="/voter/polls" className="stat-link">View All →</Link>
                    </div>

                    <div className="stat-card card">
                        <div className="stat-icon" style={{ background: '#D1FAE5' }}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="#10B981">
                                <path d="M16 4C9.4 4 4 9.4 4 16C4 22.6 9.4 28 16 28C22.6 28 28 22.6 28 16C28 9.4 22.6 4 16 4ZM14 22L8 16L10.4 13.6L14 17.2L21.6 9.6L24 12L14 22Z" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{voterData.completedVotes}</div>
                            <div className="stat-label">Votes Cast</div>
                        </div>
                        <Link to="/voter/history" className="stat-link">View History →</Link>
                    </div>

                    <div className="stat-card card">
                        <div className="stat-icon" style={{ background: '#FEF3C7' }}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="#F59E0B">
                                <path d="M16 4C9.4 4 4 9.4 4 16C4 22.6 9.4 28 16 28C22.6 28 28 22.6 28 16C28 9.4 22.6 4 16 4ZM16 26C10.5 26 6 21.5 6 16C6 10.5 10.5 6 16 6C21.5 6 26 10.5 26 16C26 21.5 21.5 26 16 26ZM17 10H15V17L21 20.5L22 18.8L17 16V10Z" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{voterData.upcomingPolls}</div>
                            <div className="stat-label">Upcoming Polls</div>
                        </div>
                        <Link to="/voter/polls?filter=upcoming" className="stat-link">View Details →</Link>
                    </div>
                </div>

                {/* Verification Status */}
                <div className="verification-card card">
                    <div className="card-header">
                        <h3>Verification Status</h3>
                    </div>
                    <div className="verification-items">
                        <div className="verification-item">
                            <div className="verification-icon verified">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5L10 0Z" />
                                </svg>
                            </div>
                            <div>
                                <div className="verification-label">Aadhaar Verification</div>
                                <div className="verification-status verified">Verified</div>
                            </div>
                        </div>
                        <div className="verification-item">
                            <div className="verification-icon verified">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5L10 0Z" />
                                </svg>
                            </div>
                            <div>
                                <div className="verification-label">Mobile Number</div>
                                <div className="verification-status verified">Verified</div>
                            </div>
                        </div>
                        <div className="verification-item">
                            <div className="verification-icon verified">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5L10 0Z" />
                                </svg>
                            </div>
                            <div>
                                <div className="verification-label">Email Address</div>
                                <div className="verification-status verified">Verified</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Polls */}
                <div className="recent-polls-section">
                    <div className="section-header flex-between">
                        <h2>Recent Polls</h2>
                        <Link to="/voter/polls" className="btn btn-outline btn-sm">View All Polls</Link>
                    </div>

                    <div className="polls-list">
                        {recentPolls.map(poll => (
                            <div key={poll.id} className="poll-card card">
                                <div className="poll-header flex-between">
                                    <h3>{poll.title}</h3>
                                    <span className={`badge ${poll.status === 'Active' ? 'badge-success' : 'badge-secondary'}`}>
                                        {poll.status}
                                    </span>
                                </div>
                                <div className="poll-meta">
                                    {poll.status === 'Active' ? (
                                        <>
                                            <span className="poll-meta-item">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                    <path d="M8 2C4.7 2 2 4.7 2 8C2 11.3 4.7 14 8 14C11.3 14 14 11.3 14 8C14 4.7 11.3 2 8 2ZM8 12.5C5.5 12.5 3.5 10.5 3.5 8C3.5 5.5 5.5 3.5 8 3.5C10.5 3.5 12.5 5.5 12.5 8C12.5 10.5 10.5 12.5 8 12.5ZM8.5 5H7.5V8.5L10.5 10.2L11 9.4L8.5 8V5Z" />
                                                </svg>
                                                Ends in {poll.endsIn}
                                            </span>
                                            <Link to={`/voter/vote/${poll.id}`} className="btn btn-primary btn-sm">
                                                Vote Now
                                            </Link>
                                        </>
                                    ) : (
                                        <span className="poll-meta-item text-secondary">
                                            Voted {poll.votedOn}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .voter-dashboard {
          min-height: 100vh;
          padding: 2rem 0;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .dashboard-header h1 {
          margin-bottom: 0.5rem;
        }

        .stats-grid {
          margin-bottom: 2rem;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-content {
          flex: 1;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-text-primary);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          margin-top: 0.5rem;
        }

        .stat-link {
          color: var(--color-primary);
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
        }

        .stat-link:hover {
          text-decoration: underline;
        }

        .verification-card {
          margin-bottom: 2rem;
        }

        .verification-items {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .verification-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .verification-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .verification-icon.verified {
          background: var(--color-success);
          color: white;
        }

        .verification-label {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .verification-status {
          font-size: 0.875rem;
          font-weight: 600;
        }

        .verification-status.verified {
          color: var(--color-success);
        }

        .recent-polls-section {
          margin-bottom: 2rem;
        }

        .section-header {
          margin-bottom: 1.5rem;
        }

        .polls-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .poll-card {
          transition: transform 0.2s;
        }

        .poll-card:hover {
          transform: translateX(5px);
        }

        .poll-header {
          margin-bottom: 1rem;
        }

        .poll-header h3 {
          font-size: 1.125rem;
          margin: 0;
        }

        .poll-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .poll-meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .verification-items {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}
