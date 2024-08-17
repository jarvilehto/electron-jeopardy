import MenuButton from "./MenuButton";

const GameHeaderComponent = () => {
  return (
    <div
      id="gameHeader"
      className=" flex  align-center justify-between items-center bg-white p-3 mb-5"
    >
      <h1 className="text-4xl text-bolder">Game Name</h1>
      <div className="mr-10">
        <MenuButton style={"mr-5"} text={"Menu"} navigate={"/newGame"} />
        <button>Reset</button>
      </div>
    </div>
  );
};

export default GameHeaderComponent;
