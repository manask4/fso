import styled from "styled-components";

const Button = styled.button`
  background: #fff;
  color: palevioletred;
  border: 1px solid;
  
  ${(props) =>
    props.primary &&
    `
    background: #66BB6A;
    color: #fff;
    border: 0;
  `}

  ${(props) =>
    props.default &&
    `
    background: #EEEEEE;
    color: #424242;
    border: 0;
  `}

  
  &:hover {
    box-shadow: 0px 4px 8px #ccc;
    transition: 0.2s ease-in-out;
  }
  font-size: ${(props) => (props.small ? "0.9em" : "1.2em")};
  cursor: pointer;
  padding: 0.5em;
  border-radius: 3px;
  transition: 0.2s ease-in-out;
`;

export default Button;
