export type MineralName =
  | "Calcium"
  | "Magnesium"
  | "Zinc"
  | "Copper"
  | "Iron"
  | "Selenium"
  | "Molybdenum"
  | "Phosphorus"
  | "Vitamin A"
  | "Vitamin B6"
  | "Vitamin C"
  | "Vitamin D"
  | "Vitamin E"
  | "Vitamin K"
  | "Potassium"
  | "Sodium"
  | "Sulfur";

export type MineralSymbol =
  | "Ca"
  | "Mg"
  | "Zn"
  | "Cu"
  | "Fe"
  | "Se"
  | "Mo"
  | "P"
  | "D"
  | "C"
  | "A"
  | "E"
  | "B6"
  | "K"
  | "Na"
  | "S";

export type MineralRelationship = {
  symbol: MineralSymbol;
  description?: string;
};

export type Mineral = {
  name: MineralName,
  symbol: MineralSymbol,
  synergistic: MineralRelationship[],
  antagonistic: MineralRelationship[],
  description: string,
  category?: 'mineral' | 'vitamin',
};

  // Helper map from name to symbol
  export const mineralNameToSymbol: Record<MineralName, MineralSymbol> = {
    Calcium: 'Ca',
    Magnesium: 'Mg',
    Zinc: 'Zn',
    Copper: 'Cu',
    Iron: 'Fe',
    Selenium: 'Se',
    Molybdenum: 'Mo',
    Phosphorus: 'P',
    'Vitamin A': 'A',
    'Vitamin B6': 'B6',
    'Vitamin C': 'C',
    'Vitamin D': 'D',
    'Vitamin E': 'E',
    'Vitamin K': 'K',
    Potassium: 'K',
    Sodium: 'Na',
    Sulfur: 'S',
  };