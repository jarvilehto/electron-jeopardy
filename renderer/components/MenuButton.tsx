import Link from "next/link";

const MenuButton = ({ text, navigate, style }) => {
  return (
    <Link href={navigate ? navigate : ""} className={style}>
      <button>{text}</button>
    </Link>
  );
};

export default MenuButton;
