import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CameraView = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }
                });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Camera access denied:", err);
                setError("Camera access denied. Please allow camera permissions.");
            }
        };

        if (!result) {
            startCamera();
        }

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [result]);

    const handleScan = () => {
        setScanning(true);
        // Mock AI Delay
        setTimeout(() => {
            setScanning(false);
            setResult({
                name: "Grilled Salmon Salad",
                calories: 420,
                protein: 35,
                fat: 12,
                carbs: 8
            });
            // Stop camera to save battery
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        }, 2000);
    };

    const handleAdd = () => {
        navigate('/dashboard');
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'black', zIndex: 100 }}>
            {/* Header Overlay */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', padding: '20px', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                    onClick={() => navigate('/dashboard')}
                    style={{ background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ArrowLeft size={24} />
                </button>
                <div style={{ color: 'white', fontWeight: 'bold' }}>Scan Meal</div>
                <div style={{ width: '40px' }} />
            </div>

            {/* Camera Feed */}
            {!result && !error && (
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />

                    {/* Scanning Animation Overlay */}
                    <div style={{ position: 'absolute', top: '25%', left: '10%', right: '10%', bottom: '25%', border: '2px dashed rgba(255,255,255,0.5)', borderRadius: '20px', pointerEvents: 'none' }}>
                        {scanning && (
                            <motion.div
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: 'var(--color-primary)', boxShadow: '0 0 10px var(--color-primary)' }}
                            />
                        )}
                    </div>

                    {!scanning && (
                        <div style={{ position: 'absolute', bottom: '100px', left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
                            <button
                                onClick={handleScan}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'white',
                                    border: '4px solid rgba(255,255,255,0.3)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid black' }} />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Error State */}
            {error && (
                <div style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    {error}
                </div>
            )}

            {/* Result Overlay */}
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 500 }}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            background: '#18181b',
                            borderTopLeftRadius: '24px',
                            borderTopRightRadius: '24px',
                            padding: '24px',
                            zIndex: 20
                        }}
                    >
                        <div style={{ width: '40px', height: '4px', background: '#3f3f46', borderRadius: '2px', margin: '0 auto 20px auto' }} />

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: '#27272a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                                🐟
                            </div>
                            <div>
                                <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{result.name}</h2>
                                <p style={{ margin: 0, color: '#a1a1aa' }}>High Protein • Post-workout</p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
                            <div style={{ background: '#27272a', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{result.calories}</div>
                                <div style={{ fontSize: '0.7rem', color: '#a1a1aa' }}>kcal</div>
                            </div>
                            <div style={{ background: '#27272a', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{result.protein}g</div>
                                <div style={{ fontSize: '0.7rem', color: '#a1a1aa' }}>Prot</div>
                            </div>
                            <div style={{ background: '#27272a', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{result.carbs}g</div>
                                <div style={{ fontSize: '0.7rem', color: '#a1a1aa' }}>Carb</div>
                            </div>
                            <div style={{ background: '#27272a', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{result.fat}g</div>
                                <div style={{ fontSize: '0.7rem', color: '#a1a1aa' }}>Fat</div>
                            </div>
                        </div>

                        <button className="btn-primary" onClick={handleAdd}>
                            <CheckCircle size={20} /> Add to Log
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
export default CameraView;
