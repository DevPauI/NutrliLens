import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle, Plus, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';

const Vitamins = () => {
    const navigate = useNavigate();
    const { vitamins, toggleVitamin, addVitamin } = useUser();
    const [showAdd, setShowAdd] = useState(false);
    const [newVit, setNewVit] = useState({ name: '', time: '' });

    const handleAdd = () => {
        if (!newVit.name || !newVit.time) return;
        addVitamin(newVit);
        setNewVit({ name: '', time: '' });
        setShowAdd(false);
    };

    return (
        <div className="page" style={{ paddingBottom: '100px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: 'var(--color-text)', cursor: 'pointer', padding: 0 }}>
                    <ArrowLeft size={24} />
                </button>
                <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Vitamins & Meds</h1>
                <button
                    onClick={() => setShowAdd(true)}
                    style={{ marginLeft: 'auto', background: 'var(--color-primary)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'black' }}
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* Add Modal / Section */}
            {showAdd && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="card"
                    style={{ border: '1px solid var(--color-primary)' }}
                >
                    <h3 style={{ marginTop: 0 }}>Add Reminder</h3>
                    <div className="input-group">
                        <label className="input-label">Name</label>
                        <input value={newVit.name} onChange={e => setNewVit({ ...newVit, name: e.target.value })} placeholder="e.g. Omega-3" />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Time</label>
                        <input type="time" value={newVit.time} onChange={e => setNewVit({ ...newVit, time: e.target.value })} />
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn-primary" onClick={handleAdd}>Save</button>
                        <button className="btn-primary" onClick={() => setShowAdd(false)} style={{ background: '#3f3f46' }}>Cancel</button>
                    </div>
                </motion.div>
            )}

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {vitamins.map((vit) => (
                    <motion.div
                        key={vit.id}
                        layout
                        className="card"
                        style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', opacity: vit.taken ? 0.6 : 1 }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div
                                onClick={() => toggleVitamin(vit.id)}
                                style={{ cursor: 'pointer', color: vit.taken ? '#10b981' : '#52525b' }}
                            >
                                {vit.taken ? <CheckCircle size={28} weight="fill" /> : <Circle size={28} />}
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', textDecoration: vit.taken ? 'line-through' : 'none' }}>{vit.name}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#a1a1aa', fontSize: '0.9rem', marginTop: '4px' }}>
                                    <Bell size={14} />
                                    <span>{vit.time}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {vitamins.length === 0 && (
                <div style={{ textAlign: 'center', marginTop: '40px', color: '#71717a' }}>
                    <p>No supplements tracked yet.</p>
                    <p>Tap + to add your daily vitamins.</p>
                </div>
            )}
        </div>
    );
};

export default Vitamins;
