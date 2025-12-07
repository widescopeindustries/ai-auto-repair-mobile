import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Search, Zap, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HolographicDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState({ year: '', make: '', model: '' });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (vehicle.year && vehicle.make && vehicle.model) {
            navigate(`/repair/${vehicle.year}/${vehicle.make}/${vehicle.model}/general`);
        }
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto p-8 rounded-2xl glass-panel border-neon-cyan/20 overflow-hidden">
            {/* HUD Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-neon-cyan/50 rounded-tl-2xl opacity-50" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-neon-cyan/50 rounded-br-2xl opacity-50" />

            {/* Scanner Effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent h-20 w-full"
                animate={{ top: ['-10%', '110%'] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            />

            <div className="relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 p-4 rounded-full border border-neon-cyan/30 bg-black/40 shadow-glow-cyan"
                >
                    <Car className="w-12 h-12 text-neon-cyan" />
                </motion.div>

                <h2 className="text-3xl font-mono text-white mb-2 text-glow">SYSTEM READY</h2>
                <p className="text-neon-cyan/70 mb-8 font-mono tracking-widest text-sm">INITIALIZE VEHICLE PARAMETERS</p>

                <form onSubmit={handleSearch} className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
                    {['Year', 'Make', 'Model'].map((field) => (
                        <div key={field} className="relative group">
                            <input
                                type="text"
                                placeholder={`ENTER ${field.toUpperCase()}`}
                                className="w-full bg-black/50 border border-neon-cyan/30 rounded-lg px-4 py-3 text-neon-cyan placeholder-neon-cyan/30 focus:outline-none focus:border-neon-cyan focus:shadow-glow-cyan transition-all font-mono text-sm uppercase"
                                value={vehicle[field.toLowerCase() as keyof typeof vehicle]}
                                onChange={(e) => setVehicle({ ...vehicle, [field.toLowerCase()]: e.target.value })}
                            />
                            <div className="absolute inset-0 border border-neon-cyan/0 group-hover:border-neon-cyan/20 rounded-lg pointer-events-none transition-all" />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="bg-neon-cyan/10 hover:bg-neon-cyan/20 border border-neon-cyan text-neon-cyan px-6 py-3 rounded-lg font-bold font-mono tracking-wider flex items-center justify-center gap-2 hover:shadow-glow-cyan transition-all uppercase"
                    >
                        <Search className="w-4 h-4" />
                        <span>Engage</span>
                    </button>
                </form>

                <div className="mt-12 grid grid-cols-2 gap-8 w-full max-w-lg">
                    <div className="text-center p-4 border border-white/5 rounded-lg bg-white/5 backdrop-blur-sm">
                        <div className="text-2xl font-bold text-neon-cyan mb-1">98.4%</div>
                        <div className="text-xs text-gray-400 font-mono">DIAGNOSTIC ACCURACY</div>
                    </div>
                    <div className="text-center p-4 border border-white/5 rounded-lg bg-white/5 backdrop-blur-sm">
                        <div className="text-2xl font-bold text-neon-amber mb-1">0.05s</div>
                        <div className="text-xs text-gray-400 font-mono">LATENCY</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HolographicDashboard;
