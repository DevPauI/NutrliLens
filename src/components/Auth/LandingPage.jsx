import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Brain, Camera } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="page" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '60px',
            background: 'radial-gradient(circle at top right, rgba(16, 185, 129, 0.1), transparent 40%)'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '24px',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        padding: '10px',
                        borderRadius: '12px'
                    }}>
                        <Activity color="white" size={32} />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', margin: 0, letterSpacing: '-1px' }}>NutriLens</h1>
                </div>

                <h2 style={{
                    fontSize: '2.5rem',
                    textAlign: 'center',
                    marginBottom: '16px',
                    background: 'linear-gradient(to right, #fff, #94a3b8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Health <br /> Reimagined
                </h2>

                <p style={{ textAlign: 'center', color: '#a1a1aa', fontSize: '1.1rem', marginBottom: '48px', maxWidth: '320px', margin: '0 auto 48px auto' }}>
                    The AI-powered nutrition assistant that sees what you eat and helps you thrive.
                </p>

                <div style={{ display: 'grid', gap: '16px', marginBottom: '48px' }}>
                    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(24, 24, 27, 0.5)' }}>
                        <Camera color="#10b981" />
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1rem' }}>Instant Analysis</h3>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#71717a' }}>Scan food with your camera</p>
                        </div>
                    </div>
                    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(24, 24, 27, 0.5)' }}>
                        <Brain color="#10b981" />
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1rem' }}>Smart Coach</h3>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#71717a' }}>Get personalized advice 24/7</p>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <button className="btn-primary" onClick={() => navigate('/register')}>
                        Get Started <ArrowRight size={20} />
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        style={{
                            background: 'transparent',
                            border: '1px solid #27272a',
                            color: 'white',
                            padding: '16px',
                            borderRadius: '50px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Log In
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default LandingPage;
