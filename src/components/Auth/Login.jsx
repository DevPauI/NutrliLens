import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Mock login
        navigate('/dashboard');
    };

    return (
        <div className="page">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
            >
                <div style={{ marginBottom: '32px' }}>
                    <button
                        onClick={() => navigate('/')}
                        style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', padding: 0 }}
                    >
                        <ArrowLeft size={24} />
                    </button>
                </div>

                <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Welcome Back</h1>
                <p style={{ color: '#a1a1aa', marginBottom: '32px' }}>Please sign in to your account</p>

                <div className="input-group">
                    <label className="input-label">Email</label>
                    <div style={{ position: 'relative' }}>
                        <Mail size={20} color="#71717a" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                        <input
                            type="email"
                            placeholder="hello@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ paddingLeft: '44px' }}
                        />
                    </div>
                </div>

                <div className="input-group" style={{ marginBottom: '32px' }}>
                    <label className="input-label">Password</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={20} color="#71717a" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ paddingLeft: '44px' }}
                        />
                    </div>
                    <div style={{ textAlign: 'right', marginTop: '8px' }}>
                        <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', cursor: 'pointer' }}>
                            Forgot Password?
                        </span>
                    </div>
                </div>

                <button className="btn-primary" onClick={handleLogin}>
                    Sign In
                </button>

                <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: '#71717a' }}>
                    Don't have an account? <span onClick={() => navigate('/register')} style={{ color: 'var(--color-primary)', cursor: 'pointer' }}>Sign up</span>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
