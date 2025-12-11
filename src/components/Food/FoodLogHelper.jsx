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

            {/* Manual Entry Toggle */}
            <div
                onClick={() => setShowManual(!showManual)}
                style={{ background: '#27272a', padding: '16px', borderRadius: '16px', marginBottom: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--color-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PenTool size={20} color="white" />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1rem' }}>Enter new food</h3>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#a1a1aa' }}>Manually input calories</p>
                    </div>
                </div>
                <PlusCircle size={20} color="var(--color-primary)" style={{ transform: showManual ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s' }} />
            </div>

            {showManual && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '16px', padding: '16px', marginBottom: '24px', overflow: 'hidden' }}
                >
                    <div className="input-group">
                        <label className="input-label">Food Name</label>
                        <input value={manualFood.name} onChange={e => setManualFood({ ...manualFood, name: e.target.value })} placeholder="e.g. Avocado Toast" />
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Calories</label>
                            <input type="number" value={manualFood.cal} onChange={e => setManualFood({ ...manualFood, cal: e.target.value })} placeholder="0" />
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Protein (g)</label>
                            <input type="number" value={manualFood.protein} onChange={e => setManualFood({ ...manualFood, protein: e.target.value })} placeholder="0" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Carbs (g)</label>
                            <input type="number" value={manualFood.carbs} onChange={e => setManualFood({ ...manualFood, carbs: e.target.value })} placeholder="0" />
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Fat (g)</label>
                            <input type="number" value={manualFood.fat} onChange={e => setManualFood({ ...manualFood, fat: e.target.value })} placeholder="0" />
                        </div>
                    </div>
                    <button className="btn-primary" onClick={handleManualSubmit}>Log It</button>
                </motion.div>
            )}

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid #27272a' }}>
                {['recent', 'favorites', 'common'].map((tab) => (
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

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {foods[activeTab].map((food, index) => (
                    <motion.div
                        key={food.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="card"
                        style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}
                    >
                        <div>
                            <p style={{ margin: 0, fontWeight: '600' }}>{food.name}</p>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#71717a' }}>{food.cal} kcal • {food.protein}g Prot</p>
                        </div>
                        <button
                            onClick={() => handleAdd(food)}
                            style={{
                                background: 'rgba(16, 185, 129, 0.1)',
                                color: 'var(--color-primary)',
                                border: 'none',
                                padding: '8px',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            <PlusCircle size={20} />
                        </button>
                    </motion.div>
                ))}
            </div>

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
