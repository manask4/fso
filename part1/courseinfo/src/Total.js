function Total({ parts }) {
  const total = parts.map((part) => part.exercises).reduce((t, n) => t + n);
  return <p>Number of exercises <b>{total}</b></p>;
}

export default Total;
