import React from "react";
import PropTypes from "prop-types";

export default function DisplayData({ location, name, avatar_url, bio }) {
  return (
    <div>
      <div>
        <h5>{name}</h5>
      </div>
      <div>
        <img src={avatar_url} width="50" height="50" />
      </div>
      <div>LOCATION: {location}</div>
      <div>BIO: {bio}</div>
    </div>
  );
}

DisplayData.propTypes = {
  name: PropTypes.string,
  location: PropTypes.string,
  bio: PropTypes.string,
};

DisplayData.defaultProps = {
  name: "Not found",
  location: "No data about location",
  bio: "No bio for this user",
};
