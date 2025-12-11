import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity, Flame, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';

const WorkoutLog = () => {
    const navigate = useNavigate();
    const { addWorkout } = useUser();
    const [activity, setActivity] = useState('');
    const [duration, setDuration] = useState('');
    const [intensity, setIntensity] = useState('Medium');
    const [step, setStep] = useState(1); // 1=Input, 2=AI-Question, 3=Review
    const [aiQuestion, setAiQuestion] = useState('');
    const [userAnswer, setUserAnswer] = useState('');

    const proceedToAi = () => {
        if (!activity || !duration) return;
        setStep(2);
        setAiQuestion(`Nice work on the ${activity}! What specific exercises did you focus on, or was it a steady session?`);
    };

    const handleAiResponse = () => {
        // Mocking AI refinement
        setStep(3);
    };

    const handleLog = () => {
        if (!activity || !duration) return;

        // Mock calculation (maybe boost slightly based on "AI" analysis)
        const baseBurn = parseInt(duration) * (intensity === 'High' ? 12 : intensity === 'Medium' ? 8 : 5);
        const totalCal = step === 3 ? Math.floor(baseBurn * 1.1) : baseBurn; // Bonus burn from AI refinement

        addWorkout({
            name: activity,
            duration: parseInt(duration),
            intensity,
            cal: totalCal,
            details: userAnswer
        });
        navigate('/fitness'); // Go to new fitness hub
    };

    return (
        <div className="page" style={{ paddingBottom: '80px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0 }}>
                    <ArrowLeft size={24} />
                </button>
                <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Log Workout</h1>
            </div>

            {step === 1 && (
                <>
                    <div className="card" style={{ marginBottom: '24px' }}>
                        <div className="input-group">
                            <label className="input-label">Activity Type</label>
                            <input
                                type="text"
                                placeholder="e.g. Running, Yoga, Weightlifting"
                                value={activity}
                                onChange={(e) => setActivity(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Duration (minutes)</label>
                            <input
                                type="number"
                                placeholder="30"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Intensity</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {['Low', 'Medium', 'High'].map(level => (
                                    <button
                                        key={level}
                                        onClick={() => setIntensity(level)}
                                        style={{
                                            flex: 1,
                                            padding: '12px',
                                            borderRadius: '12px',
                                            border: '1px solid #27272a',
                                            background: intensity === level ? 'var(--color-primary)' : 'transparent',
                                            color: 'white',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button className="btn-primary" onClick={proceedToAi}>
                        Next
                    </button>
                </>
            )}

            {step === 2 && (
                <div className="card">
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ width: '32px', height: '32px', background: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Zap size={16} color="white" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem', lineHeight: '1.4' }}>{aiQuestion}</p>
                        </div>
                    </div>
                    <textarea
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="e.g. Squats, Deadlifts, and Lunges..."
                        style={{ width: '100%', background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '12px', color: 'white', fontFamily: 'inherit', resize: 'none', marginBottom: '16px' }}
                        rows={3}
                    />
                    <button className="btn-primary" onClick={handleAiResponse}>
                        Calculate Burn
                    </button>
                </div>
            )}

            {step === 3 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '24px', borderRadius: '24px', marginBottom: '24px', textAlign: 'center' }}>
                        <Flame size={48} color="#10b981" style={{ marginBottom: '16px' }} />
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#a1a1aa' }}>Use AI Analysis</p>
                        <h3 style={{ margin: '8px 0', fontSize: '2.5rem', color: '#10b981' }}>
                            {Math.floor(parseInt(duration) * (intensity === 'High' ? 12 : intensity === 'Medium' ? 8 : 5) * 1.1)}
                        </h3>
                        <p style={{ margin: 0, fontSize: '1rem', color: '#fff' }}>kcal burned</p>
                    </div>
                    <button className="btn-primary" onClick={handleLog}>
                        Log to History
                    </button>
                </motion.div>
            )}

        </div>
    );
};

export default WorkoutLog;
