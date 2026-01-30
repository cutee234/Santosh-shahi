
import React, { useState, useEffect, useCallback } from 'react';
import { View, Mission, Badge } from './types';
import { MISSIONS, INITIAL_BADGES } from './constants';
import Dashboard from './components/Dashboard';
import SyntaxDojo from './components/SyntaxDojo';
import DailyBreach from './components/DailyBreach';
import MentorChat from './components/MentorChat';
import { audio } from './components/AudioPlayer';
import { LayoutDashboard, Zap, BookOpen, MessageSquare, Sun, Moon, Award } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.DASHBOARD);
  const [xp, setXp] = useState(45);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(5);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [darkMode, setDarkMode] = useState(true);
  const [recentBadge, setRecentBadge] = useState<Badge | null>(null);

  const addXp = useCallback((amount: number) => {
    setXp(prev => {
      const newXp = prev + amount;
      if (newXp >= 100) {
        setLevel(l => l + 1);
        audio.playLevelUp();
        // @ts-ignore - confetti is from global script
        window.confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#22d3ee', '#a855f7', '#ffffff']
        });
        return newXp - 100;
      }
      return newXp;
    });
  }, []);

  const unlockBadge = (id: string) => {
    setBadges(prev => {
      const b = prev.find(x => x.id === id);
      if (b && !b.unlocked) {
        setRecentBadge(b);
        setTimeout(() => setRecentBadge(null), 5000);
        return prev.map(x => x.id === id ? { ...x, unlocked: true } : x);
      }
      return prev;
    });
  };

  const handleNavClick = (view: View) => {
    audio.playClack();
    setActiveView(view);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#0a0e1a] text-[#e2e8f0]' : 'bg-[#f8fafc] text-[#0f172a]'}`}>
      {/* HUD Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-opacity-80 border-b border-cyan-500/20 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Zap className="text-white fill-current" size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            CYBERSPACE<span className="font-mono ml-1">DOJO</span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm font-semibold opacity-70 uppercase tracking-widest">Streak</span>
            <div className="flex items-center gap-1 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30">
              <span className={`text-xl transition-all duration-300 ${streak > 0 ? 'animate-pulse' : ''}`}>🔥</span>
              <span className="font-bold text-orange-400">{streak} Days</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => { setDarkMode(!darkMode); audio.playClack(); }}
              className={`p-2 rounded-full transition-all duration-300 ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto p-4 md:p-8 pb-24">
        {activeView === View.DASHBOARD && (
          <Dashboard 
            xp={xp} 
            level={level} 
            streak={streak} 
            onNextMission={() => handleNavClick(View.DOJO)} 
          />
        )}
        {activeView === View.DOJO && (
          <SyntaxDojo 
            mission={MISSIONS[0]} 
            onSuccess={(missionId) => {
              addXp(40);
              unlockBadge('script-kiddie');
            }} 
          />
        )}
        {activeView === View.STORY && (
          <DailyBreach 
            onActionComplete={(xpGain) => {
              addXp(xpGain);
              unlockBadge('cyber-detective');
            }} 
          />
        )}
        {activeView === View.CHAT && (
          <MentorChat />
        )}
      </main>

      {/* Floating Badge Notification */}
      {recentBadge && (
        <div className="fixed top-20 right-4 z-[100] animate-bounce-in">
          <div className="bg-slate-900 border-2 border-yellow-500 rounded-xl p-4 flex items-center gap-4 shadow-2xl shadow-yellow-500/20">
            <div className="text-4xl">{recentBadge.icon}</div>
            <div>
              <p className="text-xs text-yellow-500 font-bold uppercase tracking-widest">Badge Unlocked!</p>
              <p className="text-lg font-bold text-white">{recentBadge.name}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Dock */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl">
          {[
            { id: View.DASHBOARD, icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
            { id: View.DOJO, icon: <Zap size={20} />, label: 'Syntax Dojo' },
            { id: View.STORY, icon: <BookOpen size={20} />, label: 'Stories' },
            { id: View.CHAT, icon: <MessageSquare size={20} />, label: 'Mentor' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                activeView === item.id 
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/40' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span className={`text-sm font-semibold ${activeView === item.id ? 'block' : 'hidden md:block'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      <style>{`
        @keyframes bounce-in {
          0% { transform: translateY(-50px); opacity: 0; }
          70% { transform: translateY(10px); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
