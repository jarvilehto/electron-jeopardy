import { useState } from "react";

const GameContestantContainer = ({
  createContestant,
  contestant,
  handleContestantInput,
  contestants,
  addPoints,
  removePoints,
}) => {
  const [points, setPoints] = useState({});

  const handlePoints = (e, contestantName) => {
    setPoints((prevPoints) => ({
      ...prevPoints,
      [contestantName]: e.target.value,
    }));
  };

  const clearPoints = (contestantName) => {
    setPoints((prevPoints) => ({
      ...prevPoints,
      [contestantName]: "",
    }));
  };

  return (
    <div id="gameContestants" className="m-auto max-w-[1200px] my-4 px-5">
      <div className="flex flex-row items-center justify-between border-b pb-2">
        <h1>Generous Fellas</h1>
        <form onSubmit={createContestant}>
          <input
            style={{ color: "black" }}
            className="px-2"
            type="text"
            placeholder="cool name..."
            value={contestant}
            onChange={handleContestantInput}
          />
        </form>
      </div>
      <div id="contestants-game" className="w-full py-4">
        {contestants.map((contestant, i) => (
          <div key={i} className="flex flex-col">
            <div className="flex flex-row justify-between mb-2 border-b pb-1 ">
              <h1>{contestant.name}</h1>
              <input
                style={{ backgroundColor: "rgb(37, 37, 37)", color: "white" }}
                className="w-1/2    px-1 text-right"
                placeholder="0"
                value={points[contestant.name] || ""}
                onChange={(e) => handlePoints(e, contestant.name)}
              ></input>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameContestantContainer;
