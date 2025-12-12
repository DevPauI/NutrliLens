import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, Plus, ChevronRight, CheckCircle, Scale, Trash2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { useState } from 'react';

const Home = () => {
    const navigate = useNavigate();
    const { user, stats, logs, logWeight, confirmMeal, deleteLog, updateLogTime } = useUser();
    const [showWeighIn, setShowWeighIn] = useState(!stats.lastWeighIn || stats.lastWeighIn !== new Date().toDateString());
    const [weightInput, setWeightInput] = useState('');
    const [editingId, setEditingId] = useState(null);

    // Macro Data for Ring Chart (Converted to Calories for Scale)
    const macroData = [
        { name: 'Protein', value: stats.proteinConsumed * 4, color: '#3b82f6' }, // 4 cal/g
        { name: 'Carbs', value: stats.carbsConsumed * 4, color: '#10b981' },   // 4 cal/g
        { name: 'Fat', value: stats.fatConsumed * 9, color: '#f59e0b' },      // 9 cal/g
        { name: 'Remaining', value: Math.max(0, stats.caloriesGoal - stats.caloriesConsumed), color: '#27272a' }
    ];

    // Mock Calorie Trend (Last 7 Days)
    const trendData = [
        { day: 'M', cal: 2050 }, { day: 'T', cal: 2100 }, { day: 'W', cal: 1950 },
        { day: 'T', cal: 2200 }, { day: 'F', cal: 2000 }, { day: 'S', cal: 2300 },
        { day: 'S', cal: stats.caloriesConsumed || 500 } // Current growing bar
    ];

    const handleWeighIn = () => {
        if (weightInput) {
            logWeight(weightInput);
            setShowWeighIn(false);
        }
    };

    return (
        <div className="page" style={{ paddingBottom: '100px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Hello, {user.name}</h1>
                    <p
                        onClick={() => navigate('/rewards')}
                        style={{ color: '#a1a1aa', margin: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        Level {user.level} • <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>{user.xp} XP</span> (Redeem)
                    </p>
                </div>
                <div onClick={() => navigate('/settings')} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', cursor: 'pointer' }}>
                    {user.name[0]}
                </div>
            </div>

            {/* Weigh-In Card */}
            {showWeighIn && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="card"
                    style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'white' }}>
                        <Scale size={24} />
                        <h3 style={{ margin: 0 }}>Daily Weigh-In</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <input
                            type="number"
                            placeholder="kg"
                            value={weightInput}
                            onChange={(e) => setWeightInput(e.target.value)}
                            style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', outline: 'none' }}
                        />
                        <button
                            onClick={handleWeighIn}
                            style={{ background: 'white', color: '#059669', border: 'none', padding: '0 24px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            Log
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Main Stats Card (Macros & Calories) */}
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                {/* Left: Text Stats */}
                <div style={{ flex: 1 }}>
                    <p style={{ color: '#a1a1aa', margin: 0, fontSize: '0.9rem' }}>Calories Left</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <h2 style={{ fontSize: '2.5rem', margin: '4px 0', fontWeight: '800' }}>
                            {stats.caloriesGoal - stats.caloriesConsumed}
                        </h2>
                        <span style={{ color: '#71717a', fontSize: '0.9rem' }}>/ {stats.caloriesGoal}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: '#a1a1aa' }}>
                        <div><span style={{ color: '#3b82f6', fontWeight: 'bold' }}>{stats.proteinConsumed}</span>/<span style={{ color: '#3b82f6', fontWeight: 'bold' }}>{stats.proteinGoal}g</span> Protein</div>
                        <div><span style={{ color: '#10b981', fontWeight: 'bold' }}>{stats.carbsConsumed}</span>/<span style={{ color: '#10b981', fontWeight: 'bold' }}>{stats.carbsGoal}g</span> Carb</div>
                        <div><span style={{ color: '#f59e0b', fontWeight: 'bold' }}>{stats.fatConsumed}</span>/<span style={{ color: '#f59e0b', fontWeight: 'bold' }}>{stats.fatGoal}g</span> Fat</div>
                    </div>
                </div>

                {/* Right: Macro Ring Chart */}
                <div style={{ width: '120px', height: '120px', position: 'relative' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={macroData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={55}
                                dataKey="value"
                                stroke="none"
                            >
                                {macroData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        {Math.round((stats.caloriesConsumed / stats.caloriesGoal) * 100)}%
                    </div>
                </div>
            </div>

            {/* Calorie Trend Chart */}
            <div className="card">
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1rem' }}>Calorie Trend</h3>
                <div style={{ height: '150px', marginLeft: '-20px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={trendData}>
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#71717a' }} />
                            <Tooltip
                                cursor={{ fill: '#27272a' }}
                                contentStyle={{ background: '#18181b', border: 'none', borderRadius: '8px' }}
                            />
                            <Bar dataKey="cal" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Meal Sections */}
            {[
                { title: 'Planned Meals', data: logs.filter(l => l.type === 'meal' && l.status === 'planned'), isPlanned: true },
                { title: 'Today\'s Meals', data: logs.filter(l => l.type === 'meal' && l.status !== 'planned'), isPlanned: false }
            ].map(section => {
                // Sort data by time
                const sortedData = [...section.data].sort((a, b) => {
                    const timeA = new Date('1970/01/01 ' + a.time).getTime();
                    const timeB = new Date('1970/01/01 ' + b.time).getTime();
                    return timeA - timeB;
                });

                return (
                    <div key={section.title}>
                        {sortedData.length > 0 && <h3 style={{ margin: '24px 0 16px 0' }}>{section.title}</h3>}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {sortedData.map((meal) => (
                                <motion.div
                                    key={meal.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="card"
                                    style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderLeft: section.isPlanned ? '4px solid #f59e0b' : 'none' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        {/* Checkbox / Info */}
                                        {!section.isPlanned ? (
                                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'var(--color-primary)' }} />
                                            </div>
                                        ) : (
                                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px dashed #71717a', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                        )}

                                        <div>
                                            <h4 style={{ margin: 0 }}>{meal.name}</h4>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#71717a' }}>{meal.cal} kcal • {meal.protein}g Prot</p>
                                        </div>
                                    </div>

                                    {section.isPlanned ? (
                                        <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            {editingId === meal.id ? (
                                                <input
                                                    type="time"
                                                    value={meal.time}
                                                    onChange={(e) => updateLogTime(meal.id, e.target.value)}
                                                    onBlur={() => setEditingId(null)}
                                                    autoFocus
                                                    style={{
                                                        background: 'transparent',
                                                        color: '#a1a1aa',
                                                        border: '1px solid #3f3f46',
                                                        borderRadius: '6px',
                                                        padding: '2px 6px',
                                                        fontSize: '0.8rem',
                                                        cursor: 'pointer',
                                                        width: '80px'
                                                    }}
                                                />
                                            ) : (
                                                <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>{meal.time}</span>
                                            )}

                                            <button
                                                onClick={() => confirmMeal(meal.id)}
                                                style={{ background: 'var(--color-primary)', color: 'white', border: 'none', padding: '6px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
                                            >
                                                Add
                                            </button>
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                <button
                                                    onClick={() => setEditingId(editingId === meal.id ? null : meal.id)}
                                                    style={{ background: 'transparent', border: 'none', color: '#a1a1aa', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                                >
                                                    <Clock size={18} />
                                                </button>
                                                <button
                                                    onClick={() => deleteLog(meal.id)}
                                                    style={{ background: 'transparent', border: 'none', color: '#ef4444', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#71717a' }}>
                                                {meal.time}
                                            </span>
                                            <button
                                                onClick={() => deleteLog(meal.id)}
                                                style={{ background: 'transparent', border: 'none', color: '#ef4444', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', opacity: 0.7 }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );
            })}

            {/* FAB Removed per user request */}
        </div>
    );
};

export default Home;
