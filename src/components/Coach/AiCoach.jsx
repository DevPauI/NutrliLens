import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, ArrowLeft, Bot, User } from 'lucide-react';

const AiCoach = () => {
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi Alex! I'm your nutrition coach. Ask me anything about your diet or workout plan.", sender: 'ai' }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, newMsg]);
        setInput('');
        setIsTyping(true);

        // Mock AI Response
        setTimeout(() => {
            const responses = [
                "That's a great question! For a post-workout meal, try Greek yogurt with berries or a protein shake.",
                "To reduce sugar intake, try swapping soda for sparkling water with lemon.",
                "Consistency is key! Try to hit your calorie goal for 3 days in a row.",
                "Based on your goal to lose weight, I recommend increasing your protein intake to stay full longer."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            setMessages(prev => [...prev, { id: Date.now() + 1, text: randomResponse, sender: 'ai' }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="page" style={{ paddingBottom: '80px', display: 'flex', flexDirection: 'column', height: '100vh', padding: 0 }}>
            {/* Header */}
            <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--color-surface)', borderBottom: '1px solid #27272a' }}>
                <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0 }}>
                    <ArrowLeft size={24} />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: 'var(--color-primary)', padding: '8px', borderRadius: '50%' }}>
                        <Bot size={24} color="white" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1rem' }}>Coach AI</h2>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#10b981' }}>Online</p>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                            maxWidth: '80%',
                            background: msg.sender === 'user' ? 'var(--color-primary)' : '#27272a',
                            padding: '12px 16px',
                            borderRadius: '16px',
                            borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                            borderTopLeftRadius: msg.sender === 'ai' ? '4px' : '16px',
                            color: 'white',
                            lineHeight: '1.4'
                        }}
                    >
                        {msg.text}
                    </motion.div>
                ))}
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ alignSelf: 'flex-start', background: '#27272a', padding: '12px', borderRadius: '16px', borderTopLeftRadius: '4px' }}
                    >
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <div style={{ width: '8px', height: '8px', background: '#71717a', borderRadius: '50%' }} />
                            <div style={{ width: '8px', height: '8px', background: '#71717a', borderRadius: '50%' }} />
                            <div style={{ width: '8px', height: '8px', background: '#71717a', borderRadius: '50%' }} />
                        </div>
                    </motion.div>
                )}
                <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <div style={{ padding: '16px', background: 'var(--color-surface)', borderTop: '1px solid #27272a' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask for advice..."
                        style={{ margin: 0 }}
                    />
                    <button
                        onClick={handleSend}
                        style={{
                            background: 'var(--color-primary)',
                            border: 'none',
                            borderRadius: '12px',
                            width: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <Send size={20} color="white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AiCoach;
