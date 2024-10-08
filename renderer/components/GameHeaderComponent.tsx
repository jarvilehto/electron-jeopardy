import Link from "next/link";
import MenuButton from "./MenuButton";

const GameHeaderComponent = () => {
  return (
    <div
      id="gameHeader"
      className=" flex w-full items-center   mb-5 max-w-[1200px]"
    >
      <div className="">
        <Link
          href="/newGame"
          style={{ color: "black" }}
          className="mr-5 text-center bg-white p-2 rounded"
        >
          <button>Menu</button>
        </Link>
      </div>
    </div>
  );
};

export default GameHeaderComponent;
