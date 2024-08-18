const CategoryCard = ({ name, object, changeCategory, rmCategory }) => {
  return (
    <>
      <div className="flex flex-row mr-2">
        <span
          className=" border rounded max-w-[200px] min-w-[50px] m-1 p-2 hover:border-black text-center"
          onClick={() => changeCategory(object)}
        >
          <p>{name}</p>
        </span>
        <button
          style={{ color: "red" }}
          className=" w-4 h-4 "
          onClick={() => rmCategory(object.id)}
        >
          x
        </button>
      </div>
    </>
  );
};

const CategoryForm = (props) => {
  return (
    <div className=" px-2 mb-5 flex flex-row-reverse  items-center">
      <div className="px-2 flex flex-row align-center items-center mb-3 pt-4">
        <h3>Categories: {props.categories.length}/7</h3>
        <form
          onSubmit={props.formSubmit}
          className=""
          style={{ color: "black" }}
        >
          <input
            placeholder="Add categories"
            className="p-1 ml-4 rounded"
            value={props.inputValue}
            onChange={props.inputOnChange}
          />
        </form>
      </div>
      <div className="flex w-full flex-row wrap">
        {props.categories.map((c, i) => (
          <CategoryCard
            key={i}
            name={c.name}
            object={c}
            changeCategory={props.changeCategory}
            rmCategory={props.rmCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryForm;
