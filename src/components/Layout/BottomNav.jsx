import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Camera, Settings, Activity, Utensils, MessageCircle, Gift, Pill } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Hide bottom nav on auth pages and scan page
    if (['/', '/login', '/register', '/scan'].includes(location.pathname)) {
        return null;
    }

    const navItems = [
        { icon: Home, path: '/dashboard', label: 'Home' },
        { icon: Utensils, path: '/log-food', label: 'Food' },
        { icon: Activity, path: '/fitness', label: 'Fitness' },
        { icon: Camera, path: '/scan', label: 'Scan', isFab: true },
        { icon: Pill, path: '/vitamins', label: 'Vitamins' },
        { icon: MessageCircle, path: '/coach', label: 'Coach' },
        { icon: Settings, path: '/settings', label: 'Settings' }
    ];

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: '#18181b',
            borderTop: '1px solid #27272a',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 100,
            paddingBottom: '10px' // Safe area
        }}>
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;

                if (item.isFab) {
                    return (
                        <motion.div
                            key={item.label}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigate(item.path)}
                            style={{
                                width: '56px',
                                height: '56px',
                                background: 'var(--color-primary)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '24px',
                                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                                cursor: 'pointer',
                                color: '#09090b'
                            }}
                        >
                            <item.icon size={28} />
                        </motion.div>
                    );
                }

                return (
                    <div
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: 'pointer',
                            color: isActive ? 'var(--color-primary)' : '#71717a'
                        }}
                    >
                        <item.icon size={24} />
                        <span style={{ fontSize: '0.7rem', fontWeight: isActive ? 'bold' : 'normal' }}>{item.label}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default BottomNav;
