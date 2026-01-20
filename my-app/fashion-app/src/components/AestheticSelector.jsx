import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { aesthetics } from '../data/mockData';

export default function AestheticSelector({ selectedAesthetic, onSelect }) {
  return (
    <div className="w-full px-4 py-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Palette className="w-6 h-6 text-gray-700" />
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900">
          Select Aesthetic
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {aesthetics.map((aesthetic) => (
          <motion.button
            key={aesthetic.id}
            onClick={() => onSelect(aesthetic.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              rounded-lg p-6 shadow-soft border-2 transition-all duration-200
              text-left
              ${selectedAesthetic === aesthetic.id
                ? 'border-gray-900 bg-gray-50 shadow-soft-lg'
                : 'border-gray-200 bg-white hover:border-gray-300'
              }
            `}
          >
            <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
              {aesthetic.name}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {aesthetic.description}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
