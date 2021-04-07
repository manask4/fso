import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

function Course({ courses }) {
  return (
    <>
      {courses.map((course) => {
        return (
          <div className="course" key={course.id}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        );
      })}
    </>
  );
}

export default Course;
