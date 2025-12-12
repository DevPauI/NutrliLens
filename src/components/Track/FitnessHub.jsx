import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar, YAxis } from 'recharts';
import { ArrowLeft, TrendingUp, Activity, Calendar, Ruler, X } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';

const FitnessHub = () => {
    const navigate = useNavigate();
    const { user, weightLog, logs, logWeight, stats, bodyMeasurements, updateBodyMeasurements, stepLog, units, getWeight, getLength, saveWeight, saveLength } = useUser();
    const [newWeight, setNewWeight] = useState('');
    const [showStepHistory, setShowStepHistory] = useState(false);
    const [showMeasurements, setShowMeasurements] = useState(false);
    const [tempMeasure, setTempMeasure] = useState({});

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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {/* Convert current weight */}
                            <p style={{ margin: 0, color: '#a1a1aa', fontSize: '0.9rem' }}>
                                {getWeight(user.weight).value} {getWeight(user.weight).unit}
                            </p>
                            {weightLog.length > 1 && (() => {
                                const diff = weightLog[weightLog.length - 1].weight - weightLog[0].weight;
                                const isGain = diff > 0;
                                const color = isGain ? '#ef4444' : '#10b981'; // Green for loss, Red for gain
                                // Convert difference (treat as mass value)
                                const displayDiff = units === 'metric' ? diff.toFixed(1) : (diff * 2.20462).toFixed(1);
                                const unit = units === 'metric' ? 'kg' : 'lbs';

                                return (
                                    <span style={{ fontSize: '0.8rem', color: color, fontWeight: 'bold' }}>
                                        {diff > 0 ? '+' : ''}{displayDiff} {unit}
                                    </span>
                                );
                            })()}
                        </div>
                        {/* Live Update Input */}
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                            <input
                                type="number"
                                placeholder={`Update (${units === 'metric' ? 'kg' : 'lbs'})`}
                                value={newWeight}
                                onChange={(e) => setNewWeight(e.target.value)}
                                style={{
                                    width: '100px',
                                    padding: '4px 8px',
                                    borderRadius: '8px',
                                    border: '1px solid #3f3f46',
                                    background: '#27272a',
                                    color: 'white',
                                    fontSize: '0.9rem'
                                }}
                            />
                            <button
                                onClick={() => {
                                    if (newWeight) {
                                        // Save converted value (Input -> Kg)
                                        logWeight(saveWeight(newWeight));
                                        setNewWeight('');
                                    }
                                }}
                                style={{
                                    background: 'var(--color-primary)',
                                    color: 'black',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '4px 12px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem'
                                }}
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                    {/* Dynamic Icon Color */}
                    {(() => {
                        const diff = weightLog.length > 1 ? weightLog[weightLog.length - 1].weight - weightLog[0].weight : 0;
                        return <TrendingUp size={20} color={diff > 0 ? '#ef4444' : '#10b981'} />;
                    })()}
                </div>
                <div style={{ height: '200px', marginLeft: '-20px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={weightLog.map(w => ({ ...w, displayWeight: units === 'metric' ? w.weight : parseFloat((w.weight * 2.20462).toFixed(1)) }))}>
                            <defs>
                                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                    {/* Dynamic Gradient */}
                                    {(() => {
                                        const diff = weightLog.length > 1 ? weightLog[weightLog.length - 1].weight - weightLog[0].weight : 0;
                                        const color = diff > 0 ? '#ef4444' : '#10b981';
                                        return (
                                            <>
                                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                                            </>
                                        );
                                    })()}
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#666' }} />
                            <Tooltip
                                contentStyle={{ background: '#18181b', border: 'none', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            {/* Dynamic Stroke */}
                            {(() => {
                                const diff = weightLog.length > 1 ? weightLog[weightLog.length - 1].weight - weightLog[0].weight : 0;
                                const color = diff > 0 ? '#ef4444' : '#10b981';
                                return <Area type="monotone" dataKey="displayWeight" stroke={color} fillOpacity={1} fill="url(#colorWeight)" strokeWidth={3} />;
                            })()}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Steps & Burn Section */}
            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '16px' }}>Steps & Burn</h3>
                {(() => {
                    // Mock steps from context or use defaults if not available in stats yet
                    const steps = stats?.steps || 0;
                    const goal = user.stepsGoal || 10000;
                    const stepsBurn = Math.floor(steps * 0.04); // Approx 0.04 cal per step

                    return (
                        <>
                            <div
                                className="card"
                                onClick={() => setShowStepHistory(true)}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', cursor: 'pointer' }}
                            >
                                <div>
                                    <h2 style={{ margin: 0, fontSize: '2rem' }}>{steps}</h2>
                                    <p style={{ margin: 0, color: '#a1a1aa', fontSize: '0.9rem' }}>steps today</p>
                                    <p style={{ marginTop: '8px', color: '#10b981', fontWeight: 'bold' }}>~{stepsBurn} kcal burned</p>
                                </div>
                                <div style={{ width: '100px', height: '100px' }}>
                                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                        <path
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#27272a"
                                            strokeWidth="4"
                                        />
                                        <path
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#3b82f6"
                                            strokeWidth="4"
                                            strokeDasharray={`${(steps / goal) * 100}, 100`}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Step History Modal/Overlay */}
                            <AnimatePresence>
                                {showStepHistory && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{
                                            position: 'fixed',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            background: 'rgba(0,0,0,0.8)',
                                            zIndex: 50,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '24px'
                                        }}
                                        onClick={() => setShowStepHistory(false)}
                                    >
                                        <motion.div
                                            initial={{ scale: 0.9 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0.9 }}
                                            style={{ background: '#18181b', padding: '24px', borderRadius: '24px', width: '100%', maxWidth: '400px' }}
                                            onClick={e => e.stopPropagation()}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                                <h3 style={{ margin: 0 }}>Step History</h3>
                                                <X onClick={() => setShowStepHistory(false)} style={{ cursor: 'pointer' }} />
                                            </div>
                                            <div style={{ height: '300px' }}>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={stepLog}>
                                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#666' }} />
                                                        <Tooltip cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} contentStyle={{ background: '#27272a', border: 'none', borderRadius: '8px' }} />
                                                        <Bar dataKey="steps" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    );
                })()}
            </div>

            {/* Body Measurements Section */}
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0 }}>Body Measurements</h3>
                    <button
                        onClick={() => {
                            // Populate temp with converted values
                            const converted = {};
                            Object.entries(bodyMeasurements).forEach(([k, v]) => {
                                converted[k] = getLength(v).value;
                            });
                            setTempMeasure(converted);
                            setShowMeasurements(true);
                        }}
                        style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: 'none', padding: '6px 12px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}
                    >
                        Update
                    </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {Object.entries(bodyMeasurements).map(([key, value]) => (
                        <div key={key} className="card" style={{ margin: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '40px', height: '40px', background: '#27272a', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Ruler size={20} color="#a1a1aa" />
                            </div>
                            <div>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#a1a1aa', textTransform: 'capitalize' }}>{key}</p>
                                <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>
                                    {getLength(value).value} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: '#71717a' }}>{getLength(value).unit}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Measurements Modal */}
                <AnimatePresence>
                    {showMeasurements && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'rgba(0,0,0,0.8)',
                                zIndex: 50,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '24px'
                            }}
                            onClick={() => setShowMeasurements(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.9 }}
                                style={{ background: '#18181b', padding: '24px', borderRadius: '24px', width: '100%', maxWidth: '400px' }}
                                onClick={e => e.stopPropagation()}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                    <h3 style={{ margin: 0 }}>Update Measurements</h3>
                                    <X onClick={() => setShowMeasurements(false)} style={{ cursor: 'pointer' }} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    {Object.keys(bodyMeasurements).map(key => (
                                        <div key={key} className="input-group">
                                            <label className="input-label" style={{ textTransform: 'capitalize' }}>{key} ({units === 'metric' ? 'cm' : 'in'})</label>
                                            <input
                                                type="number"
                                                value={tempMeasure[key] || ''}
                                                onChange={e => setTempMeasure({ ...tempMeasure, [key]: e.target.value })}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="btn-primary"
                                    onClick={() => {
                                        // Save back to metric
                                        const toSave = {};
                                        Object.entries(tempMeasure).forEach(([k, v]) => {
                                            toSave[k] = saveLength(v);
                                        });
                                        updateBodyMeasurements(toSave);
                                        setShowMeasurements(false);
                                    }}
                                    style={{ width: '100%', marginTop: '16px' }}
                                >
                                    Save Changes
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Recent Workouts (Today) */}
            <h3 style={{ margin: '0 0 16px 0' }}>Recent Workouts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {workouts.filter(w => w.date === 'Today').length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#71717a', background: 'rgba(255,255,255,0.02)', borderRadius: '16px' }}>
                        <Activity size={32} style={{ marginBottom: '8px', opacity: 0.5 }} />
                        <p>No workouts logged today.</p>
                        <button onClick={() => navigate('/log-workout')} style={{ color: 'var(--color-primary)', background: 'none', border: 'none', marginTop: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Start Tracking</button>
                    </div>
                ) : (
                    workouts.filter(w => w.date === 'Today').map(w => (
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
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h4 style={{ margin: 0 }}>{w.name}</h4>
                                    <span style={{ fontSize: '0.8rem', color: '#71717a' }}>{w.time}</span>
                                </div>
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

            {/* All Workouts Section (History) */}
            <h3 style={{ margin: '32px 0 16px 0' }}>All Workouts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {(() => {
                    const historyWorkouts = workouts.filter(w => w.date !== 'Today');

                    if (historyWorkouts.length === 0) {
                        return (
                            <div style={{ padding: '24px', textAlign: 'center', color: '#71717a', background: '#18181b', borderRadius: '16px' }}>
                                No workout history available.
                            </div>
                        );
                    }

                    // Group by date
                    const grouped = {};
                    historyWorkouts.forEach(w => {
                        if (!grouped[w.date]) grouped[w.date] = [];
                        grouped[w.date].push(w);
                    });

                    return Object.entries(grouped).map(([date, items]) => (
                        <div key={date}>
                            <h4 style={{ margin: '0 0 12px 4px', color: '#71717a', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{date}</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {items.map(w => (
                                    <div key={w.id} className="card" style={{ margin: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', opacity: 0.8 }}>
                                        <div style={{ width: '40px', height: '40px', background: '#27272a', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a1a1aa' }}>
                                            <Activity size={20} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <h4 style={{ margin: 0, fontSize: '1rem' }}>{w.name}</h4>
                                                <span style={{ fontSize: '0.8rem', color: '#71717a' }}>{w.time}</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '0.85rem', color: '#a1a1aa' }}>
                                                <span>{w.duration} min</span>
                                                <span>{w.cal} kcal</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ));
                })()}
            </div>
        </div>
    );
};

export default FitnessHub;
