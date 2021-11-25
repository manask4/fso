import anecdoteService from "../services/anecdotes";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);
// const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "VOTE":
      const id = action.data.id;
      const anecdote = state.find((item) => item.id === id);
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      return state.map((item) => (item.id !== id ? item : updatedAnecdote));
    case "ADD":
      return [...state, action.data];
    default:
      return state;
  }
};

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const data = await anecdoteService.addVote({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch({
      type: "VOTE",
      data,
    });
  };
};

export const addAnecdote = (anecdote) => {
  return async (dispatch) => {
    const data = await anecdoteService.createNew(anecdote);
    dispatch({
      type: "ADD",
      data,
    });
  };
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const data = await anecdoteService.getAll();
    dispatch({
      type: "INIT",
      data,
    });
  };
};

export default reducer;
