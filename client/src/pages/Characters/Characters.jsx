import React, { useEffect, useState } from 'react';
import './Characters.scss';
import CharacterSelect from '../../components/CharacterSelect';
import api from '../../api/characters';

const Characters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await api.get('/characters');
        setCharacters(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCharacters();
  }, []);

  const createCharacter = async (newCharacter) => {
    try {
      const response = await api.post('/characters', newCharacter);
      setCharacters([...characters, response.data]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='Characters container-fluid'>
      <div className='collections-sidebar'>
        <h4>Collections</h4>
        <hr />
        <p>Collection 1</p>
        <p>Collection 2</p>
        <p>Collection 3</p>
        <p>Collection 4</p>
      </div>
      <div className='px-4 character-select-container'>
        <h2 className='page-title'>Character Select</h2>
        <div className='pt-2'>
          <CharacterSelect
            characters={characters}
            createCharacter={createCharacter}
          />
        </div>
      </div>
    </div>
  );
};

export default Characters;
