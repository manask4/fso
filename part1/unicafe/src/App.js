import React, { useState } from "react";

import "./App.css";
import Header from "./Header";
import Feedback from "./Feedback";
import Statistics from "./Statistics";

function App() {  
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incGood = () => setGood(good + 1);
  const incNeutral = () => setNeutral(neutral + 1);
  const incBad = () => setBad(bad + 1);

  const mutators = { incGood, incNeutral, incBad };
  const all = good + neutral + bad;
  const avg = all ? (all / 3).toFixed(2) : 0;
  const positive = all ? ((good / all) * 100).toFixed(2) + '%' : 0;
  const stats = { good, neutral, bad, all, avg, positive };

  return (
    <div className="App App-header">
      <Header />
      <Feedback mutators={mutators} />
      <Statistics stats={stats} />
    </div>
  );
}

export default App;
