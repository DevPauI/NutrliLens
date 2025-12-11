import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Camera, Flame, Zap, Trophy, TrendingUp, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';

const Home = () => {
    const navigate = useNavigate();
    const { user, stats, logs } = useUser();

    // Sort logs by time/id
    const dayLogs = logs.filter(log => log.type === 'meal');

    // Generate random chart data based on current weight
    const weightData = Array.from({ length: 7 }, (_, i) => ({
        day: ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i],
        weight: (user.weight + (Math.random() * 0.5 - 0.25)).toFixed(1)
    }));

    return (
        <div className="page" style={{ paddingBottom: '80px' }}>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}
            >
                <div>
                    <p style={{ color: 'var(--color-text-dim)', fontSize: '0.9rem' }}>Good Morning,</p>
                    <h1 style={{ margin: 0 }}>{user.name}</h1>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ background: '#27272a', padding: '8px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Trophy size={16} color="#fbbf24" fill="#fbbf24" />
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Lvl {user.level}</span>
                    </div>
                </div>
            </motion.header>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="card"
                    style={{ margin: 0, background: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)', border: '1px solid #27272a' }}
                >
                    <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>
                        Calories Left
                    </p>
                    <h2 style={{ fontSize: '1.8rem', margin: '8px 0 0 0' }}>{Math.max(0, stats.caloriesGoal - stats.caloriesConsumed)}</h2>
                    <div style={{ width: '100%', background: '#333', height: '4px', borderRadius: '2px', marginTop: '12px' }}>
                        <div style={{ width: `${Math.min(100, (stats.caloriesConsumed / stats.caloriesGoal) * 100)}%`, background: 'var(--color-primary)', height: '100%', borderRadius: '2px' }} />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="card"
                    style={{ margin: 0, border: '1px solid #27272a' }}
                >
                    <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>
                        Weight (kg)
                    </p>
                    <h2 style={{ fontSize: '1.8rem', margin: '8px 0 0 0' }}>{user.weight}</h2>
                    <p style={{ color: '#10b981', fontSize: '0.8rem', marginTop: '4px' }}>↓ 1.3kg this week</p>
                </motion.div>
            </div>

            {/* Chart */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="card"
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h3>Progress</h3>
                    <TrendingUp size={20} color="var(--color-primary)" />
                </div>
                <div style={{ height: '150px', marginLeft: '-20px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={weightData}>
                            <defs>
                                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#666' }} />
                            <Tooltip
                                contentStyle={{ background: '#18181b', border: 'none', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="weight" stroke="#10b981" fillOpacity={1} fill="url(#colorWeight)" strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Today's Meals */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', marginBottom: '16px' }}>
                <h3 style={{ margin: 0 }}>Today's Plan</h3>
                <span style={{ color: '#71717a', fontSize: '0.9rem' }}>{stats.caloriesConsumed} / {stats.caloriesGoal} kcal</span>
            </div>

            <div className="card" style={{ padding: '16px' }}>
                {dayLogs.length === 0 ? (
                    <p style={{ textAlign: 'center', console: '#71717a' }}>No meals logged yet today.</p>
                ) : (
                    dayLogs.map((log) => (
                        <div key={log.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ width: '40px', height: '40px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Flame size={20} color="#10b981" />
                            </div>
                            <div>
                                <p style={{ margin: 0, fontWeight: '600' }}>{log.category || 'Meal'}</p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>{log.name} • {log.cal} kcal</p>
                            </div>
                            <div style={{ marginLeft: 'auto' }}>
                                <span style={{ fontSize: '0.8rem', color: '#71717a' }}>{log.time}</span>
                            </div>
                        </div>
                    ))
                )}

                <div
                    onClick={() => navigate('/log-food')}
                    style={{
                        borderTop: '1px dashed #27272a',
                        paddingTop: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        color: 'var(--color-primary)',
                        cursor: 'pointer'
                    }}
                >
                    <Plus size={16} /> Add Meal
                </div>
            </div>
        </div>
    );
};
export default Home;
