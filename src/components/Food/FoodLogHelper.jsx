import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Heart, Search, PlusCircle, PenTool, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';

const FoodLogHelper = () => {
    const navigate = useNavigate();
    const { addMeal } = useUser();
    const [activeTab, setActiveTab] = useState('recent');
    const [searchTerm, setSearchTerm] = useState('');
    const [showManual, setShowManual] = useState(false);
    const [plannedTime, setPlannedTime] = useState('12:00');

    // Manual Entry State
    const [manualFood, setManualFood] = useState({ name: '', cal: '', protein: '', carbs: '', fat: '' });

    const foods = {
        recent: [
            { id: 1, name: 'Greek Yogurt', cal: 120, protein: 12 },
            { id: 2, name: 'Banana', cal: 105, protein: 1 },
            { id: 3, name: 'Chicken Breast', cal: 165, protein: 31 }
        ],
        favorites: [
            { id: 4, name: 'Oatmeal', cal: 150, protein: 5 },
            { id: 5, name: 'Protein Shake', cal: 180, protein: 25 },
            { id: 6, name: 'Almonds', cal: 160, protein: 6 },
            { id: 10, name: 'Chicken Alfredo', cal: 450, protein: 35 },
            { id: 11, name: 'Shrimp Pasta', cal: 380, protein: 28 }
        ],
        common: [
            { id: 7, name: 'Apple', cal: 95, protein: 0 },
            { id: 8, name: 'Rice (1 cup)', cal: 200, protein: 4 },
            { id: 9, name: 'Egg (Boiled)', cal: 70, protein: 6 }
        ],
        search: [
            { id: 101, name: 'McDonalds Big Mac', cal: 563, protein: 26 },
            { id: 102, name: 'Chicken & Spinach', cal: 350, protein: 45 },
            { id: 103, name: 'Salmon & Rice', cal: 500, protein: 35 },
            { id: 104, name: 'Protein Bar', cal: 220, protein: 20 },
            { id: 105, name: 'Avocado Toast', cal: 300, protein: 8 }
        ]
    };

    const handleAdd = (food) => {
        addMeal({
            name: food.name,
            cal: food.cal,
            protein: food.protein,
            category: 'Snack' // Default for quick add
        });
        navigate('/dashboard');
    };

    const handleManualSubmit = () => {
        if (!manualFood.name || !manualFood.cal) return;
        addMeal({
            name: manualFood.name,
            cal: parseInt(manualFood.cal),
            protein: parseInt(manualFood.protein) || 0,
            carbs: parseInt(manualFood.carbs) || 0,
            fat: parseInt(manualFood.fat) || 0,
            category: 'Manual'
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
                <div style={{ display: 'flex', gap: '16px' }}>
                    <h1 style={{ margin: 0, fontSize: '1.5rem', color: 'white' }}>Log Food</h1>
                    <h1
                        onClick={() => navigate('/log-workout')}
                        style={{ margin: 0, fontSize: '1.5rem', color: '#71717a', cursor: 'pointer' }}
                    >
                        Workout
                    </h1>
                </div>
            </div>


            {/* Tabs */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid #27272a' }}>
                {['recent', 'favorites', 'common', 'search'].map((tab) => (
                    <div
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '12px 4px',
                            cursor: 'pointer',
                            color: activeTab === tab ? 'var(--color-primary)' : '#71717a',
                            borderBottom: activeTab === tab ? '2px solid var(--color-primary)' : 'none',
                            textTransform: 'capitalize',
                            fontWeight: activeTab === tab ? '600' : '400'
                        }}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            {/* Mode Toggle */}
            <div style={{ display: 'flex', background: '#27272a', padding: '4px', borderRadius: '12px', marginBottom: '24px' }}>
                <button
                    onClick={() => setShowManual(false)} // Reuse state logic slightly or refactor, keeping simple for now
                    style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', background: !showManual ? '#3f3f46' : 'transparent', color: 'white', fontWeight: !showManual ? 'bold' : 'normal', cursor: 'pointer' }}
                >
                    Log Items
                </button>
                <button
                    onClick={() => setShowManual(true)}
                    style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', background: showManual ? '#3f3f46' : 'transparent', color: 'white', fontWeight: showManual ? 'bold' : 'normal', cursor: 'pointer' }}
                >
                    Schedule
                </button>
            </div>

            {showManual ? (
                <div style={{ animation: 'fadeIn 0.3s' }}>
                    <h3 style={{ margin: '0 0 16px 0' }}>Plan Your Meals</h3>

                    <div className="card" style={{ marginBottom: '24px' }}>
                        <label className="input-label">Select Time</label>
                        <input
                            type="time"
                            value={plannedTime}
                            onChange={(e) => setPlannedTime(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: '#27272a',
                                border: '1px solid #3f3f46',
                                borderRadius: '12px',
                                color: 'white',
                                fontSize: '1.2rem',
                                marginBottom: '16px'
                            }}
                        />
                        <p style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Pick a time, then tap "Plan" on any food below.</p>
                    </div>

                    {/* Search Input for Planner */}
                    {activeTab === 'search' && (
                        <div className="input-group" style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', background: '#27272a', borderRadius: '12px', padding: '0 12px' }}>
                                <Search size={20} color="#71717a" />
                                <input
                                    placeholder="Search food database..."
                                    style={{ border: 'none', background: 'transparent', padding: '12px', color: 'white', flex: 1, outline: 'none' }}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* Show Food List for Planning */}
                    {/* Re-using the list but modifying the "Plan" button behavior to use the selected time */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {(activeTab === 'search'
                            ? foods.search.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            : foods[activeTab]
                        ).map((food, index) => (
                            <motion.div
                                key={`plan-${food.id}`}
                                className="card"
                                style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}
                            >
                                <div>
                                    <p style={{ margin: 0, fontWeight: '600' }}>{food.name}</p>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#71717a' }}>{food.cal} kcal</p>
                                </div>
                                <button
                                    onClick={() => {
                                        // Convert 24h time to 12h for display if needed, or keep as is.
                                        // Simple formatting
                                        let formattedTime = plannedTime;
                                        try {
                                            const [h, m] = plannedTime.split(':');
                                            const date = new Date();
                                            date.setHours(h);
                                            date.setMinutes(m);
                                            formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                        } catch (e) { console.error(e) }

                                        addMeal({
                                            ...food,
                                            status: 'planned',
                                            plannedTime: formattedTime,
                                            category: 'Planned'
                                        });
                                        navigate('/dashboard');
                                    }}
                                    style={{
                                        background: 'var(--color-primary)',
                                        color: '#09090b',
                                        border: 'none',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Plan for {plannedTime}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    {activeTab === 'search' && (
                        <div className="input-group" style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', background: '#27272a', borderRadius: '12px', padding: '0 12px' }}>
                                <Search size={20} color="#71717a" />
                                <input
                                    placeholder="Search food database..."
                                    style={{ border: 'none', background: 'transparent', padding: '12px', color: 'white', flex: 1, outline: 'none' }}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {(activeTab === 'search'
                            ? foods.search.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            : foods[activeTab]
                        ).map((food, index) => (
                            <motion.div
                                key={food.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="card"
                                onClick={() => handleAdd(food)}
                                whileTap={{ scale: 0.98 }}
                                style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', cursor: 'pointer' }}
                            >
                                <div>
                                    <p style={{ margin: 0, fontWeight: '600' }}>{food.name}</p>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#71717a' }}>{food.cal} kcal • {food.protein}g Prot</p>
                                </div>
                                <PlusCircle size={20} color="var(--color-primary)" />
                            </motion.div>
                        ))}
                    </div>
                </>
            )}

            <button
                className="btn-primary"
                style={{ marginTop: '24px' }}
                onClick={() => navigate('/scan')}
            >
                Or scan with camera
            </button>
        </div>
    );
};

export default FoodLogHelper;
