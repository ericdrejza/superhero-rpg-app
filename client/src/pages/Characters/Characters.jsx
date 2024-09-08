import React from 'react';
import './Characters.scss';
import CharacterSelect from '../../components/CharacterSelect';

const Characters = () => {
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
        <div className='pt-4'>
          <CharacterSelect />
        </div>
      </div>
    </div>
  );
};

export default Characters;
