// Visual Generation Bridge: Generates descriptive text prompts for image models
export function generateOutfitPrompt(items, aesthetic, occasion) {
  const itemNames = items.map(item => item.name).join(', ');
  const colorPalette = [...new Set(items.map(item => item.color))].join(', ');
  
  const aestheticStyles = {
    parisian: 'effortless Parisian elegance, timeless French style, sophisticated simplicity, editorial fashion photography, soft natural lighting',
    y2k: 'Y2K aesthetic, bold statement pieces, nostalgic early 2000s fashion, vibrant colors, dynamic styling, magazine editorial',
    minimalist: 'minimalist aesthetic, clean lines, neutral palette, Scandinavian simplicity, architectural silhouettes, high fashion editorial',
    bohemian: 'bohemian free-spirited style, layered textures, earthy tones, artistic styling, natural flow, fashion photography',
    chic: 'sophisticated chic style, refined elegance, polished aesthetic, luxury fashion editorial, professional styling',
  };

  const occasionContext = {
    'Work': 'professional office environment, business casual setting',
    'Night Out': 'evening atmosphere, city lights, sophisticated nightlife',
    'Casual': 'relaxed everyday setting, lifestyle photography',
    'Weekend': 'leisurely weekend vibes, casual elegance',
    'Formal': 'formal event setting, elegant backdrop, sophisticated atmosphere',
    'Date Night': 'romantic evening setting, intimate lighting',
  };

  const aestheticPrompt = aestheticStyles[aesthetic] || aestheticStyles.minimalist;
  const occasionPrompt = occasionContext[occasion] || occasionContext.Casual;

  return `A fashion model showcasing an outfit featuring: ${itemNames}. Color palette: ${colorPalette}. Style: ${aestheticPrompt}. Setting: ${occasionPrompt}. High-quality fashion editorial photography, minimalist composition, soft shadows, elegant presentation, Vogue-inspired aesthetic. Paper-cutout collage style or model mockup with clean white background.`;
}

// Generate outfit concepts based on closet items and selected aesthetic
export function generateOutfitConcepts(closet, aesthetic, numConcepts = 3) {
  // Simple algorithm to create outfit combinations
  const concepts = [];
  const occasions = ['Work', 'Night Out', 'Casual', 'Weekend', 'Formal', 'Date Night'];

  for (let i = 0; i < numConcepts; i++) {
    const occasion = occasions[i % occasions.length];
    
    // Filter items by occasion compatibility
    const compatibleItems = closet.filter(item => 
      item.occasion.includes(occasion)
    );

    if (compatibleItems.length === 0) continue;

    // Select items from different categories
    const tops = compatibleItems.filter(item => item.category === 'Tops');
    const bottoms = compatibleItems.filter(item => item.category === 'Bottoms');
    const shoes = compatibleItems.filter(item => item.category === 'Shoes');
    const accessories = compatibleItems.filter(item => item.category === 'Accessories');

    const selectedItems = [];
    if (tops.length > 0) selectedItems.push(tops[Math.floor(Math.random() * tops.length)]);
    if (bottoms.length > 0) selectedItems.push(bottoms[Math.floor(Math.random() * bottoms.length)]);
    if (shoes.length > 0) selectedItems.push(shoes[Math.floor(Math.random() * shoes.length)]);
    if (accessories.length > 0) selectedItems.push(accessories[Math.floor(Math.random() * accessories.length)]);

    if (selectedItems.length < 2) continue;

    const styleNotes = {
      parisian: 'Effortless elegance meets timeless pieces. The key is in the refined simplicity—each piece complements without competing.',
      y2k: 'Bold, unapologetic style that celebrates statement pieces. Mix textures and proportions for that nostalgic early 2000s energy.',
      minimalist: 'Less is more. Clean lines and a cohesive neutral palette create a sophisticated silhouette that speaks volumes.',
      bohemian: 'Free-spirited layers and organic textures create movement and depth. Let each piece tell its own story.',
      chic: 'Sophisticated refinement through carefully curated pieces. Polished elegance that never goes out of style.',
    };

    concepts.push({
      id: i + 1,
      items: selectedItems,
      aesthetic,
      occasion,
      styleNote: styleNotes[aesthetic] || styleNotes.minimalist,
      prompt: generateOutfitPrompt(selectedItems, aesthetic, occasion),
    });
  }

  return concepts;
}
