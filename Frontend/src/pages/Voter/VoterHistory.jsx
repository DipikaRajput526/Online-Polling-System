import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function VoterHistory() {
    const [filter, setFilter] = useState('all'); // 'all', 'completed', 'active'

    const voteHistory = [
        {
            id: 1,
            pollTitle: 'Municipal Budget Allocation 2024',
            voteId: 'VT-2024-ABC123XYZ',
            votedOn: '2024-02-05 14:30',
            status: 'active',
            resultAvailable: false
        },
        {
            id: 2,
            pollTitle: 'Community Development Project Selection',
            voteId: 'VT-2024-DEF456UVW',
            votedOn: '2024-02-03 10:15',
            status: 'active',
            resultAvailable: false
        },
        {
            id: 3,
            pollTitle: 'Local Infrastructure Improvement',
            voteId: 'VT-2024-GHI789RST',
            votedOn: '2024-01-28 16:45',
            status: 'completed',
            resultAvailable: true,
            winner: 'Road Development Initiative'
        },
        {
            id: 4,
            pollTitle: 'Public Park Renovation Plan',
            voteId: 'VT-2024-JKL012MNO',
            votedOn: '2024-01-15 11:20',
            status: 'completed',
            resultAvailable: true,
            winner: 'Eco-Friendly Park Design'
        },
        {
            id: 5,
            pollTitle: 'Education System Reform',
            voteId: 'VT-2023-PQR345STU',
            votedOn: '2023-12-20 09:30',
            status: 'completed',
            resultAvailable: true,
            winner: 'Digital Learning Integration'
        }
    ];

    const filteredHistory = voteHistory.filter(vote => {
        if (filter === 'all') return true;
        return vote.status === filter;
    });

    return (
        <div className="voter-history-page">
            <div className="container">
                <div className="page-header">
                    <div>
                        <h1>My Voting History</h1>
                        <p className="text-secondary">Track all your past and active poll participations</p>
                    </div>
                    <div className="stats-summary">
                        <div className="summary-item">
                            <span className="summary-number">{voteHistory.length}</span>
                            <span className="summary-label">Total Votes</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-number">{voteHistory.filter(v => v.status === 'active').length}</span>
                            <span className="summary-label">Active</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-number">{voteHistory.filter(v => v.status === 'completed').length}</span>
                            <span className="summary-label">Completed</span>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="filter-tabs">
                    <button
                        className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All ({voteHistory.length})
                    </button>
                    <button
                        className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
                        onClick={() => setFilter('active')}
                    >
                        Active ({voteHistory.filter(v => v.status === 'active').length})
                    </button>
                    <button
                        className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
                        onClick={() => setFilter('completed')}
                    >
                        Completed ({voteHistory.filter(v => v.status === 'completed').length})
                    </button>
                </div>

                {/* History Table */}
                <div className="history-table card">
                    <table>
                        <thead>
                            <tr>
                                <th>Poll Title</th>
                                <th>Vote ID</th>
                                <th>Voted On</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredHistory.map(vote => (
                                <tr key={vote.id}>
                                    <td>
                                        <div className="poll-title-cell">
                                            <strong>{vote.pollTitle}</strong>
                                            {vote.winner && (
                                                <span className="winner-badge">
                                                    🏆 Winner: {vote.winner}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <code className="vote-id-code">{vote.voteId}</code>
                                    </td>
                                    <td className="text-secondary">{vote.votedOn}</td>
                                    <td>
                                        <span className={`badge ${vote.status === 'active' ? 'badge-warning' : 'badge-success'}`}>
                                            {vote.status === 'active' ? 'Ongoing' : 'Completed'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons-cell">
                                            {vote.resultAvailable ? (
                                                <Link to={`/results/${vote.id}`} className="btn btn-sm btn-primary">
                                                    View Results
                                                </Link>
                                            ) : (
                                                <span className="text-secondary" style={{ fontSize: '0.875rem' }}>
                                                    Results pending
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredHistory.length === 0 && (
                    <div className="empty-state card text-center">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                            <circle cx="40" cy="40" r="38" fill="#E2E8F0" />
                            <path d="M40 20L44 32H48L42 38L44 50L40 44L36 50L38 38L32 32H36L40 20Z" fill="#64748B" />
                        </svg>
                        <h3>No voting history found</h3>
                        <p className="text-secondary">You haven't participated in any {filter !== 'all' ? filter : ''} polls yet.</p>
                        <Link to="/voter/polls" className="btn btn-primary">
                            Browse Available Polls
                        </Link>
                    </div>
                )}
            </div>

            <style jsx>{`
        .voter-history-page {
          min-height: 100vh;
          padding: 2rem 0;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .page-header h1 {
          margin-bottom: 0.5rem;
        }

        .stats-summary {
          display: flex;
          gap: 2rem;
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .summary-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-primary);
          line-height: 1;
        }

        .summary-label {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          margin-top: 0.25rem;
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

        .history-table {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: var(--color-gray-50);
        }

        th {
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: var(--color-text-primary);
          border-bottom: 2px solid var(--color-border);
        }

        td {
          padding: 1rem;
          border-bottom: 1px solid var(--color-border);
        }

        tbody tr:hover {
          background: var(--color-gray-50);
        }

        .poll-title-cell {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .winner-badge {
          font-size: 0.75rem;
          color: var(--color-gold);
          font-weight: 500;
        }

        .vote-id-code {
          font-family: monospace;
          background: var(--color-gray-100);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          color: var(--color-primary);
        }

        .action-buttons-cell {
          display: flex;
          gap: 0.5rem;
        }

        .empty-state {
          padding: 3rem;
        }

        .empty-state svg {
          margin: 0 auto 1rem;
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            gap: 1.5rem;
          }

          .stats-summary {
            width: 100%;
            justify-content: space-around;
          }

          .history-table {
            font-size: 0.875rem;
          }

          th, td {
            padding: 0.75rem 0.5rem;
          }
        }
      `}</style>
        </div>
    );
}
