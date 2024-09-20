import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import './CharacterSelect.scss';
import CharacterCard from '../CharacterCard';
import { FaSortAlphaDown, FaSortAlphaUp, FaPlusCircle } from 'react-icons/fa';

const CharacterSelect = ({ characters, createCharacter }) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('accessed');
  const [reverseSort, setReverseSort] = useState(false);
  const [newName, setNewName] = useState('');

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      return (
        _.lowerCase(character.name).includes(_.lowerCase(search)) ||
        _.lowerCase(character?.archetype).includes(_.lowerCase(search)) ||
        _.lowerCase(character?.tags?.join(' ')).includes(_.lowerCase(search))
      );
    });
  }, [characters, search]);

  const sortedCharacters = useMemo(() => {
    const sorted = filteredCharacters.sort((c1, c2) => {
      if (sort === 'name') {
        return c1.name.localeCompare(c2.name);
      } else if (sort === 'archetype') {
        return c1?.archetype?.localeCompare(c2?.archetype);
      } else if (sort === 'created') {
        return c1?.dateCreated - c2?.dateCreated;
      } else {
        return c1?.lastAccessed - c2?.lastAccessed;
      }
    });
    if (reverseSort) {
      return sorted.reverse();
    } else {
      return sorted;
    }
  }, [filteredCharacters, sort, reverseSort]);

  const handleCreateCharacterSubmit = (e) => {
    e.preventDefault();
    createCharacter({ name: newName, dateCreated: Date() });
  };

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
        className='modal fade'
        id='createModal'
        tabIndex='-1'
        aria-labelledby='Create character modal'
        aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5'>Create a New Character</h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <form onSubmit={handleCreateCharacterSubmit}>
              <div className='modal-body'>
                <label className='form-label' htmlFor='email'>
                  Name
                </label>
                <input
                  className='form-control'
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder='Hero Name'
                  autoFocus
                />
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => setNewName('')}
                  data-bs-dismiss='modal'>
                  Close
                </button>
                <button type='submit' className='btn btn-primary'>
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
