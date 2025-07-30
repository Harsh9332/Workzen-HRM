import React from "react";
import InputField from "../../components/InputField";

const Location = ({ handleChange }) => {
  return (
    <div>
      <h4
        style={{
          marginBottom: "0.5rem",
          fontSize: "1.125rem",
          lineHeight: "1.75rem",
          fontWeight: "500",
        }}
      >
        Location
      </h4>
      <div>
        <InputField handleChange={handleChange} value="" title="All" name="location" />
        <InputField handleChange={handleChange} value="Ahmedabad" title="Ahmedabad" name="location" />
        <InputField handleChange={handleChange} value="Mumbai" title="Mumbai" name="location" />
        <InputField handleChange={handleChange} value="USA" title="USA" name="location" />
        <InputField handleChange={handleChange} value="Vapi" title="Vapi" name="location" />
      </div>
    </div>
  );
};

export default Location;
