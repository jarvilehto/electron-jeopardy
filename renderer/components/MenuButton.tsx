import Link from "next/link";

const MenuButton = (props) => {
  const text = props.text;
  const link = props.navigate;

  return (
    <Link href={link ? link : ""}>
      <button>{text}</button>
    </Link>
  );
};

export default MenuButton;
