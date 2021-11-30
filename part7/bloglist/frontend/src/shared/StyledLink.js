import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  padding: 4px 8px;
  &:hover {
    background-color: #7E57C2;
  }
`;

export default StyledLink;