const CategoryCard = ({
  name,
  object,
  changeCategory,
  rmCategory,
  selectedCategory,
}) => {
  const bgColor = () => {
    if (selectedCategory.id == object.id) {
      return "green";
    } else {
      return "";
    }
  };

  return (
    <>
      <div className="flex flex-row w-full">
        <span
          className=" border rounded w-full m-1 p-2 hover:border-black text-center relative z-2"
          style={{ backgroundColor: bgColor() }}
          onClick={() => changeCategory(object)}
        >
          <p className="text-md">{name}</p>
          <button
            style={{}}
            className=" absolute right-0 top-0 text-center rounded-sm z-0"
            onClick={() => rmCategory(object.id)}
          >
            <p className="text-sm">❌</p>
          </button>
        </span>
      </div>
    </>
  );
};

const CategoryForm = (props) => {
  return (
    <div className=" flex flex-col px-4 mb-3">
      <div className=" flex flex-col  mb-3">
        <h3 className="mt-2 text-center border-b">
          {" "}
          {props.categories.length}/7
        </h3>
        <form
          onSubmit={props.formSubmit}
          className="mt-3"
          style={{ color: "black" }}
        >
          <input
            placeholder="Add categories"
            className="p-1  rounded w-full"
            value={props.inputValue}
            onChange={props.inputOnChange}
          />
        </form>
      </div>
      <div className="flex w-full flex-col wrap">
        {props.categories.map((c, i) => (
          <CategoryCard
            key={i}
            name={c.name}
            object={c}
            changeCategory={props.changeCategory}
            rmCategory={props.rmCategory}
            selectedCategory={props.selectedCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryForm;
