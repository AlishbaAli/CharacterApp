import React from "react";

const Skill = ({
  skill,
  value,
  modifier,
  updateSkill,
  attribute,
  attributeValue,
}) => {
  const incrementPoints = () => {
    updateSkill(skill.name, value + 1);
  };

  const decrementPoints = () => {
    if (value > 0) {
      updateSkill(skill.name, value - 1);
    }
  };

  return (
    <div className="skill-div">
      <span>
        <span>
          {skill.name}: {value} (Modifier: {modifier})
        </span>
      </span>

      <div>
        <span>
          ({attribute}: {attributeValue})
        </span>
        <button onClick={decrementPoints} className="minus-btn">
          -
        </button>
        <button onClick={incrementPoints} className="plus-btn">
          +
        </button>
      </div>
    </div>
  );
};

export default Skill;
