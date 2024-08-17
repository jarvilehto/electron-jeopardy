import Link from "next/link";

const MenuButton = (props) => {
  const text = props.text;
  const link = props.navigate;
  const style = props.style;

  return (
    <Link href={link ? link : ""} className={style}>
      <button>{text}</button>
    </Link>
  );
};

export default MenuButton;
