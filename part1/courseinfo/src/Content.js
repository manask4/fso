import Part from "./Part";

function Content(props) {
  return (
    <div>
      {props.parts.map((element, index) => (
        <Part key={index} name={element.name} number={element.exercises} />
      ))}
    </div>
  );
}

export default Content;
