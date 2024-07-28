import React, { useState } from "react";
import { ATTRIBUTE_LIST, SKILL_LIST } from "./utils/constants";
import Character from "./components/Character";
import "./App.css";

const App = () => {
  const [characters, setCharacters] = useState([]);

  const addCharacter = () => {
    setCharacters([
      ...characters,
      {
        id: characters.length + 1,
        name: `Character ${characters.length + 1}`,
        attributes: ATTRIBUTE_LIST.reduce(
          (acc, attr) => ({ ...acc, [attr]: 10 }),
          {}
        ),
        skills: SKILL_LIST.reduce(
          (acc, skill) => ({ ...acc, [skill.name]: 0 }),
          {}
        ),
      },
    ]);
  };

  const updateCharacter = (updatedCharacter) => {
    setCharacters(
      characters.map((character) =>
        character.id === updatedCharacter.id ? updatedCharacter : character
      )
    );
  };

  return (
    <div>
      <div className="App">
        <header className="App-header">React Coding Exercise</header>

        <button onClick={addCharacter} className="add-character-btn">
          Add Character
        </button>
      </div>
      <div>
        {characters.map((character) => (
          <Character
            key={character.id}
            character={character}
            updateCharacter={updateCharacter}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
