import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    // Theme State
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        document.body.className = theme;
        if (theme === 'dark') {
            document.documentElement.style.setProperty('--color-bg', '#09090b');
            document.documentElement.style.setProperty('--color-surface', '#18181b');
            document.documentElement.style.setProperty('--color-text', '#ffffff');
        } else {
            document.documentElement.style.setProperty('--color-bg', '#f8fafc');
            document.documentElement.style.setProperty('--color-surface', '#ffffff');
            document.documentElement.style.setProperty('--color-text', '#0f172a');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

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
        streak: 3,
        stepsGoal: 10000
    });

    // Default Logs
    const initialLogs = [
        { id: 1, type: 'meal', name: 'Oatmeal & Berries', cal: 350, protein: 12, carbs: 60, fat: 6, time: '08:30 AM', category: 'Breakfast', notes: '', status: 'eaten' },
        { id: 2, type: 'meal', name: 'Grilled Chicken Salad', cal: 450, protein: 45, carbs: 12, fat: 20, time: '12:30 PM', category: 'Lunch', notes: '', status: 'eaten' },
        { id: 3, type: 'workout', name: 'Morning Jog', duration: 30, intensity: 'Medium', cal: 240, time: '07:00 AM' }
    ];

    const [logs, setLogs] = useState(initialLogs);

    // Initial Stats Calculation based on Logs
    const initialStats = {
        caloriesGoal: 2100,
        caloriesConsumed: 800, // 350 + 450
        proteinGoal: 140,
        proteinConsumed: 57, // 12 + 45
        carbsGoal: 250,
        carbsConsumed: 72, // 60 + 12
        fatGoal: 70,
        fatConsumed: 26, // 6 + 20
        waterGoal: 2.5,
        waterConsumed: 1.2,
        burned: 240, // From Mock Workout
        steps: 4500, // Mock steps
        lastWeighIn: null
    };

    const [stats, setStats] = useState(initialStats);

    const [weightLog, setWeightLog] = useState([
        { date: 'Mon', weight: 72.5 },
        { date: 'Tue', weight: 72.2 },
        { date: 'Wed', weight: 72.0 },
        { date: 'Thu', weight: 71.8 },
        { date: 'Fri', weight: 71.9 },
        { date: 'Sat', weight: 71.5 },
        { date: 'Sun', weight: 71.2 },
    ]);

    const [vitamins, setVitamins] = useState([
        { id: 1, name: 'Multivitamin', time: '08:00', taken: false },
        { id: 2, name: 'Vitamin D', time: '08:00', taken: false },
        { id: 3, name: 'Magnesium', time: '21:00', taken: false }
    ]);

    // Actions
    const addMeal = (meal) => {
        const newMeal = {
            ...meal,
            id: Date.now(),
            type: 'meal',
            time: meal.plannedTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            carbs: Number(meal.carbs) || 0,
            fat: Number(meal.fat) || 0,
            status: meal.status || 'eaten'
        };
        setLogs(prev => [newMeal, ...prev]);

        if (newMeal.status === 'eaten') {
            setStats(prev => ({
                ...prev,
                caloriesConsumed: prev.caloriesConsumed + (Number(newMeal.cal) || 0),
                proteinConsumed: prev.proteinConsumed + (Number(newMeal.protein) || 0),
                carbsConsumed: prev.carbsConsumed + (Number(newMeal.carbs) || 0),
                fatConsumed: prev.fatConsumed + (Number(newMeal.fat) || 0)
            }));
            addXp(50);
        }
    };

    const confirmMeal = (id) => {
        const meal = logs.find(l => l.id === id);
        if (!meal || meal.status === 'eaten') return;

        setLogs(prev => prev.map(l => l.id === id ? { ...l, status: 'eaten' } : l));

        setStats(prev => ({
            ...prev,
            caloriesConsumed: prev.caloriesConsumed + (Number(meal.cal) || 0),
            proteinConsumed: prev.proteinConsumed + (Number(meal.protein) || 0),
            carbsConsumed: prev.carbsConsumed + (Number(meal.carbs) || 0),
            fatConsumed: prev.fatConsumed + (Number(meal.fat) || 0)
        }));
        addXp(50);
    };

    const toggleVitamin = (id) => {
        setVitamins(prev => prev.map(v => v.id === id ? { ...v, taken: !v.taken } : v));
    };

    const addVitamin = (vitamin) => {
        setVitamins(prev => [...prev, { ...vitamin, id: Date.now(), taken: false }]);
    };

    const addWorkout = (workout) => {
        const newWorkout = { ...workout, id: Date.now(), type: 'workout', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setLogs(prev => [newWorkout, ...prev]);

        setStats(prev => ({
            ...prev,
            burned: prev.burned + (Number(newWorkout.cal) || 0)
        }));

        addXp(100);
    };

    const logWeight = (weight) => {
        const newWeight = parseFloat(weight);
        setUser(prev => ({ ...prev, weight: newWeight }));
        setStats(prev => ({ ...prev, lastWeighIn: new Date().toDateString() }));
        setWeightLog(prev => [...prev, { date: 'Today', weight: newWeight }]);
        addXp(100);
    };

    const addXp = (amount) => {
        setUser(prev => {
            const newXp = prev.xp + amount;
            if (newXp >= prev.xpToNextLevel) {
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

    const spendXp = (amount) => {
        if (user.xp >= amount) {
            setUser(prev => ({ ...prev, xp: prev.xp - amount }));
            return true;
        }
        return false;
    };

    const updateUser = (updates) => {
        setUser(prev => ({ ...prev, ...updates }));
    };

    return (
        <UserContext.Provider value={{
            user,
            stats,
            logs,
            weightLog,
            theme,
            toggleTheme,
            addMeal,
            confirmMeal,
            addWorkout,
            logWeight,
            updateUser,
            spendXp,
            vitamins,
            toggleVitamin,
            addVitamin
        }}>
            {children}
        </UserContext.Provider>
    );
};
