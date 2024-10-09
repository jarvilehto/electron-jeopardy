import Link from "next/link";
import MenuButton from "./MenuButton";

const GameHeaderComponent = () => {
  return (
    <div id="gameHeader" className=" max-w-[1200px] m-auto px-2 py-4">
      <Link
        href="/newGame"
        style={{ color: "" }}
        className="mr-5 text-center p-2 rounded"
      >
        <button>Menu</button>
      </Link>
    </div>
  );
};

export default GameHeaderComponent;
