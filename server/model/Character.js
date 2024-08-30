const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { archetypes, featTypes, powers, skills } = require('../data/rules');
const { isHexColor } = require('../../util/regex_validators');

const afflictionConf = (severity) => {
  return {
    type: String,
    enum: conditions,
    overcomeBy: {
      type: String,
      required: true
    },
    required: () => {
      return this.ranks >= severity * 2;
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
    type: Number,
    default: 0,
    min: 0,
    max: 3,
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

const characterSchema = new Schema({
  afflictions: [
    {
      condition1: afflictionConf(1),
      condition2: afflictionConf(2),
      condition3: afflictionConf(3)
    }
  ],
  archetype: {
    type: String,
    enum: archetypes
  },
  complications: [
    {
      name: {
        type: String,
        required: true
      },
      description: String,
      notes: String
    }
  ],
  defenses: {
    dodge: defenseConf,
    fortitude: defenseConf,
    toughness: defenseConf,
    willpower: defenseConf
  },
  energy: {
    current: {
      type: Number
    },
    maximum: {
      type: Number,
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
      description: {
        type: String,
        required: true
      }
    }
  ],
  heroTier: {
    type: Number,
    min: 1,
    max: 3
  },
  injury: {
    type: Number,
    min: 0,
    max: 12
  },
  kit: {
    type: String
  },
  level: {
    type: Number,
    min: 1,
    max: 10
  },
  motivation: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
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
      ranks: {
        ...standardRankConf,
        default: 0,
        required: true
      },
      specifier: String,
      notes: String,
      buffs: Number,
      flaws: Number,
      mimickedRanks: Number,
      shift: Number,
      strain: standardRankConf,
      nullifyFlaws: Number
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
      specifier: {
        type: String,
        required: function () {
          return (
            this.name === 'combat' ||
            this.name === 'craft' ||
            this.name === 'expertise'
          );
        }
      },
      ranks: {
        ...standardRankConf,
        default: 0,
        required: true
      },
      notes: String,
      buffs: {
        type: Number,
        min: 0
      },
      flaws: {
        type: Number,
        min: 0
      },
      mimickedRanks: standardRankConf,
      shift: standardRankConf,
      strain: standardRankConf,
      nullifyFlaws: standardRankConf
    }
  ],
  xp: Number,
  // COLOR FIELDS
  colorPrimary: colorConf,
  colorSecondary: colorConf,
  colorAccent: colorConf
});

module.exports = mongoose.model('Character', characterSchema);
