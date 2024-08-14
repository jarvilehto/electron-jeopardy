import Head from "next/head";
import React, { useState } from "react";
import CategoryForm from "../components/CategoryForm";

export default function NewGame() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    name: "",
    questions: [],
    answers: [],
  });

  //Creates a new category
  const createNewCategory = (event: any) => {
    event.preventDefault();
    const nCategory = {
      id: String(categories.length + 1),
      name: newCategory,
      questions: [],
      answers: [],
    };

    if (categories.length !== 6) {
      setCategories(categories.concat(nCategory));
    }
    setNewCategory("");
  };

  //Updates 'Add categories field'
  const handleCategories = (event: any) => {
    setNewCategory(event.target.value);
  };
  //Selects new category to modify
  const changeCategory = (category: any) => {
    setSelectedCategory({
      name: category.name,
      id: category.id,
      questions: category.questions,
      answers: category.answers,
    });
  };

  //Saves modified category

  return (
    <React.Fragment>
      <Head>
        <title>Create a new game</title>
      </Head>
      <div className="w-full h-full">
        <h1>Create a new game</h1>
        <div className="flex flex-row justify-around">
          <div className="">
            <CategoryForm
              formSubmit={createNewCategory}
              inputValue={newCategory}
              inputOnChange={handleCategories}
              categories={categories}
              changeCategory={changeCategory}
            />
          </div>
          <div>
            <div>
              <div>
                <h2>Questio: Selected {selectedCategory.name}</h2>
              </div>
              <div>
                <p>questions</p>
                <div></div>
                <div>
                  <input />
                </div>
              </div>
              <div>
                <p>answers</p>
                <div>
                  <input />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
