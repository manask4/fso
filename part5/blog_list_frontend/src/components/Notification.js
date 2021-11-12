import React from "react";
import PropTypes from "prop-types";

function Notification({ message }) {
  if (message.type === null) {
    return null;
  }
  return (
    <div className={`notification ${message.type}`}>
      <p>{message.text}</p>
    </div>
  );
}

Notification.propTypes = {
  message: PropTypes.object.isRequired,
};

export default Notification;
