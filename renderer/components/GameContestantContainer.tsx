const GameContestantContainer = ({
  createContestant,
  contestant,
  handleContestantInput,
  contestants,
}) => {
  return (
    <div id="gameContestants" className=" p-2 my-5 w-full max-w-[1100px] ">
      <div className="flex flex-row items-center justify-between border-b pb-3">
        <h1>Contestants</h1>
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
      <div id="contestants-game" className="w-full">
        {contestants.map((contestant, i) => (
          <div
            key={i}
            className="flex flex-col justify-center items-center align-center"
          >
            <h1>{contestant.name}</h1>
            <h2>{contestant.points}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameContestantContainer;
