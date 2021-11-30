import styled from "styled-components";

const Table = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  text-align: left;
`;

const TableData = styled.td`
  padding: 1em;
  text-align: ${(props) => (props.alignRight ? "right" : "left")};
`;

const TableHeader = styled.th`
  font-weight: bold;
  font-size: 1.1em;
  color: #424242;
  padding: 1em;
  background-color: #ffab91;
  text-align: ${(props) => (props.alignRight ? "right" : "left")};
`;

export { Table, TableData, TableHeader };
