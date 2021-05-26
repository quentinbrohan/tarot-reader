export type ArcanaCategory = 'major' | 'cups' | 'pentacles' | 'swords' | 'wands';

export interface Card {
  id?: number;
  name: string;
  image: string;
  description: string;
  reversedKeywords: string;
  category: ArcanaCategory;
  reversed?: boolean;
}
