import Button from "./Button";

function Feedback({ mutators }) {
  return (
    <div className="feedback-btns">
      <Button handleClick={mutators.incGood} text="Good" />
      <Button handleClick={mutators.incNeutral} text="Neutral" />
      <Button handleClick={mutators.incBad} text="Bad" />
    </div>
  );
}

export default Feedback;
