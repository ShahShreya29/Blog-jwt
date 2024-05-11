import React from "react";

const SelectField = ({ onChange, value, options }) => {
  return (
    <>
      {" "}
      <div>
        <select value={value} onChange={onChange} className="form-control">
          <option value="">Select Role</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectField;
