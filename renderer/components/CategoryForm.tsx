const CategoryCard = ({ name, object, changeCategory }) => {
  return (
    <div className="border rounded w-[200px] m-2 p-2 hover:border-black">
      {name}
      <button onClick={() => changeCategory(object)}>select</button>
    </div>
  );
};

const CategoryForm = (props) => {
  return (
    <div>
      <div className="p-2 bg-black rounded border-slate-100 border  flex-col">
        <h2>Categories {props.categories.length}/6</h2>
        <form
          onSubmit={props.formSubmit}
          className=""
          style={{ color: "black" }}
        >
          <input
            placeholder="Add categories"
            className="p-1 my-3"
            value={props.inputValue}
            onChange={props.inputOnChange}
          />
          <button type="submit" className="text-white">
            Add new
          </button>
        </form>
      </div>
      <div>
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
