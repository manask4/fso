import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  // const dispatch = useDispatch();

  const handleChange = (event) => {
    const text = event.target.value;
    // dispatch(setFilter(text));
    props.setFilter(text);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  setFilter,
};

const connectedFilter = connect(null, mapDispatchToProps)(Filter);

export default connectedFilter;
