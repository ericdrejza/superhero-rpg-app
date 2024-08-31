const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
  archetypes,
  conditions,
  featTypes,
  featureCooldowns,
  powers,
  skills
} = require('../data/rules');
const { isHexColor } = require('../../util/regex_validators');

const conditionConf = (severity) => {
  return {
    condition: {
      type: String,
      enum: Object.keys(conditions)
        .filter((condition) => conditions[condition].severity === severity)
        .map((condition) => conditions[condition].name)
    },
    overcomeBy: {
      type: String,
      required: true
    }
    // validate: {
    //   validator: (condition) => {
    //     TODO: does this condition exist in the tier one list
    //   },
    //   message: (props) =>
    //     `${props.value} is not a valid condition at this rank`
    // }
  };
};

const colorConf = {
  type: String,
  validate: {
    validator: isHexColor(value),
    message: (props) => `${props.value} is not a valid hex color!`
  }
};

const defenseConf = {
  ranks: {
    ...standardRankConf,
    default: 0,
    required: true
  },
  buffs: Number,
  flaws: Number,
  mimickedRanks: Number,
  shift: Number,
  nullifyFlaws: Number
};

const standardRankConf = {
  type: Number,
  min: 0,
  max: 3
};

// CREATE SCHEMA
const characterSchema = new Schema({
  accesses: [
    {
      name: {
        type: String,
        required: true
      },
      accessOption: {
        type: String,
        enum: accesses,
        required: true
      },
      notes: {
        type: String
      },
      available: Boolean
    }
  ],
  afflictions: [
    {
      ranks: {
        type: Number,
        min: 0,
        max: 6
      },
      condition1: conditionConf(1),
      condition2: conditionConf(2),
      condition3: conditionConf(3)
    }
  ],
  archetype: { type: String, enum: archetypes },
  backstory: String,
  complications: [
    {
      name: {
        type: String,
        required: true
      },
      notes: String
    }
  ],
  defenses: {
    dodge: defenseConf,
    fortitude: defenseConf,
    toughness: defenseConf,
    willpower: defenseConf
  },
  emblem: String,
  energy: {
    current: {
      type: Number,
      min: 0,
      max: () => {
        return this.energy.maximum;
      }
    },
    maximum: {
      type: Number,
      min: 0,
      required: true
    },
    buffs: Number,
    flaws: Number
  },
  feats: [
    {
      name: {
        type: String,
        required: true
      },
      featType: {
        type: String,
        enum: featTypes,
        required: true
      },
      cooldown: {
        type: String,
        enum: featureCooldowns,
        required: true
      },
      custom: Boolean,
      customDescription: {
        type: String,
        required: true
      },
      specifier: String
    }
  ],
  tier: {
    type: Number,
    min: 1,
    max: () => {
      return this.nonHero ? 4 : 3;
    },
    required: true
  },
  imageUrl: String,
  injury: {
    type: Number,
    min: 0,
    max: 12
  },
  isSummon: Boolean,
  kit: {
    name: {
      type: String,
      required: true
    },
    selection1: {
      type: String,
      required: true
    },
    selection2: {
      type: String,
      required: true
    },
    feature: {
      name: {
        type: String,
        required: true
      }
    },
    custom: Boolean
  },
  level: {
    type: Number,
    min: 1,
    max: 10,
    required
  },
  motivation: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  nonHero: Boolean,
  origin: {
    type: String
  },
  player: String,
  powers: [
    {
      name: String,
      power: {
        type: String,
        enum: powers.map((power) => power.name),
        required: true
      },
      specifier: String,
      ranks: {
        ...standardRankConf,
        min: 1,
        required: true
      },
      buffs: {
        type: Number,
        min: 0
      },
      flaws: {
        type: Number,
        min: 0
      },
      mimickedRanks: standardRankConf,
      nullifyFlaws: standardRankConf,
      shift: standardRankConf,
      strain: standardRankConf,
      notes: String
    }
  ],
  realName: String,
  resolve: {
    type: Number,
    default: 0,
    min: 0,
    max: 3
  },
  skills: [
    {
      name: {
        type: String,
        enum: skills,
        required: true
      },
      specifier: String,
      ranks: {
        ...standardRankConf,
        required: true
      },
      buffs: {
        type: Number,
        min: 0
      },
      flaws: {
        type: Number,
        min: 0
      },
      mimickedRanks: standardRankConf,
      nullifyFlaws: standardRankConf,
      shift: standardRankConf,
      strain: standardRankConf,
      notes: String
    }
  ],
  suitInjury: {
    type: Number,
    min: 0,
    max: 12,
    validate: {
      validator: () => {
        return this.archetype === 'suit';
      },
      message: (props) => `Suit injury is only applicable to the Suit archetype`
    }
  },
  summons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
  tags: {
    type: [String],
    validate: {
      validator: (tags) => {
        return Array.isArray(tags) && new Set(tags).size === tags.length;
      },
      message: (props) => `Tags array contains duplicates: ${props.value}`
    }
  },
  xp: Number,

  // DATE FIELDS
  dateCreated: Date,
  lastAccessed: Date,

  // COLOR FIELDS
  colorBackground: colorConf,
  colorPrimary: colorConf,
  colorSecondary: colorConf,
  colorAccent: colorConf,

  // CHARACTER SPACE FIELD
  characterSpace: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'CharacterSpace' }
  ]
});

module.exports = mongoose.model('Character', characterSchema);
