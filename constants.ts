import { FantasyIcon, RomanceIcon, MysteryIcon, MotivationIcon, SciFiIcon, StoryIcon, PoemIcon } from './components/IconComponents';

export const TYPES = [
  { id: 'Story', label: 'Story', icon: StoryIcon },
  { id: 'Poem', label: 'Poem', icon: PoemIcon },
];

export const GENRES = [
  { id: 'Fantasy', label: 'Fantasy', icon: FantasyIcon },
  { id: 'Romance', label: 'Romance', icon: RomanceIcon },
  { id: 'Mystery', label: 'Mystery', icon: MysteryIcon },
  { id: 'Motivational', label: 'Motivational', icon: MotivationIcon },
  { id: 'Sci-Fi', label: 'Sci-Fi', icon: SciFiIcon },
];

export const TONES = [
  { value: 'dark', label: 'Dark' },
  { value: 'humorous', label: 'Humorous' },
  { value: 'inspirational', label: 'Inspirational' },
  { value: 'tragic', label: 'Tragic' },
  { value: 'suspenseful', label: 'Suspenseful' },
];

export const LENGTHS = [
  { value: 'short', label: 'Short (<150 words)' },
  { value: 'medium', label: 'Medium (150-400 words)' },
  { value: 'long', label: 'Long (>400 words)' },
];