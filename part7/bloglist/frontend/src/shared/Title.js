import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => (props.h2 ? "#424242" : "#5e35b1")};
  font-size: ${(props) => (props.h2 ? "1.5em" : "2.5em")};
`;

export default Title;
