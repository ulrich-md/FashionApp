import { motion } from 'framer-motion';
import { Grid3x3 } from 'lucide-react';

const categoryColors = {
  Tops: 'bg-blue-50',
  Bottoms: 'bg-pink-50',
  Shoes: 'bg-amber-50',
  Accessories: 'bg-purple-50',
};

const categoryIcons = {
  Tops: '👕',
  Bottoms: '👖',
  Shoes: '👠',
  Accessories: '👜',
};

export default function DigitalClosetGrid({ closet }) {
  const groupedByCategory = closet.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="w-full px-4 py-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Grid3x3 className="w-6 h-6 text-gray-700" />
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900">
          Digital Closet
        </h2>
      </div>

      <div className="space-y-12">
        {Object.entries(groupedByCategory).map(([category, items]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{categoryIcons[category]}</span>
              <h3 className="font-display text-2xl font-medium text-gray-800">
                {category}
              </h3>
              <span className="text-sm text-gray-500">({items.length})</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -4 }}
                  className={`
                    ${categoryColors[category]}
                    rounded-lg p-5 shadow-soft
                    border border-gray-100
                    cursor-pointer transition-all duration-200
                    hover:shadow-soft-lg
                  `}
                >
                  <div className="aspect-square bg-white rounded-md mb-3 flex items-center justify-center border border-gray-200">
                    <span className="text-4xl opacity-40">
                      {categoryIcons[category]}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-600 capitalize">
                    {item.color} • {item.style}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
