import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, TrendingUp, Activity, Calendar } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { motion } from 'framer-motion';

const FitnessHub = () => {
    const navigate = useNavigate();
    const { user, weightLog, logs } = useUser();
    const workouts = logs.filter(l => l.type === 'workout');

    return (
        <div className="page" style={{ paddingBottom: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: 'var(--color-text)', cursor: 'pointer', padding: 0 }}>
                    <ArrowLeft size={24} />
                </button>
                <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Fitness Hub</h1>
                <button
                    onClick={() => navigate('/log-workout')}
                    style={{
                        marginLeft: 'auto',
                        background: 'var(--color-primary)',
                        color: 'black',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                    }}
                >
                    + Log Workout
                </button>
            </div>

            {/* Weight Chart */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="card"
                style={{ marginBottom: '24px' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div>
                        <h3 style={{ margin: 0 }}>Weight Trend</h3>
                        <p style={{ margin: 0, color: '#a1a1aa', fontSize: '0.9rem' }}>{user.weight} kg</p>
                    </div>
                    <TrendingUp size={20} color="var(--color-primary)" />
                </div>
                <div style={{ height: '200px', marginLeft: '-20px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={weightLog}>
                            <defs>
                                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#666' }} />
                            <Tooltip
                                contentStyle={{ background: '#18181b', border: 'none', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="weight" stroke="#10b981" fillOpacity={1} fill="url(#colorWeight)" strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Workout History */}
            <h3 style={{ margin: '0 0 16px 0' }}>Recent Workouts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {workouts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#71717a', background: 'rgba(255,255,255,0.02)', borderRadius: '16px' }}>
                        <Activity size={32} style={{ marginBottom: '8px', opacity: 0.5 }} />
                        <p>No workouts logged yet.</p>
                        <button onClick={() => navigate('/log-workout')} style={{ color: 'var(--color-primary)', background: 'none', border: 'none', marginTop: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Start Tracking</button>
                    </div>
                ) : (
                    workouts.map(w => (
                        <motion.div
                            key={w.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="card"
                            style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '16px' }}
                        >
                            <div style={{ width: '48px', height: '48px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Activity size={24} color="#3b82f6" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: 0 }}>{w.name}</h4>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#71717a' }}>{w.duration} min • {w.intensity} Intensity</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ color: '#10b981', fontWeight: 'bold' }}>{w.cal}</div>
                                <div style={{ fontSize: '0.7rem', color: '#71717a' }}>kcal</div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FitnessHub;
