function Total({ parts }) {
  const total = parts.reduce((t, n) => t + n.exercises, 0);
  return (
    <p>
      <b>Number of exercises {total}</b>
    </p>
  );
}

export default Total;
