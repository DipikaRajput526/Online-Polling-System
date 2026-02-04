import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Authentication Pages
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import OTPVerification from './pages/OTPVerification';

// Voter Pages
import VoterDashboard from './pages/Voter/VoterDashboard';
import PollList from './pages/Voter/PollList';
import VoteCasting from './pages/Voter/VoteCasting';
import VoteConfirmation from './pages/Voter/VoteConfirmation';
import VoterHistory from './pages/Voter/VoterHistory';

// Result Pages
import LiveResults from './pages/Results/LiveResults';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';

export default function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Navbar />
                <main className="main-content">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Landing />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/otp-verification" element={<OTPVerification />} />

                        {/* Voter Routes */}
                        <Route path="/voter/dashboard" element={<VoterDashboard />} />
                        <Route path="/voter/polls" element={<PollList />} />
                        <Route path="/voter/vote/:pollId" element={<VoteCasting />} />
                        <Route path="/voter/vote-confirmation" element={<VoteConfirmation />} />
                        <Route path="/voter/history" element={<VoterHistory />} />

                        {/* Result Routes */}
                        <Route path="/results/:pollId" element={<LiveResults />} />
                        <Route path="/results" element={<LiveResults />} />

                        {/* Admin Routes */}
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />

                        {/* 404 Route */}
                        <Route path="*" element={
                            <div className="not-found">
                                <div className="container text-center" style={{ padding: '4rem 0' }}>
                                    <h1 style={{ fontSize: '4rem', color: 'var(--color-primary)' }}>404</h1>
                                    <h2>Page Not Found</h2>
                                    <p className="text-secondary">The page you're looking for doesn't exist.</p>
                                    <a href="/" className="btn btn-primary" style={{ marginTop: '2rem' }}>Go Home</a>
                                </div>
                            </div>
                        } />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}
