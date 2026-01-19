import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clothes, Palette, Sparkles } from 'lucide-react';
import DigitalClosetGrid from './components/DigitalClosetGrid';
import AestheticSelector from './components/AestheticSelector';
import OutfitGenerator from './components/OutfitGenerator';
import { userCloset } from './data/mockData';
import './App.css';

function App() {
  const [selectedAesthetic, setSelectedAesthetic] = useState(null);
  const [activeView, setActiveView] = useState('closet');

  const navItems = [
    { id: 'closet', label: 'Closet', icon: Clothes },
    { id: 'aesthetic', label: 'Aesthetic', icon: Palette },
    { id: 'outfits', label: 'Outfits', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4 md:mb-0">
            Digital Wardrobe
          </h1>
          
          {/* Navigation */}
          <nav className="flex justify-center gap-2 md:gap-4 mt-4 md:mt-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${
                      activeView === item.id
                        ? 'bg-gray-900 text-white shadow-soft'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>
      </div>
      </header>

      {/* Main Content */}
      <main className="pb-16">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeView === 'closet' && <DigitalClosetGrid closet={userCloset} />}
          
          {activeView === 'aesthetic' && (
            <AestheticSelector
              selectedAesthetic={selectedAesthetic}
              onSelect={setSelectedAesthetic}
            />
          )}
          
          {activeView === 'outfits' && (
            <OutfitGenerator
              closet={userCloset}
              selectedAesthetic={selectedAesthetic}
            />
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500 font-display">
            Curate your style, one outfit at a time
        </p>
      </div>
      </footer>
    </div>
  );
}

export default App;
