import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Camera, Bot, Settings as SettingsIcon, PlusCircle } from 'lucide-react';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Hide on Landing/Login/Register
    if (['/', '/login', '/register'].includes(location.pathname)) return null;

    const isActive = (path) => location.pathname === path;

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            background: '#18181b',
            borderTop: '1px solid #27272a',
            padding: '12px 24px 20px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 90
        }}>
            <button
                onClick={() => navigate('/dashboard')}
                style={{ background: 'none', border: 'none', color: isActive('/dashboard') ? 'var(--color-primary)' : '#71717a', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
            >
                <Home size={24} />
                <span style={{ fontSize: '0.7rem' }}>Home</span>
            </button>

            <button
                onClick={() => navigate('/coach')}
                style={{ background: 'none', border: 'none', color: isActive('/coach') ? 'var(--color-primary)' : '#71717a', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
            >
                <Bot size={24} />
                <span style={{ fontSize: '0.7rem' }}>Coach</span>
            </button>

            {/* Middle FAB (Add/Scan) */}
            <div style={{ position: 'relative', top: '-24px' }}>
                <button
                    onClick={() => navigate('/scan')}
                    style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'var(--color-primary)',
                        border: '4px solid #09090b',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
                    }}
                >
                    <Camera size={24} />
                </button>
            </div>

            <button
                onClick={() => navigate('/log-food')}
                style={{ background: 'none', border: 'none', color: isActive('/log-food') ? 'var(--color-primary)' : '#71717a', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
            >
                <PlusCircle size={24} />
                <span style={{ fontSize: '0.7rem' }}>Log</span>
            </button>

            <button
                onClick={() => navigate('/settings')}
                style={{ background: 'none', border: 'none', color: isActive('/settings') ? 'var(--color-primary)' : '#71717a', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
            >
                <SettingsIcon size={24} />
                <span style={{ fontSize: '0.7rem' }}>Settings</span>
            </button>
        </div>
    );
};

export default BottomNav;
