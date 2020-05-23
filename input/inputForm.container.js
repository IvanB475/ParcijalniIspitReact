import React, { useState } from "react";
import InputFormComponent from "./inputForm";
import PropTypes from "prop-types";

export default function InputForm(props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (typeof props.handleSubmit === "function") {
      props.handleSubmit(query);
    }

    setQuery("");
  };
  const handleTextChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <InputFormComponent
      handleSubmit={handleSubmit}
      handleTextChange={handleTextChange}
      query={query}
    />
  );
}

InputForm.propTypes = {
  query: PropTypes.string,
};
