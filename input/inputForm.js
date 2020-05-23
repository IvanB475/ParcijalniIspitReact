import React from "react";
import "../styles.css";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

export default class InputFormComponent extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <p>Github username:</p>
        <input
          type="text"
          placeholder="e.g facebook"
          value={this.props.query}
          onChange={this.props.handleTextChange}
        />
        <Button type="submit">GO!</Button>
      </form>
    );
  }
}

InputFormComponent.propTypes = {
  query: PropTypes.string.isRequired,
};

InputFormComponent.defaultProps = {
  query: "facebook",
};
