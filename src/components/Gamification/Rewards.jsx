import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gift, Award, Lock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { useState } from 'react';

const Rewards = () => {
    const navigate = useNavigate();
    const { user, spendXp } = useUser();
    const [message, setMessage] = useState('');

    const rewards = [
        { id: 1, name: 'Cheat Meal Ticket', cost: 500, icon: '🍔', desc: 'Log a guilt-free cheat meal.' },
        { id: 2, name: 'Pro Theme Pack', cost: 1000, icon: '🎨', desc: 'Unlock vibrant color themes.' },
        { id: 3, name: 'Personal Coach Session', cost: 2500, icon: '👨‍🏫', desc: '30-min chat with a nutritionist.' },
        { id: 4, name: 'Mystery Box', cost: 100, icon: '🎁', desc: 'Random XP or badge reward.' }
    ];

    const handleBuy = (reward) => {
        if (spendXp(reward.cost)) {
            setMessage(`Successfully redeemed: ${reward.name}!`);
            setTimeout(() => setMessage(''), 3000);
        } else {
            setMessage('Not enough XP!');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div className="page" style={{ paddingBottom: '100px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: 'var(--color-text)', cursor: 'pointer', padding: 0 }}>
                    <ArrowLeft size={24} />
                </button>
                <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Rewards Shop</h1>
            </div>

            {/* XP Card */}
            <div className="card" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', border: 'none', color: 'black', textAlign: 'center', marginBottom: '32px' }}>
                <Award size={48} style={{ marginBottom: '8px', opacity: 0.8 }} />
                <h2 style={{ fontSize: '3rem', margin: '0', fontWeight: '800' }}>{user.xp}</h2>
                <p style={{ margin: 0, fontWeight: 'bold', opacity: 0.8 }}>Available XP Points</p>
            </div>

            {/* Message Toast */}
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ background: message.includes('Not') ? '#ef4444' : '#10b981', color: 'white', padding: '12px', borderRadius: '12px', marginBottom: '24px', textAlign: 'center', fontWeight: 'bold' }}
                >
                    {message}
                </motion.div>
            )}

            {/* Shop Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {rewards.map((item) => (
                    <motion.div
                        key={item.id}
                        whileTap={{ scale: 0.98 }}
                        className="card"
                        style={{ margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: user.xp >= item.cost ? 1 : 0.6 }}
                    >
                        <div>
                            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{item.icon}</div>
                            <h4 style={{ margin: '0 0 8px 0' }}>{item.name}</h4>
                            <p style={{ fontSize: '0.8rem', color: '#a1a1aa', margin: 0, lineHeight: '1.4' }}>{item.desc}</p>
                        </div>
                        <button
                            onClick={() => handleBuy(item)}
                            disabled={user.xp < item.cost}
                            style={{
                                marginTop: '16px',
                                background: user.xp >= item.cost ? 'var(--color-primary)' : '#52525b',
                                color: user.xp >= item.cost ? 'black' : '#a1a1aa', // Better contrast for disabled
                                border: 'none',
                                padding: '8px',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                cursor: user.xp >= item.cost ? 'pointer' : 'not-allowed'
                            }}
                        >
                            {item.cost} XP
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Rewards;
