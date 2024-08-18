const CategoryCard = ({ name, object, changeCategory }) => {
  return (
    <span
      className=" border rounded w-[200px] m-1 p-2 hover:border-black text-center"
      onClick={() => changeCategory(object)}
    >
      {name}
    </span>
  );
};

const CategoryForm = (props) => {
  return (
    <div className="bg-white px-2">
      <div className="px-2 flex flex-row align-center items-center mb-2">
        <h2>Categories {props.categories.length}/7</h2>
        <form
          onSubmit={props.formSubmit}
          className=""
          style={{ color: "black" }}
        >
          <input
            placeholder="Add categories"
            className="p-1 ml-4"
            value={props.inputValue}
            onChange={props.inputOnChange}
          />
          <button type="submit" className="text-white">
            Add new
          </button>
        </form>
      </div>
      <div className="flex w-full flex-row wrap">
        {props.categories.map((c, i) => (
          <CategoryCard
            key={i}
            name={c.name}
            object={c}
            changeCategory={props.changeCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryForm;
