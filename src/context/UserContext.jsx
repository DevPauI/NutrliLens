import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    // Persistent State (Simulated)
    const [user, setUser] = useState({
        name: 'Alex',
        email: 'alex@example.com',
        goal: 'Lose 5kg',
        weight: 71.2,
        height: 175,
        age: 25,
        level: 4,
        xp: 350,
        xpToNextLevel: 1000,
        streak: 3
    });

    const [stats, setStats] = useState({
        caloriesGoal: 2100,
        caloriesConsumed: 0,
        proteinGoal: 140,
        proteinConsumed: 0,
        waterGoal: 2.5,
        waterConsumed: 1.2,
        burned: 0
    });

    const [logs, setLogs] = useState([
        { id: 1, type: 'meal', name: 'Oatmeal & Berries', cal: 350, protein: 12, time: '08:30 AM', category: 'Breakfast', notes: '' },
        { id: 2, type: 'meal', name: 'Grilled Chicken Salad', cal: 450, protein: 45, time: '12:30 PM', category: 'Lunch', notes: '' }
    ]);

    // Derived State calculators would go here if needed, but simple state is fine for demo

    // Actions
    const addMeal = (meal) => {
        const newMeal = { ...meal, id: Date.now(), type: 'meal', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setLogs(prev => [newMeal, ...prev]); // Add to top

        // Update Stats
        setStats(prev => ({
            ...prev,
            caloriesConsumed: prev.caloriesConsumed + (Number(newMeal.cal) || 0),
            proteinConsumed: prev.proteinConsumed + (Number(newMeal.protein) || 0)
        }));

        // Gamification
        addXp(50); // Points per meal logged
    };

    const addWorkout = (workout) => {
        const newWorkout = { ...workout, id: Date.now(), type: 'workout', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setLogs(prev => [newWorkout, ...prev]);

        setStats(prev => ({
            ...prev,
            burned: prev.burned + (Number(newWorkout.cal) || 0)
        }));

        addXp(100); // Points per workout
    };

    const addXp = (amount) => {
        setUser(prev => {
            const newXp = prev.xp + amount;
            if (newXp >= prev.xpToNextLevel) {
                // Level Up Logic
                return {
                    ...prev,
                    level: prev.level + 1,
                    xp: newXp - prev.xpToNextLevel,
                    xpToNextLevel: Math.floor(prev.xpToNextLevel * 1.2)
                };
            }
            return { ...prev, xp: newXp };
        });
    };

    const updateUser = (updates) => {
        setUser(prev => ({ ...prev, ...updates }));
    };

    // Initialize with current log stats
    useEffect(() => {
        const initialCal = logs.reduce((acc, log) => acc + (log.type === 'meal' ? (log.cal || 0) : 0), 0);
        const initialProt = logs.reduce((acc, log) => acc + (log.type === 'meal' ? (log.protein || 0) : 0), 0);
        setStats(prev => ({
            ...prev,
            caloriesConsumed: initialCal,
            proteinConsumed: initialProt
        }));
    }, []); // Run once on mount

    return (
        <UserContext.Provider value={{
            user,
            stats,
            logs,
            addMeal,
            addWorkout,
            updateUser
        }}>
            {children}
        </UserContext.Provider>
    );
};
