import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import './CharacterSelect.scss';
import CharacterCard from '../CharacterCard';
import { FaSortAlphaDown, FaSortAlphaUp, FaPlusCircle } from 'react-icons/fa';

const CharacterSelect = () => {
  const characters = useMemo(
    () => [
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
        colorAccent: '#5dc4ff'
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
        colorSecondary: '#373744',
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
      },
      {
        id: 5,
        name: 'Nuclear Med',
        archetype: 'Controller',
        profile: 'The Healer',
        level: 4,
        tier: 2,
        tags: ['radiation', 'healing'],
        colorPrimary: '#55fd95',
        colorSecondary: '#0cc',
        colorAccent: '#000'
      },
      {
        id: 7,
        name: 'Gluestick',
        archetype: 'Anomaly',
        profile: 'The Distraction',
        level: 2,
        tier: 1,
        tags: ['swinging', 'wallcrawling'],
        colorPrimary: '#FADFA1',
        colorSecondary: '#D2E0FB',
        colorAccent: '#C96868'
      },
      {
        id: 8,
        name: 'Batman',
        archetype: 'Specialist',
        profile: 'The Detective',
        level: 7,
        tier: 3,
        tags: ['Investigation', 'Unarmed'],
        colorPrimary: '#373744',
        colorSecondary: '#222',
        colorAccent: '#f3DF8A'
      },
      {
        id: 9,
        name: 'Superman',
        archetype: 'Paragon',
        profile: 'The Outsider',
        level: 7,
        tier: 3,
        tags: ['flight', 'strength', 'speed'],
        colorPrimary: '#5885dd',
        colorSecondary: '#D04848',
        colorAccent: '#FDE767'
      },
      {
        id: 10,
        name: 'Wonder Woman',
        archetype: 'Warrior',
        profile: 'The Combatant',
        level: 7,
        tier: 3,
        tags: ['strength', 'speed', 'unarmed'],
        colorPrimary: '#c03848',
        colorSecondary: '#5885dd',
        colorAccent: '#C0C032'
      },
      {
        id: 11,
        name: 'Aquaman',
        archetype: 'Warrior',
        profile: 'The Muscle',
        level: 6,
        tier: 3,
        tags: ['swimming', 'strength'],
        colorPrimary: '#FF9800',
        colorSecondary: '#90D26D',
        colorAccent: '#2C7865'
      },
      {
        id: 12,
        name: 'Green Lantern',
        archetype: 'Controller',
        profile: 'The Pilot',
        level: 6,
        tier: 3,
        tags: ['energy constructs', 'craft'],
        colorPrimary: 'hsl(130, 100%, 25%)',
        colorSecondary: 'hsl(135, 70%, 42%)',
        colorAccent: '#FFF'
      },
      {
        id: 13,
        name: 'The Flash',
        archetype: 'Speedster',
        profile: 'The Detective',
        level: 6,
        tier: 3,
        tags: ['Speed'],
        colorPrimary: 'hsl(0, 100%, 40%)',
        colorSecondary: 'hsl(0, 100%, 25%)',
        colorAccent: 'hsl(60, 100%, 50%)'
      }
      // {
      //   id: 6,
      //   name: 'Santa Claws',
      //   archetype: 'Warrior',
      //   profile: 'The Immortal',
      //   level: 10,
      //   tier: 3,
      //   tags: ['scrapper', 'melee'],
      //   colorPrimary: 'darkgreen',
      //   colorSecondary: 'darkred',
      //   colorAccent: '#fff'
      // }
    ],
    []
  );

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('accessed');
  const [reverseSort, setReverseSort] = useState(false);

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      return (
        _.lowerCase(character.name).includes(_.lowerCase(search)) ||
        _.lowerCase(character.archetype).includes(_.lowerCase(search)) ||
        _.lowerCase(character.tags.join(' ')).includes(_.lowerCase(search))
      );
    });
  }, [characters, search]);

  const sortedCharacters = useMemo(() => {
    const sorted = filteredCharacters.sort((c1, c2) => {
      if (sort === 'name') {
        return c1.name.localeCompare(c2.name);
      } else if (sort === 'archetype') {
        return c1.archetype.localeCompare(c2.archetype);
      } else if (sort === 'created') {
        return c1.dateCreated - c2.dateCreated;
      } else {
        return c1.lastAccessed - c2.lastAccessed;
      }
    });
    if (reverseSort) {
      return sorted.reverse();
    } else {
      return sorted;
    }
  }, [filteredCharacters, sort, reverseSort]);

  return (
    <div className='CharacterSelect'>
      <div className='toolbar row gy-3'>
        <div className='sort col col-12 col-sm-6 col-md-3'>
          <select
            className='form-select sort-select'
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label='Sort characters'>
            <option value='archetype'>Archetype</option>
            <option value='created'>Date Created</option>
            <option value='accessed'>Last Accessed</option>
            <option value='name'>Name</option>
          </select>
          {reverseSort ? (
            <FaSortAlphaUp
              className='order-btn'
              onClick={() => setReverseSort(!reverseSort)}
            />
          ) : (
            <FaSortAlphaDown
              className='order-btn'
              onClick={() => setReverseSort(!reverseSort)}
            />
          )}
        </div>
        <div className='filter col col-12 col-sm-6 col-md-5'>
          <input
            className='form-control'
            type='search'
            placeholder='Search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className='create-btn-container col col-12 col-md-2'>
          <FaPlusCircle
            className='create-char-btn btn'
            size='4rem'
            data-bs-toggle='modal'
            data-bs-target='#createModal'
          />
        </div>
        {/* <button className='create-char-btn btn btn-primary col col-sm-6 col-md-2'>
          Create Character
        </button> */}
      </div>
      <div className='card-feed row gy-4'>
        {sortedCharacters.map((c) => (
          <div
            key={c.id}
            className='cards col col-sm-6 col-md-4 col-xl-3 col-xxl-2'>
            <CharacterCard data={c} />
          </div>
        ))}
      </div>

      {/* MODAL */}
      <div
        class='modal fade'
        id='createModal'
        tabindex='-1'
        aria-labelledby='Create character modal'
        aria-hidden='true'>
        <div class='modal-dialog modal-dialog-centered'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h1 class='modal-title fs-5'>Create a New Character</h1>
              <button
                type='button'
                class='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <form method='post'>
              <div class='modal-body'>
                <label className='form-label' htmlFor='email'>
                  Name
                </label>
                <input
                  className='form-control'
                  placeholder='Hero Name'
                  autoFocus
                />
              </div>
              <div class='modal-footer'>
                <button
                  type='button'
                  class='btn btn-secondary'
                  data-bs-dismiss='modal'>
                  Close
                </button>
                <button type='submit' class='btn btn-primary'>
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelect;
