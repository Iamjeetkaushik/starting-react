import React from 'react';
import PropTypes from 'prop-types';

import './App.css';
import pokemon from './pokemon.json';

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(',')}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Select!</button>
    </td>
  </tr>
);

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {Object.keys(base).map((key) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{base[key]}</td>
        </tr>
      ))}
    </table>
  </div>
);

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    'sp. Attack': PropTypes.number.isRequired,
    'sp. Defense': PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
};

PokemonRow.prototype = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({ english: PropTypes.string.isRequired }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
    onSelect: PropTypes.func.isRequired,
  }),
};

function App() {
  const [filter, filterSet] = React.useState('');
  const [selectedIteam, selectedIteamSet] = React.useState(null);

  return (
    <div>
      <h1 className='title'>Pokemon Search</h1>
      <input
        value={filter}
        onChange={(evt) => filterSet(evt.target.value)}
      ></input>
      <div className='table-grid'>
        <table width='100%'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {pokemon
              .filter((pokemon) =>
                pokemon.name.english
                  .toLowerCase()
                  .includes(filter.toLowerCase())
              )
              .slice(0, 20)
              .map((pokemon) => (
                <PokemonRow
                  pokemon={pokemon}
                  onSelect={(pokemon) => selectedIteamSet(pokemon)}
                  key={pokemon.id}
                />
              ))}
          </tbody>
        </table>
      </div>
      {selectedIteam && <PokemonInfo {...selectedIteam} />}
    </div>
  );
}

export default App;
