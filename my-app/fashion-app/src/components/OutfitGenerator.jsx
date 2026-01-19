import { motion } from 'framer-motion';
import { Sparkles, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { generateOutfitConcepts } from '../utils/generatePrompt';

export default function OutfitGenerator({ closet, selectedAesthetic }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!selectedAesthetic) {
    return (
      <div className="w-full px-4 py-8 text-center">
        <p className="text-gray-500 font-display text-lg">
          Select an aesthetic to generate outfit concepts
        </p>
      </div>
    );
  }

  const concepts = generateOutfitConcepts(closet, selectedAesthetic, 3);

  const copyPrompt = (prompt, index) => {
    navigator.clipboard.writeText(prompt);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full px-4 py-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Sparkles className="w-6 h-6 text-gray-700" />
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900">
          Outfit Concepts
        </h2>
      </div>

      <div className="space-y-8 md:space-y-12">
        {concepts.map((concept, index) => (
          <motion.div
            key={concept.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-soft-lg border border-gray-100 overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Placeholder */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-12 min-h-[400px] flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-gray-400" />
                  </div>
                  <p className="font-display text-sm text-gray-500 italic">
                    AI-Generated Image Placeholder
                  </p>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto">
                    Model mockup or paper-cutout collage
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Occasion Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-900 text-white text-xs font-medium rounded-full">
                    {concept.occasion}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full capitalize">
                    {concept.aesthetic}
                  </span>
                </div>

                {/* Items Used */}
                <div>
                  <h3 className="font-display text-lg font-semibold text-gray-900 mb-3">
                    Items Used
                  </h3>
                  <ul className="space-y-2">
                    {concept.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500 capitalize">{item.category}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Style Note */}
                <div>
                  <h3 className="font-display text-lg font-semibold text-gray-900 mb-3">
                    Style Note
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-serif italic">
                    {concept.styleNote}
                  </p>
                </div>

                {/* Prompt Generator */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-display text-sm font-semibold text-gray-900">
                      Generation Prompt
                    </h4>
                    <button
                      onClick={() => copyPrompt(concept.prompt, index)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed font-mono bg-gray-50 p-3 rounded-md border border-gray-200">
                    {concept.prompt}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
