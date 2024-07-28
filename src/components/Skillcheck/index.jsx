import React, { useState } from "react";
import { SKILL_LIST } from "../../utils/constants";
import "./index.css";

const SkillCheck = ({ character }) => {
  const [selectSkill, setselectSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDc] = useState(10);
  const [result, setResult] = useState(null);

  const performSkillCheck = () => {
    // Generate a random roll between 1 and 20
    const roll = Math.floor(Math.random() * 20) + 1;
    //console.log("Roll:", roll);

    const skillDetails = SKILL_LIST.find((skill) => skill.name === selectSkill);
    //console.log("Skill Details:", skillDetails);

    // Get the attribute name related to the selected skill
    const attributeName = skillDetails.attributeModifier;
    //console.log("Attribute Name:", attributeName);

    // Get the attribute value from the character object
    const attributeValue = character.attributes[attributeName];
    //console.log("Attribute Value:", attributeValue);

    // Calculate the skill points for the selected skill
    const skillPoints = character.skills[selectSkill];
    //console.log("Skill Points:", skillPoints);

    // Calculate the attribute modifier
    const attributeModifier = Math.floor((attributeValue - 10) / 2);
    //console.log("Attribute Modifier:", attributeModifier);

    // Calculate the total skill modifier
    const skillModifier = skillPoints + attributeModifier;
    //console.log("Skill Modifier:", skillModifier);

    // Calculate the total by adding the roll and the skill modifier
    const total = roll + skillModifier;
    //console.log("Total:", total);

    // Determine if the skill check is a success based on the DC
    const success = total >= dc;
    //console.log("DC:", dc);
    //console.log("Success:", success);

    // Set the result of the skill check
    setResult({ roll, total, success });
  };

  return (
    <div className="main-div">
      <h4>Skill Check</h4>
      <div className="mb-2">
        <label className="mr-2">Skill:</label>
        <select
          value={selectSkill}
          onChange={(e) => setselectSkill(e.target.value)}
          className="select-inp"
        >
          {SKILL_LIST.map((skill) => (
            <option key={skill.name} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="mr-2">DC:</label>
        <input
          type="number"
          value={dc}
          onChange={(e) => setDc(Number(e.target.value))}
          className="select-inp"
        />
      </div>
      <button onClick={performSkillCheck} className="skill-chk-btn">
        Roll
      </button>
      {result && (
        <div>
          <p>Roll: {result.roll}</p>
          <p>Total: {result.total}</p>
          <p>{result.success ? "Success!" : "Failure"}</p>
        </div>
      )}
    </div>
  );
};

export default SkillCheck;
