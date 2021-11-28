import React from "react";
import { useSelector } from "react-redux";

function Notification() {
  const notification = useSelector((state) => state.notification);

  if (notification.type === null) {
    return null;
  }
  return (
    <div className={`notification ${notification.type}`}>
      <p>{notification.text}</p>
    </div>
  );
}

export default Notification;
