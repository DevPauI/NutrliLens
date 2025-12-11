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

    const handleLog = () => {
        if (!activity || !duration) return;

        // Mock calculation
        const calPerMin = intensity === 'High' ? 12 : intensity === 'Medium' ? 8 : 5;
        const totalCal = parseInt(duration) * calPerMin;

        addWorkout({
            name: activity,
            duration: parseInt(duration),
            intensity,
            cal: totalCal
        });
        navigate('/dashboard');
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

            {activity && duration && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '16px', borderRadius: '16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                    <Flame size={24} color="#10b981" />
                    <div>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#a1a1aa' }}>Estimated Burn</p>
                        <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#10b981' }}>
                            {parseInt(duration) * (intensity === 'High' ? 12 : intensity === 'Medium' ? 8 : 5)} kcal
                        </h3>
                    </div>
                </motion.div>
            )}

            <button className="btn-primary" onClick={handleLog}>
                Log Workout
            </button>
        </div>
    );
};

export default WorkoutLog;
