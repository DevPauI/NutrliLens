import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Globe, Moon, Sun, ChevronRight, LogOut } from 'lucide-react';

const Settings = () => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(true);
    const [language, setLanguage] = useState('English');

    return (
        <div className="page" style={{ paddingBottom: '80px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0 }}>
                    <ArrowLeft size={24} />
                </button>
                <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Settings</h1>
            </div>

            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <div style={{ width: '64px', height: '64px', background: '#27272a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={32} color="#71717a" />
                </div>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Alex</h2>
                    <p style={{ margin: 0, color: '#71717a' }}>Goal: Lose 5kg</p>
                </div>
            </div>

            <h3 style={{ fontSize: '0.9rem', color: '#71717a', marginBottom: '16px', textTransform: 'uppercase' }}>Preferences</h3>

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
                        <div style={{
                            width: '20px',
                            height: '20px',
                            background: 'white',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '2px',
                            left: darkMode ? '26px' : '2px',
                            transition: 'left 0.3s'
                        }} />
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

            <button
                onClick={() => navigate('/')}
                style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '16px',
                    background: '#ef4444',
                    color: 'white',
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
