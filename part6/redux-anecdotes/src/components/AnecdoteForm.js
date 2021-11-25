import React from "react";
import { connect } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    // dispatch(addAnecdote(anecdote));
    props.addAnecdote(anecdote);
    const message = `You added a new anecdote "${anecdote}"`;
    // dispatch(setNotification(message, 5));
    props.setNotification(message, 5);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" type="text" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  addAnecdote,
  setNotification,
};

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default connectedAnecdoteForm;
