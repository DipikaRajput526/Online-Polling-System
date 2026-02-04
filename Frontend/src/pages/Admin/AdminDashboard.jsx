import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    const stats = {
        totalPolls: 45,
        activePolls: 8,
        totalVoters: 50234,
        totalVotes: 125678,
        pendingVerifications: 234
    };

    const recentPolls = [
        { id: 1, title: 'Municipal Budget Allocation 2024', status: 'Active', votes: 15234, endsIn: '2 days' },
        { id: 2, title: 'Community Development Project', status: 'Active', votes: 8932, endsIn: '5 days' },
        { id: 3, title: 'Local Infrastructure Improvement', status: 'Completed', votes: 21456, completedOn: '2 days ago' }
    ];

    const recentActivity = [
        { id: 1, action: 'New poll created', user: 'Admin User', time: '10 minutes ago', type: 'poll' },
        { id: 2, action: 'Voter verified', user: 'System', time: '25 minutes ago', type: 'verification' },
        { id: 3, action: 'Poll results published', user: 'Admin User', time: '1 hour ago', type: 'result' },
        { id: 4, action: 'New voter registered', user: 'System', time: '2 hours ago', type: 'registration' }
    ];

    return (
        <div className="admin-dashboard">
            <div className="container">
                <div className="dashboard-header">
                    <div>
                        <h1>Admin Dashboard</h1>
                        <p className="text-secondary">Manage polls, voters, and system settings</p>
                    </div>
                    <Link to="/admin/create-poll" className="btn btn-primary">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2C10.6 2 11 2.4 11 3V9H17C17.6 9 18 9.4 18 10C18 10.6 17.6 11 17 11H11V17C11 17.6 10.6 18 10 18C9.4 18 9 17.6 9 17V11H3C2.4 11 2 10.6 2 10C2 9.4 2.4 9 3 9H9V3C9 2.4 9.4 2 10 2Z" />
                        </svg>
                        Create New Poll
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid grid grid-4">
                    <div className="stat-card card">
                        <div className="stat-icon" style={{ background: '#DBEAFE' }}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="#2563EB">
                                <path d="M16 4L20 12H24L18 18L20 26L16 22L12 26L14 18L8 12H12L16 4Z" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{stats.totalPolls}</div>
                            <div className="stat-label">Total Polls</div>
                        </div>
                    </div>

                    <div className="stat-card card">
                        <div className="stat-icon" style={{ background: '#D1FAE5' }}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="#10B981">
                                <path d="M16 4C9.4 4 4 9.4 4 16C4 22.6 9.4 28 16 28C22.6 28 28 22.6 28 16C28 9.4 22.6 4 16 4ZM14 22L8 16L10.4 13.6L14 17.2L21.6 9.6L24 12L14 22Z" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{stats.activePolls}</div>
                            <div className="stat-label">Active Polls</div>
                        </div>
                    </div>

                    <div className="stat-card card">
                        <div className="stat-icon" style={{ background: '#FEF3C7' }}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="#F59E0B">
                                <path d="M16 4C9.4 4 4 9.4 4 16C4 22.6 9.4 28 16 28C22.6 28 28 22.6 28 16C28 9.4 22.6 4 16 4ZM16 10C17.7 10 19 11.3 19 13C19 14.7 17.7 16 16 16C14.3 16 13 14.7 13 13C13 11.3 14.3 10 16 10ZM16 25C13 25 10.3 23.3 9 20.8C9 18.3 14 17 16 17C18 17 23 18.3 23 20.8C21.7 23.3 19 25 16 25Z" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{stats.totalVoters.toLocaleString()}</div>
                            <div className="stat-label">Registered Voters</div>
                        </div>
                    </div>

                    <div className="stat-card card">
                        <div className="stat-icon" style={{ background: '#FCE7F3' }}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="#EC4899">
                                <path d="M26 8H22V6C22 4.9 21.1 4 20 4H12C10.9 4 10 4.9 10 6V8H6C4.9 8 4 8.9 4 10V24C4 25.1 4.9 26 6 26H26C27.1 26 28 25.1 28 24V10C28 8.9 27.1 8 26 8ZM12 6H20V8H12V6ZM26 24H6V10H26V24Z" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{stats.totalVotes.toLocaleString()}</div>
                            <div className="stat-label">Total Votes Cast</div>
                        </div>
                    </div>
                </div>

                <div className="dashboard-content">
                    {/* Recent Polls */}
                    <div className="section-card card">
                        <div className="section-header flex-between">
                            <h2>Recent Polls</h2>
                            <Link to="/admin/polls" className="btn btn-outline btn-sm">View All</Link>
                        </div>
                        <div className="polls-list">
                            {recentPolls.map(poll => (
                                <div key={poll.id} className="poll-item">
                                    <div className="poll-info">
                                        <h3>{poll.title}</h3>
                                        <div className="poll-meta">
                                            <span className={`badge ${poll.status === 'Active' ? 'badge-success' : 'badge-secondary'}`}>
                                                {poll.status}
                                            </span>
                                            <span className="meta-text">{poll.votes.toLocaleString()} votes</span>
                                            {poll.status === 'Active' && (
                                                <span className="meta-text">Ends in {poll.endsIn}</span>
                                            )}
                                            {poll.status === 'Completed' && (
                                                <span className="meta-text">Completed {poll.completedOn}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="poll-actions">
                                        <Link to={`/admin/polls/${poll.id}/edit`} className="btn btn-sm btn-outline">Edit</Link>
                                        <Link to={`/results/${poll.id}`} className="btn btn-sm btn-primary">View Results</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="section-card card">
                        <div className="section-header">
                            <h2>Recent Activity</h2>
                        </div>
                        <div className="activity-list">
                            {recentActivity.map(activity => (
                                <div key={activity.id} className="activity-item">
                                    <div className={`activity-icon ${activity.type}`}>
                                        {activity.type === 'poll' && '📊'}
                                        {activity.type === 'verification' && '✓'}
                                        {activity.type === 'result' && '📈'}
                                        {activity.type === 'registration' && '👤'}
                                    </div>
                                    <div className="activity-content">
                                        <div className="activity-action">{activity.action}</div>
                                        <div className="activity-meta">
                                            <span>{activity.user}</span>
                                            <span>•</span>
                                            <span>{activity.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions card">
                    <h3>Quick Actions</h3>
                    <div className="actions-grid grid grid-3">
                        <Link to="/admin/create-poll" className="action-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C12.6 2 13 2.4 13 3V11H21C21.6 11 22 11.4 22 12C22 12.6 21.6 13 21 13H13V21C13 21.6 12.6 22 12 22C11.4 22 11 21.6 11 21V13H3C2.4 13 2 12.6 2 12C2 11.4 2.4 11 3 11H11V3C11 2.4 11.4 2 12 2Z" />
                            </svg>
                            <span>Create Poll</span>
                        </Link>
                        <Link to="/admin/users" className="action-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 11C17.7 11 19 9.7 19 8C19 6.3 17.7 5 16 5C14.3 5 13 6.3 13 8C13 9.7 14.3 11 16 11ZM8 11C9.7 11 11 9.7 11 8C11 6.3 9.7 5 8 5C6.3 5 5 6.3 5 8C5 9.7 6.3 11 8 11ZM8 13C5.3 13 0 14.3 0 17V19H16V17C16 14.3 10.7 13 8 13ZM16 13C15.7 13 15.4 13 15 13.1C16.2 14 17 15.3 17 17V19H24V17C24 14.3 18.7 13 16 13Z" />
                            </svg>
                            <span>Manage Users</span>
                        </Link>
                        <Link to="/admin/analytics" className="action-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 22H21V20H3V22ZM5 18H7V10H5V18ZM9 18H11V6H9V18ZM13 18H15V12H13V18ZM17 18H19V8H17V18Z" />
                            </svg>
                            <span>View Analytics</span>
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .admin-dashboard {
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
          gap: 1rem;
          align-items: flex-start;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-content {
          flex: 1;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-text-primary);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          margin-top: 0.5rem;
        }

        .dashboard-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .section-card {
          display: flex;
          flex-direction: column;
        }

        .section-header {
          margin-bottom: 1.5rem;
        }

        .section-header h2 {
          font-size: 1.25rem;
          margin: 0;
        }

        .polls-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .poll-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: var(--color-gray-50);
          border-radius: var(--radius-md);
        }

        .poll-info h3 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .poll-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .meta-text {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .poll-actions {
          display: flex;
          gap: 0.5rem;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          background: var(--color-gray-100);
        }

        .activity-content {
          flex: 1;
        }

        .activity-action {
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .activity-meta {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          display: flex;
          gap: 0.5rem;
        }

        .quick-actions h3 {
          margin-bottom: 1.5rem;
        }

        .actions-grid {
          gap: 1rem;
        }

        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 2rem 1rem;
          background: var(--color-gray-50);
          border-radius: var(--radius-lg);
          text-decoration: none;
          color: var(--color-text-primary);
          transition: all 0.3s;
        }

        .action-btn:hover {
          background: var(--color-primary);
          color: white;
          transform: translateY(-2px);
        }

        .action-btn svg {
          transition: transform 0.3s;
        }

        .action-btn:hover svg {
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .dashboard-content {
            grid-template-columns: 1fr;
          }

          .poll-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
        </div>
    );
}
