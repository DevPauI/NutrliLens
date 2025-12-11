import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check } from 'lucide-react';

const Registration = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        height: '',
        weight: '',
        age: '',
        goal: 'lose_weight'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => {
        if (step === 2) {
            // Simulate "AI Analysis"
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setStep(3);
            }, 2000);
        } else {
            setStep(step + 1);
        }
    };

    const finishRegistration = () => {
        navigate('/dashboard');
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    };

    return (
        <div className="page" style={{ paddingTop: '40px' }}>
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>NutriLens</h1>
                <p>Your personal AI nutritionist</p>
            </header>

            <div style={{ position: 'relative', overflow: 'hidden' }}>
                <AnimatePresence mode='wait'>
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2>Create Account</h2>
                            <div className="input-group">
                                <label className="input-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="hello@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <button className="btn-primary" onClick={nextStep}>
                                Continue <ChevronRight size={20} />
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && !loading && (
                        <motion.div
                            key="step2"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2>About You</h2>
                            <p style={{ marginBottom: '24px' }}>Help us tailor your plan.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className="input-group">
                                    <label className="input-label">Height (cm)</label>
                                    <input
                                        type="number"
                                        name="height"
                                        placeholder="175"
                                        value={formData.height}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Weight (kg)</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        placeholder="70"
                                        value={formData.weight}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    placeholder="25"
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Goal</label>
                                <select
                                    name="goal"
                                    value={formData.goal}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '14px',
                                        borderRadius: '12px',
                                        backgroundColor: 'var(--color-surface)',
                                        color: 'white',
                                        border: '1px solid #27272a',
                                        outline: 'none',
                                        fontSize: '1rem'
                                    }}
                                >
                                    <option value="lose_weight">Lose Weight</option>
                                    <option value="gain_muscle">Gain Muscle</option>
                                    <option value="maintain">Maintain</option>
                                </select>
                            </div>

                            <button className="btn-primary" onClick={nextStep}>
                                Analyze & Create Plan
                            </button>
                        </motion.div>
                    )}

                    {loading && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ textAlign: 'center', paddingTop: '40px' }}
                        >
                            <div className="spinner" style={{ marginBottom: '20px', fontSize: '2rem' }}>🧬</div>
                            <h3>Designing your plan...</h3>
                            <p>AI is calculating your metabolic rate</p>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring' }}
                        >
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(0,0,0,0))',
                                padding: '24px',
                                borderRadius: '24px',
                                border: '1px solid var(--color-primary)',
                                marginBottom: '24px',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    background: 'var(--color-primary)',
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px auto'
                                }}>
                                    <Check color="white" />
                                </div>
                                <h2 style={{ color: 'var(--color-primary)' }}>Plan Ready!</h2>
                                <p>Based on your profile, we've created a custom nutrition strategy.</p>
                            </div>

                            <div className="card">
                                <h3 style={{ fontSize: '1rem' }}>Daily Targets</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>2,100</span>
                                        <p style={{ fontSize: '0.8rem' }}>Calories</p>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981' }}>140g</span>
                                        <p style={{ fontSize: '0.8rem' }}>Protein</p>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3b82f6' }}>2.5L</span>
                                        <p style={{ fontSize: '0.8rem' }}>Water</p>
                                    </div>
                                </div>
                            </div>

                            <button className="btn-primary" onClick={finishRegistration}>
                                Go to Dashboard
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
export default Registration;
