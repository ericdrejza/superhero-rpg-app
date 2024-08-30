const archetypes = [
  {
    name: '',
    defenses: {
      dodge: Number,
      fortitude: Number,
      Toughness: Number,
      Willpower: Number
    },
    skills: Number,
    powers: Number,
    energy: Number
  },
  'anomaly',
  'construct',
  'controller',
  'mystic',
  'paragon',
  'powerhouse',
  'psychic',
  'shifter',
  'specialist',
  'speedster',
  'suit',
  'summoner',
  'warrior'
];

const feats = [];

const featTypes = ['archetype', 'common'];

const powers = [
  {
    name: 'absorption',
    tags: ['reaction'],
    associatedSkills: ['endurance'],
    description: 'Absorption description'
  }
];

const skills = [
  'acrobatics',
  'athletics',
  'brawn',
  'combat',
  'craft',
  'deception',
  'endurance',
  'expertise',
  'judgement',
  'intimidation',
  'investigation',
  'persuasion',
  'sleight of hand',
  'stealth',
  'technology',
  'treatment',
  'vehicles',
  'vigilance'
];

module.exports = { archetypes, feats, featTypes, powers, skills };
