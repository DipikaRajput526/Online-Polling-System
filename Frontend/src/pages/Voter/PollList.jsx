import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function PollList() {
    const [filter, setFilter] = useState('all'); // 'all', 'active', 'upcoming', 'completed'

    const polls = [
        {
            id: 1,
            title: 'Municipal Budget Allocation 2024',
            description: 'Vote on the allocation of funds for various municipal projects and services.',
            startDate: '2024-02-01',
            endDate: '2024-02-10',
            status: 'active',
            eligible: true,
            totalVotes: 15234,
            participated: false
        },
        {
            id: 2,
            title: 'Community Development Project Selection',
            description: 'Choose which community development projects should be prioritized this year.',
            startDate: '2024-02-05',
            endDate: '2024-02-15',
            status: 'active',
            eligible: true,
            totalVotes: 8932,
            participated: false
        },
        {
            id: 3,
            title: 'Local Infrastructure Improvement',
            description: 'Select infrastructure improvements for roads, water supply, and public facilities.',
            startDate: '2024-01-20',
            endDate: '2024-01-30',
            status: 'completed',
            eligible: true,
            totalVotes: 21456,
            participated: true
        },
        {
            id: 4,
            title: 'Education Policy Reform',
            description: 'Provide your input on proposed changes to local education policies.',
            startDate: '2024-02-15',
            endDate: '2024-02-25',
            status: 'upcoming',
            eligible: true,
            totalVotes: 0,
            participated: false
        }
    ];

    const filteredPolls = polls.filter(poll => {
        if (filter === 'all') return true;
        return poll.status === filter;
    });

    const getStatusBadge = (status) => {
        const badges = {
            active: { class: 'badge-success', text: 'Active' },
            upcoming: { class: 'badge-warning', text: 'Upcoming' },
            completed: { class: 'badge-secondary', text: 'Completed' }
        };
        return badges[status] || badges.active;
    };

    return (
        <div className="poll-list-page">
            <div className="container">
                <div className="page-header">
                    <h1>Available Polls</h1>
                    <p className="text-secondary">Browse and participate in active polls</p>
                </div>

                {/* Filter Tabs */}
                <div className="filter-tabs">
                    <button
                        className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All Polls
                    </button>
                    <button
                        className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
                        onClick={() => setFilter('active')}
                    >
                        Active
                    </button>
                    <button
                        className={`filter-tab ${filter === 'upcoming' ? 'active' : ''}`}
                        onClick={() => setFilter('upcoming')}
                    >
                        Upcoming
                    </button>
                    <button
                        className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
                        onClick={() => setFilter('completed')}
                    >
                        Completed
                    </button>
                </div>

                {/* Polls Grid */}
                <div className="polls-grid">
                    {filteredPolls.map(poll => {
                        const badge = getStatusBadge(poll.status);
                        return (
                            <div key={poll.id} className="poll-item card">
                                <div className="poll-item-header">
                                    <span className={`badge ${badge.class}`}>{badge.text}</span>
                                    {poll.participated && (
                                        <span className="participated-badge">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6L8 0Z" />
                                            </svg>
                                            Voted
                                        </span>
                                    )}
                                </div>

                                <h3>{poll.title}</h3>
                                <p className="poll-description">{poll.description}</p>

                                <div className="poll-meta-grid">
                                    <div className="meta-item">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M5 2V3H2V14H14V3H11V2H5ZM6 3H10V5H6V3ZM3 4H5V6H11V4H13V13H3V4Z" />
                                        </svg>
                                        <span>Start: {new Date(poll.startDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="meta-item">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M8 2C4.7 2 2 4.7 2 8C2 11.3 4.7 14 8 14C11.3 14 14 11.3 14 8C14 4.7 11.3 2 8 2ZM8 12.5C5.5 12.5 3.5 10.5 3.5 8C3.5 5.5 5.5 3.5 8 3.5C10.5 3.5 12.5 5.5 12.5 8C12.5 10.5 10.5 12.5 8 12.5ZM8.5 5H7.5V8.5L10.5 10.2L11 9.4L8.5 8V5Z" />
                                        </svg>
                                        <span>End: {new Date(poll.endDate).toLocaleDateString()}</span>
                                    </div>
                                    {poll.totalVotes > 0 && (
                                        <div className="meta-item">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M8 2C4.7 2 2 4.7 2 8C2 11.3 4.7 14 8 14C11.3 14 14 11.3 14 8C14 4.7 11.3 2 8 2ZM8 5C9.1 5 10 5.9 10 7C10 8.1 9.1 9 8 9C6.9 9 6 8.1 6 7C6 5.9 6.9 5 8 5ZM8 12.5C6.5 12.5 5.2 11.7 4.5 10.5C4.5 9.2 7.2 8.5 8 8.5C8.8 8.5 11.5 9.2 11.5 10.5C10.8 11.7 9.5 12.5 8 12.5Z" />
                                            </svg>
                                            <span>{poll.totalVotes.toLocaleString()} votes</span>
                                        </div>
                                    )}
                                </div>

                                <div className="poll-actions">
                                    {poll.status === 'active' && !poll.participated && poll.eligible && (
                                        <Link to={`/voter/vote/${poll.id}`} className="btn btn-primary btn-block">
                                            Vote Now
                                        </Link>
                                    )}
                                    {poll.status === 'active' && poll.participated && (
                                        <button className="btn btn-outline btn-block" disabled>
                                            Already Voted
                                        </button>
                                    )}
                                    {poll.status === 'upcoming' && (
                                        <button className="btn btn-secondary btn-block" disabled>
                                            Starts {new Date(poll.startDate).toLocaleDateString()}
                                        </button>
                                    )}
                                    {poll.status === 'completed' && (
                                        <Link to={`/results/${poll.id}`} className="btn btn-outline btn-block">
                                            View Results
                                        </Link>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredPolls.length === 0 && (
                    <div className="empty-state card text-center">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                            <circle cx="40" cy="40" r="38" fill="#E2E8F0" />
                            <path d="M40 20L44 32H48L42 38L44 50L40 44L36 50L38 38L32 32H36L40 20Z" fill="#64748B" />
                        </svg>
                        <h3>No polls found</h3>
                        <p className="text-secondary">There are no {filter !== 'all' ? filter : ''} polls at the moment.</p>
                    </div>
                )}
            </div>

            <style jsx>{`
        .poll-list-page {
          min-height: 100vh;
          padding: 2rem 0;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-header h1 {
          margin-bottom: 0.5rem;
        }

        .filter-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          border-bottom: 2px solid var(--color-border);
        }

        .filter-tab {
          padding: 0.75rem 1.5rem;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          font-weight: 500;
          color: var(--color-text-secondary);
          transition: all 0.3s;
          margin-bottom: -2px;
        }

        .filter-tab:hover {
          color: var(--color-primary);
        }

        .filter-tab.active {
          color: var(--color-primary);
          border-bottom-color: var(--color-primary);
        }

        .polls-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .poll-item {
          display: flex;
          flex-direction: column;
        }

        .poll-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .participated-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--color-success);
          font-weight: 600;
        }

        .poll-item h3 {
          font-size: 1.125rem;
          margin-bottom: 0.75rem;
        }

        .poll-description {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          margin-bottom: 1rem;
          flex: 1;
        }

        .poll-meta-grid {
          display: grid;
          gap: 0.5rem;
          margin-bottom: 1rem;
          padding: 1rem;
          background: var(--color-gray-50);
          border-radius: var(--radius-md);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .poll-actions {
          margin-top: auto;
        }

        .empty-state {
          padding: 3rem;
        }

        .empty-state svg {
          margin: 0 auto 1rem;
        }

        @media (max-width: 768px) {
          .polls-grid {
            grid-template-columns: 1fr;
          }

          .filter-tabs {
            overflow-x: auto;
          }
        }
      `}</style>
        </div>
    );
}
