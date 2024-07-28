import React, { useState } from "react";
import {
  ATTRIBUTE_LIST,
  CLASS_LIST,
  SKILL_LIST,
  MAX_ATTR,
} from "../../utils/constants";
import Attribute from "../Attribute";
import Skill from "../Skill";
import SkillCheck from "../Skillcheck";
import "./index.css";

const calculateModifier = (value) => Math.floor((value - 10) / 2);

const Character = ({ character, updateCharacter }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [skillPoints, setSkillPoints] = useState(
    10 + 4 * calculateModifier(character.attributes.Intelligence)
  );

  const updateAttribute = (attribute, value) => {
    const newAttributes = { ...character.attributes, [attribute]: value };
    const newTotalAttributes = ATTRIBUTE_LIST.reduce(
      (sum, attr) => sum + newAttributes[attr],
      0
    );

    if (newTotalAttributes <= MAX_ATTR) {
      const newSkillPoints =
        10 + 4 * calculateModifier(newAttributes.Intelligence);
      updateCharacter({ ...character, attributes: newAttributes });
      setSkillPoints(newSkillPoints);
    } else {
      alert(`Total attribute points cannot exceed ${MAX_ATTR}.`);
    }
  };

  const updateSkill = (skill, value) => {
    const newSkills = { ...character.skills, [skill]: value };
    updateCharacter({ ...character, skills: newSkills });
  };

  const selectClass = (className) => {
    setSelectedClass(className);
  };

  return (
    <div className="main-div">
      <h2 className="h2">{character.name}</h2>
      <div className="inner-div">
        {ATTRIBUTE_LIST.map((attr) => (
          <Attribute
            key={attr}
            name={attr}
            value={character.attributes[attr]}
            modifier={calculateModifier(character.attributes[attr])}
            updateAttribute={updateAttribute}
          />
        ))}
      </div>
      <h3 className="h3">Classes</h3>
      <div className="class-div">
        {Object.keys(CLASS_LIST).map((className) => (
          <button
            key={className}
            onClick={() => selectClass(className)}
            className={`class-btn ${
              Object.entries(CLASS_LIST[className]).every(
                ([attr, min]) => character.attributes[attr] >= min
              )
                ? "selected-color"
                : "non-selected"
            }`}
          >
            {className}
          </button>
        ))}
      </div>
      {selectedClass && (
        <div>
          <h4>Minimum Requirements for {selectedClass}</h4>
          <ul>
            {Object.entries(CLASS_LIST[selectedClass]).map(([attr, min]) => (
              <li key={attr}>
                {attr}: {min}
              </li>
            ))}
          </ul>
        </div>
      )}
      <h3 className="h3">Skills (Points Available: {skillPoints})</h3>
      <div className="skill-div">
        {SKILL_LIST.map((skill) => (
          <Skill
            key={skill.name}
            skill={skill}
            value={character.skills[skill.name]}
            modifier={calculateModifier(
              character.attributes[skill.attributeModifier]
            )}
            updateSkill={updateSkill}
            attribute={skill.attributeModifier}
            attributeValue={character.attributes[skill.attributeModifier]}
          />
        ))}
      </div>
      <SkillCheck character={character} />
    </div>
  );
};

export default Character;
