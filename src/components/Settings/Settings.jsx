import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Globe, Moon, Sun, ChevronRight, LogOut, CreditCard, Shield, Star } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';

const Settings = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useUser();
    const [darkMode, setDarkMode] = useState(true);
    const [language, setLanguage] = useState('English');
    const [showAccount, setShowAccount] = useState(false);
    const [showPayment, setShowPayment] = useState(false);

    // Mock Account State
    const [accountForm, setAccountForm] = useState({
        username: user.name,
        email: user.email,
        password: '',
        newPassword: ''
    });

    const handleUpdateAccount = () => {
        updateUser({ name: accountForm.username, email: accountForm.email });
        setShowAccount(false);
    };

    return (
        <div className="page" style={{ paddingBottom: '80px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0 }}>
                    <ArrowLeft size={24} />
                </button>
                <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Settings</h1>
            </div>

            {/* Profile Card */}
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <div style={{ width: '64px', height: '64px', background: '#27272a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={32} color="#71717a" />
                </div>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{user.name}</h2>
                    <p style={{ margin: 0, color: '#71717a' }}>Level {user.level} • {user.goal}</p>
                </div>
            </div>

            {/* Menu Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* Account Section */}
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div
                        onClick={() => setShowAccount(!showAccount)}
                        style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Shield size={20} /> <span style={{ fontWeight: '600' }}>Account Security</span>
                        </div>
                        <ChevronRight size={16} color="#71717a" style={{ transform: showAccount ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s' }} />
                    </div>

                    <AnimatePresence>
                        {showAccount && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                style={{ padding: '0 16px 16px 16px', borderTop: '1px solid #27272a' }}
                            >
                                <div className="input-group" style={{ marginTop: '16px' }}>
                                    <label className="input-label">Username</label>
                                    <input value={accountForm.username} onChange={e => setAccountForm({ ...accountForm, username: e.target.value })} />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Email</label>
                                    <input value={accountForm.email} onChange={e => setAccountForm({ ...accountForm, email: e.target.value })} />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">New Password</label>
                                    <input type="password" placeholder="Leave empty to keep current" value={accountForm.newPassword} onChange={e => setAccountForm({ ...accountForm, newPassword: e.target.value })} />
                                </div>
                                <button className="btn-primary" onClick={handleUpdateAccount}>Save Changes</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Subscription Section */}
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div
                        onClick={() => setShowPayment(!showPayment)}
                        style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <CreditCard size={20} /> <span style={{ fontWeight: '600' }}>Plan & Payment</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.8rem', color: '#10b981' }}>Pro Active</span>
                            <ChevronRight size={16} color="#71717a" style={{ transform: showPayment ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s' }} />
                        </div>
                    </div>

                    <AnimatePresence>
                        {showPayment && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                style={{ padding: '0 16px 16px 16px', borderTop: '1px solid #27272a' }}
                            >
                                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '12px', marginTop: '16px', marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <Star fill="#10b981" color="#10b981" size={24} />
                                    <div>
                                        <p style={{ margin: 0, fontWeight: 'bold' }}>NutriLens Pro</p>
                                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#a1a1aa' }}>Next billing: Jan 12, 2026</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #ef4444', background: 'transparent', color: '#ef4444', fontWeight: '600', cursor: 'pointer' }}>
                                        Cancel Plan
                                    </button>
                                    <button style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#27272a', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
                                        Manage
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>


                {/* Preferences */}
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #27272a' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                            <span>Dark Mode</span>
                        </div>
                        <div
                            onClick={() => setDarkMode(!darkMode)}
                            style={{
                                width: '48px',
                                height: '24px',
                                background: darkMode ? 'var(--color-primary)' : '#52525b',
                                borderRadius: '12px',
                                position: 'relative',
                                cursor: 'pointer',
                                transition: 'background 0.3s'
                            }}
                        >
                            <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: darkMode ? '26px' : '2px', transition: 'left 0.3s' }} />
                        </div>
                    </div>

                    <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Globe size={20} />
                            <span>Language</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#71717a' }}>
                            {language} <ChevronRight size={16} />
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={() => navigate('/')}
                style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '16px',
                    background: '#27272a',
                    color: '#ef4444',
                    border: 'none',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    marginTop: '32px'
                }}
            >
                <LogOut size={20} /> Sign Out
            </button>
        </div>
    );
};

export default Settings;
