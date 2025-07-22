import { type MineralName } from "./Mineral";

export const mineralData: Record<MineralName, any> = {
    Calcium: {
      name: 'Calcium',
      symbol: 'Ca',
      category: 'mineral',
      synergistic: ['Vitamin D', 'Magnesium', 'Phosphorus'],
      antagonistic: ['Iron', 'Zinc', 'Phosphorus (excess)', 'Sodium (excess)'],
      description: 'Essential for strong bones and teeth, muscle function, and nerve transmission. Its absorption is highly influenced by other nutrients.'
    },
    Magnesium: {
      name: 'Magnesium',
      symbol: 'Mg',
      category: 'mineral',
      synergistic: ['Calcium', 'Potassium', 'Vitamin B6', 'Vitamin D'],
      antagonistic: ['Calcium (excess)', 'Phosphorus (excess)'],
      description: 'Involved in over 300 biochemical reactions, including muscle and nerve function, blood glucose control, and blood pressure regulation.'
    },
    Zinc: {
      name: 'Zinc',
      symbol: 'Zn',
      category: 'mineral',
      synergistic: ['Vitamin A'],
      antagonistic: ['Copper (excess)', 'Iron', 'Calcium (with phytates)'],
      description: 'Crucial for immune function, wound healing, DNA synthesis, and taste perception.'
    },
    Copper: {
      name: 'Copper',
      symbol: 'Cu',
      category: 'mineral',
      synergistic: ['Iron', 'Vitamin C'],
      antagonistic: ['Zinc (excess)', 'Molybdenum', 'Sulfur', 'Vitamin C (excess)'],
      description: 'Needed for iron metabolism, red blood cell formation, and maintaining healthy bones, blood vessels, nerves, and immune function.'
    },
    Iron: {
      name: 'Iron',
      symbol: 'Fe',
      category: 'mineral',
      synergistic: ['Vitamin C', 'Copper'],
      antagonistic: ['Calcium', 'Zinc', 'Phytates', 'Polyphenols'],
      description: 'A vital component of hemoglobin, which carries oxygen in the blood. Essential for energy production and immune health.'
    },
    Selenium: {
      name: 'Selenium',
      symbol: 'Se',
      category: 'mineral',
      synergistic: ['Vitamin E'],
      antagonistic: ['Sulfur (excess)'],
      description: 'A powerful antioxidant that supports thyroid function and immune health.'
    },
    Molybdenum: {
      name: 'Molybdenum',
      symbol: 'Mo',
      category: 'mineral',
      synergistic: [],
      antagonistic: ['Copper (excess)'],
      description: 'A trace mineral that acts as a cofactor for several enzymes involved in metabolism.'
    },
    Phosphorus: {
      name: 'Phosphorus',
      symbol: 'P',
      category: 'mineral',
      synergistic: ['Calcium', 'Vitamin D'],
      antagonistic: ['Calcium (excess)', 'Magnesium (excess)'],
      description: 'Works with calcium to build strong bones and teeth. Also involved in energy production and cell signaling.'
    },
    'Vitamin D': {
      name: 'Vitamin D',
      symbol: 'D',
      category: 'vitamin',
      synergistic: ['Calcium', 'Magnesium', 'Vitamin K'],
      antagonistic: ['Vitamin A (excess)'],
      description: 'A fat-soluble vitamin essential for calcium absorption and bone health, immune function, and mood regulation.'
    },
    'Vitamin C': {
      name: 'Vitamin C',
      symbol: 'C',
      category: 'vitamin',
      synergistic: ['Iron', 'Copper (in some functions)'],
      antagonistic: ['Copper (excess)'],
      description: 'A powerful antioxidant that supports immune health, collagen production, and iron absorption.'
    },
    'Vitamin A': {
      name: 'Vitamin A',
      symbol: 'A',
      category: 'vitamin',
      synergistic: ['Zinc'],
      antagonistic: ['Vitamin D (excess)', 'Vitamin K (excess)'],
      description: 'Important for vision, immune function, and cell growth.'
    },
    'Vitamin E': {
      name: 'Vitamin E',
      symbol: 'E',
      category: 'vitamin',
      synergistic: ['Selenium', 'Vitamin C'],
      antagonistic: ['Vitamin K (excess)'],
      description: 'A fat-soluble antioxidant that protects cells from damage.'
    },
    'Vitamin B6': {
      name: 'Vitamin B6',
      symbol: 'B6',
      category: 'vitamin',
      synergistic: ['Magnesium'],
      antagonistic: [],
      description: 'Involved in over 100 enzyme reactions, primarily in protein metabolism. Also crucial for brain development and immune function.'
    },
    Potassium: {
      name: 'Potassium',
      symbol: 'K',
      category: 'mineral',
      synergistic: ['Magnesium', 'Sodium (balance)'],
      antagonistic: ['Sodium (excess)'],
      description: 'An electrolyte essential for fluid balance, nerve signals, and muscle contractions.'
    },
    Sodium: {
      name: 'Sodium',
      symbol: 'Na',
      category: 'mineral',
      synergistic: ['Potassium (balance)'],
      antagonistic: ['Potassium (excess)', 'Calcium (excess)'],
      description: 'An electrolyte crucial for fluid balance, nerve function, and muscle contractions. High intake can impact other minerals.'
    },
    Sulfur: {
      name: 'Sulfur',
      symbol: 'S',
      category: 'mineral',
      synergistic: [],
      antagonistic: ['Selenium (excess)', 'Molybdenum (excess)'],
      description: 'A component of many amino acids and vitamins. Important for protein synthesis and detoxification.'
    },
    'Vitamin K': {
      name: 'Vitamin K',
      symbol: 'K',
      category: 'vitamin',
      synergistic: ['Calcium', 'Vitamin D'],
      antagonistic: ['Vitamin A (excess)', 'Vitamin E (excess)'],
      description: 'Essential for blood clotting and bone health.'
    }
};

