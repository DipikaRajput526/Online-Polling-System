import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function LiveResults() {
    const { pollId } = useParams();
    const [viewMode, setViewMode] = useState('chart'); // 'chart' or 'table'

    const pollData = {
        id: pollId || 3,
        title: 'Local Infrastructure Improvement',
        description: 'Select infrastructure improvements for roads, water supply, and public facilities.',
        status: 'completed',
        startDate: '2024-01-20',
        endDate: '2024-01-30',
        totalVotes: 21456,
        results: [
            { id: 1, option: 'Road Development Initiative', votes: 8932, percentage: 41.6 },
            { id: 2, option: 'Water Supply Upgrade', votes: 7234, percentage: 33.7 },
            { id: 3, option: 'Public Transport Enhancement', votes: 3456, percentage: 16.1 },
            { id: 4, option: 'Street Lighting Project', votes: 1834, percentage: 8.6 }
        ]
    };

    const winner = pollData.results[0];
    const maxVotes = Math.max(...pollData.results.map(r => r.votes));

    return (
        <div className="live-results-page">
            <div className="container">
                {/* Header */}
                <div className="results-header card">
                    <div className="header-content">
                        <div>
                            <h1>{pollData.title}</h1>
                            <p className="text-secondary">{pollData.description}</p>
                            <div className="poll-dates">
                                <span>{new Date(pollData.startDate).toLocaleDateString()} - {new Date(pollData.endDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="header-stats">
                            <div className="stat-box">
                                <div className="stat-number">{pollData.totalVotes.toLocaleString()}</div>
                                <div className="stat-label">Total Votes</div>
                            </div>
                            <span className={`badge ${pollData.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                                {pollData.status === 'completed' ? 'Poll Closed' : 'Live Voting'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Winner Announcement */}
                {pollData.status === 'completed' && (
                    <div className="winner-card card">
                        <div className="winner-icon">🏆</div>
                        <div className="winner-content">
                            <h2>Winner</h2>
                            <h3>{winner.option}</h3>
                            <p>{winner.votes.toLocaleString()} votes ({winner.percentage}%)</p>
                        </div>
                    </div>
                )}

                {/* View Mode Toggle */}
                <div className="view-toggle">
                    <button
                        className={`toggle-btn ${viewMode === 'chart' ? 'active' : ''}`}
                        onClick={() => setViewMode('chart')}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 18H18V16H2V18ZM4 14H6V8H4V14ZM8 14H10V4H8V14ZM12 14H14V10H12V14ZM16 14H18V6H16V14Z" />
                        </svg>
                        Chart View
                    </button>
                    <button
                        className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                        onClick={() => setViewMode('table')}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M3 3H17C17.6 3 18 3.4 18 4V16C18 16.6 17.6 17 17 17H3C2.4 17 2 16.6 2 16V4C2 3.4 2.4 3 3 3ZM4 5V7H16V5H4ZM4 9V11H16V9H4ZM4 13V15H16V13H4Z" />
                        </svg>
                        Table View
                    </button>
                </div>

                {/* Results Display */}
                {viewMode === 'chart' ? (
                    <div className="charts-section">
                        {/* Bar Chart */}
                        <div className="chart-card card">
                            <h3>Vote Distribution</h3>
                            <div className="bar-chart">
                                {pollData.results.map((result, index) => (
                                    <div key={result.id} className="bar-item">
                                        <div className="bar-label">
                                            <span className="option-name">{result.option}</span>
                                            <span className="vote-count">{result.votes.toLocaleString()} votes</span>
                                        </div>
                                        <div className="bar-container">
                                            <div
                                                className="bar-fill"
                                                style={{
                                                    width: `${result.percentage}%`,
                                                    background: index === 0 ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' :
                                                        index === 1 ? 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)' :
                                                            index === 2 ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' :
                                                                'linear-gradient(135deg, #64748B 0%, #475569 100%)'
                                                }}
                                            >
                                                <span className="percentage-label">{result.percentage}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pie Chart */}
                        <div className="chart-card card">
                            <h3>Percentage Breakdown</h3>
                            <div className="pie-chart-container">
                                <svg viewBox="0 0 200 200" className="pie-chart">
                                    {pollData.results.reduce((acc, result, index) => {
                                        const startAngle = acc.angle;
                                        const angle = (result.percentage / 100) * 360;
                                        const endAngle = startAngle + angle;

                                        const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
                                        const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
                                        const x2 = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180);
                                        const y2 = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180);

                                        const largeArc = angle > 180 ? 1 : 0;
                                        const colors = ['#10B981', '#2563EB', '#F59E0B', '#64748B'];

                                        acc.elements.push(
                                            <path
                                                key={result.id}
                                                d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                                                fill={colors[index]}
                                                stroke="white"
                                                strokeWidth="2"
                                            />
                                        );

                                        acc.angle = endAngle;
                                        return acc;
                                    }, { angle: 0, elements: [] }).elements}
                                </svg>
                                <div className="pie-legend">
                                    {pollData.results.map((result, index) => {
                                        const colors = ['#10B981', '#2563EB', '#F59E0B', '#64748B'];
                                        return (
                                            <div key={result.id} className="legend-item">
                                                <div className="legend-color" style={{ background: colors[index] }}></div>
                                                <div className="legend-text">
                                                    <span className="legend-option">{result.option}</span>
                                                    <span className="legend-percentage">{result.percentage}%</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="table-card card">
                        <h3>Detailed Results</h3>
                        <table className="results-table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Option</th>
                                    <th>Votes</th>
                                    <th>Percentage</th>
                                    <th>Visual</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pollData.results.map((result, index) => (
                                    <tr key={result.id} className={index === 0 ? 'winner-row' : ''}>
                                        <td>
                                            <div className="rank-badge">
                                                {index === 0 ? '🏆' : `#${index + 1}`}
                                            </div>
                                        </td>
                                        <td><strong>{result.option}</strong></td>
                                        <td>{result.votes.toLocaleString()}</td>
                                        <td><strong>{result.percentage}%</strong></td>
                                        <td>
                                            <div className="mini-bar">
                                                <div
                                                    className="mini-bar-fill"
                                                    style={{ width: `${(result.votes / maxVotes) * 100}%` }}
                                                ></div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Actions */}
                <div className="results-actions">
                    <Link to="/voter/polls" className="btn btn-outline">
                        Back to Polls
                    </Link>
                    <button className="btn btn-primary">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2V12M10 12L6 8M10 12L14 8M4 14V16C4 17.1 4.9 18 6 18H14C15.1 18 16 17.1 16 16V14" />
                        </svg>
                        Download Report (PDF)
                    </button>
                </div>
            </div>

            <style jsx>{`
        .live-results-page {
          min-height: 100vh;
          padding: 2rem 0;
        }

        .results-header {
          margin-bottom: 2rem;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .header-stats {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
        }

        .stat-box {
          text-align: right;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-primary);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .poll-dates {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .winner-card {
          background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
          border: 2px solid var(--color-gold);
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .winner-icon {
          font-size: 4rem;
        }

        .winner-content h2 {
          color: var(--color-gold);
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }

        .winner-content h3 {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }

        .winner-content p {
          font-size: 1.125rem;
          color: var(--color-text-secondary);
          margin: 0;
        }

        .view-toggle {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: 2px solid var(--color-border);
          background: white;
          border-radius: var(--radius-md);
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }

        .toggle-btn:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        .toggle-btn.active {
          border-color: var(--color-primary);
          background: var(--color-primary);
          color: white;
        }

        .charts-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .chart-card h3 {
          margin-bottom: 1.5rem;
        }

        .bar-chart {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .bar-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .bar-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .option-name {
          font-weight: 600;
        }

        .vote-count {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .bar-container {
          height: 40px;
          background: var(--color-gray-100);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 1rem;
          transition: width 1s ease-out;
        }

        .percentage-label {
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .pie-chart-container {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .pie-chart {
          width: 200px;
          height: 200px;
        }

        .pie-legend {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .legend-color {
          width: 20px;
          height: 20px;
          border-radius: var(--radius-sm);
        }

        .legend-text {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .legend-option {
          font-weight: 500;
        }

        .legend-percentage {
          font-weight: 700;
          color: var(--color-primary);
        }

        .table-card {
          margin-bottom: 2rem;
        }

        .results-table {
          width: 100%;
          border-collapse: collapse;
        }

        .results-table th {
          padding: 1rem;
          text-align: left;
          background: var(--color-gray-50);
          border-bottom: 2px solid var(--color-border);
        }

        .results-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--color-border);
        }

        .winner-row {
          background: rgba(16, 185, 129, 0.05);
        }

        .rank-badge {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .mini-bar {
          height: 8px;
          background: var(--color-gray-100);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .mini-bar-fill {
          height: 100%;
          background: var(--color-primary);
          border-radius: var(--radius-full);
        }

        .results-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 1rem;
          }

          .header-stats {
            align-items: flex-start;
          }

          .charts-section {
            grid-template-columns: 1fr;
          }

          .pie-chart-container {
            flex-direction: column;
          }

          .results-actions {
            flex-direction: column;
          }
        }
      `}</style>
        </div>
    );
}
