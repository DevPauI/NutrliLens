import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Heart, Search, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FoodLogHelper = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('recent');
    const [searchTerm, setSearchTerm] = useState('');

    const foods = {
        recent: [
            { id: 1, name: 'Greek Yogurt', cal: 120 },
            { id: 2, name: 'Banana', cal: 105 },
            { id: 3, name: 'Chicken Breast', cal: 165 }
        ],
        favorites: [
            { id: 4, name: 'Oatmeal', cal: 150 },
            { id: 5, name: 'Protein Shake', cal: 180 },
            { id: 6, name: 'Almonds', cal: 160 }
        ],
        common: [
            { id: 7, name: 'Apple', cal: 95 },
            { id: 8, name: 'Rice (1 cup)', cal: 200 },
            { id: 9, name: 'Egg (Boiled)', cal: 70 }
        ]
    };

    const handleAdd = () => {
        // Mock add
        navigate('/dashboard');
    };

    return (
        <div className="page" style={{ paddingBottom: '80px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0 }}>
                    <ArrowLeft size={24} />
                </button>
                <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Log Food</h1>
            </div>

            {/* Search */}
            <div className="input-group" style={{ marginBottom: '24px' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={20} color="#71717a" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                    <input
                        type="text"
                        placeholder="Search for food..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ paddingLeft: '44px' }}
                    />
                </div>
            </div>

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
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#71717a' }}>{food.cal} kcal</p>
                        </div>
                        <button
                            onClick={handleAdd}
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
                Or Scan with Camera
            </button>
        </div>
    );
};

export default FoodLogHelper;
