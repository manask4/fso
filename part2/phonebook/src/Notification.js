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

export default Notification;
