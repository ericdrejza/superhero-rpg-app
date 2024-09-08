import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CharacterCard.scss';
import _ from 'lodash';

const CharacterCard = (props) => {
  const {
    id,
    archetype,
    level,
    name,
    profile,
    tags,
    tier,
    colorPrimary,
    colorSecondary,
    colorAccent
  } = props.data;

  const navigate = useNavigate();

  const handleCharacterClick = () => {
    console.log('navigating');
    navigate(`${id}`);
  };

  return (
    <div
      onClick={handleCharacterClick}
      className='CharacterCard'
      style={{ backgroundColor: `${colorPrimary}`, color: `${colorAccent}` }}>
      <h5 className='tier'>T {tier}</h5>
      <h5 className='level'>L {level}</h5>
      <h2 className='name'>{name}</h2>
      <h4 className='archetype'>{archetype}</h4>
      <h6 className='profile'>{profile}</h6>
      <div className='tags'>
        {tags.map((tag, index) => {
          return (
            <span
              key={index}
              className='tag'
              style={{
                backgroundColor: `${colorSecondary}`,
                color: `${colorAccent}`
              }}>
              {_.capitalize(tag)}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterCard;
