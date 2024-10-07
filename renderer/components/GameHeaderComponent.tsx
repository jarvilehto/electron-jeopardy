import MenuButton from "./MenuButton";

const GameHeaderComponent = () => {
  return (
    <div
      id="gameHeader"
      className=" flex w-full items-center   mb-5 max-w-[1200px]"
    >
      <div className="">
        <MenuButton
          style={"mr-5 text-center bg-white p-2 rounded"}
          text={"Menu"}
          navigate={"/newGame"}
        />
      </div>
    </div>
  );
};

export default GameHeaderComponent;
