import type { GenerationResult } from '../types';

export const COMPARISON_DATA: [GenerationResult, GenerationResult] = [
  {
    id: 'comp-1',
    title: 'The Goblin\'s Tea Party',
    content: "Grizelda the goblin peered from her mushroom cottage. Today was her annual tea party, and no one had arrived. A single tear plopped into a tiny teacup. Suddenly, a gnome peeked out from behind a toadstool. 'Is this the right place for the Frightfully Fancy Tea Social?' he squeaked. Soon, a pixie, a troll, and a grumpy dwarf followed. They'd all gotten lost. Grizelda beamed, pouring moss-green tea. It wasn't about being fancy, she realized, but about the frightfully good friends who showed up.",
    summary: '',
    metadata: {
      params: { type: 'Story', genre: 'Fantasy', tone: 'humorous', length: 'short' },
      type: 'Story',
      genre: 'Fantasy',
      tone: 'humorous',
      wordCount: 'short',
      tokenUsage: 'N/A',
      generationTime: 0,
    },
  },
  {
    id: 'comp-2',
    title: 'The Goblin\'s Lament',
    content: "Grizelda the goblin clutched the invitation, its edges crumpled from her grip. 'Annual Tea Party,' it read in her own spidery script. But the clearing was empty. The wind whispered through the toadstools, a lonely song of forgotten things. She had hoped, this year, someone would remember. She had brewed the finest bog-water tea. But like every year before, she would drink it alone, a solitary queen in a kingdom of silence, her only guest the long shadow of the setting sun.",
    summary: '',
    metadata: {
      params: { type: 'Story', genre: 'Fantasy', tone: 'tragic', length: 'short' },
      type: 'Story',
      genre: 'Fantasy',
      tone: 'tragic',
      wordCount: 'short',
      tokenUsage: 'N/A',
      generationTime: 0,
    },
  },
];