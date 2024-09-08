import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './CharacterSelect.scss';
import CharacterCard from '../CharacterCard';

const CharacterSelect = () => {
  const characters = [
    {
      id: 1,
      name: 'Cyberbow',
      archetype: 'Specialist',
      profile: 'The Gadgeteer',
      level: 4,
      tier: 2,
      tags: ['archery', 'technology', 'stealth'],
      colorPrimary: '#434a54',
      colorSecondary: '#431c63',
      colorAccent: '#2d94c4'
    },
    {
      id: 2,
      name: 'SoundFX',
      archetype: 'Anomaly',
      profile: 'The Technologist',
      level: 5,
      tier: 2,
      tags: ['Sonics'],
      colorPrimary: '#E7D4B5',
      colorSecondary: '#F6E6CB',
      colorAccent: '#557C56'
    },
    {
      id: 3,
      name: 'Miss Midnight',
      archetype: 'Controller',
      profile: 'The Shadow',
      level: 5,
      tier: 2,
      tags: ['darkness', 'control'],
      colorPrimary: '#0C0C0C',
      colorSecondary: '#1a1d25',
      colorAccent: '#EEDF7A'
    },
    {
      id: 4,
      name: 'Bulk Modulus',
      archetype: 'Powerhouse',
      profile: 'The Muscle',
      level: 5,
      tier: 2,
      tags: ['strength', 'toughness'],
      colorPrimary: '#2F3645',
      colorSecondary: '#EFEFEF',
      colorAccent: '#D4AC2B'
    }
  ];

  const [search, setSearch] = useState('');
  const [filteredCharacter, setFilteredCharacter] = useState([...characters]);

  useEffect(() => {
    setFilteredCharacter(
      characters.filter((character) => {
        return (
          _.lowerCase(character.name).includes(_.lowerCase(search)) ||
          _.lowerCase(character.archetype).includes(_.lowerCase(search)) ||
          _.lowerCase(character.tags.join(' ')).includes(_.lowerCase(search))
        );
      })
    );
  }, [search]);

  return (
    <div className='CharacterSelect row gy-4'>
      <form className='sorts-filters'>
        <div className='filter'>
          <input
            className='form-control'
            type='search'
            placeholder='Search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>
      {filteredCharacter.map((c) => (
        <div key={c.id} className='cards col col-sm-6 col-md-4 col-lg-3'>
          <CharacterCard data={c} />
        </div>
      ))}
    </div>
  );
};

export default CharacterSelect;
