import Head from "next/head";
import React, { useState } from "react";
import CategoryForm from "../components/CategoryForm";

export default function NewGame() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({
    id: null,
    name: "",
    questions: [
      { points: 100, question: "", answer: "" },
      { points: 200, question: "", answer: "" },
      { points: 300, question: "", answer: "" },
      { points: 400, question: "", answer: "" },
      { points: 500, question: "", answer: "" },
    ],
  });

  //Creates a new category
  const createNewCategory = (event: any) => {
    event.preventDefault();
    const nCategory = {
      id: String(categories.length + 1),
      name: newCategory,
      questions: [
        { points: 100, question: "", answer: "" },
        { points: 200, question: "", answer: "" },
        { points: 300, question: "", answer: "" },
        { points: 400, question: "", answer: "" },
        { points: 500, question: "", answer: "" },
      ],
    };

    if (categories.length !== 7) {
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
    });
  };

  //Saves modified category
  const handleSaveChanges = () => {
    const catSave = selectedCategory;
    catSave.questions.filter((x) => {
      if (x.points === 100) {
        x.answer = "test";
      }
    });
    setSelectedCategory(catSave);
  };

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
                <div>
                  <p>questions</p>
                  <button onClick={() => handleSaveChanges()}>save</button>
                </div>
                <div>
                  {selectedCategory.id !== null &&
                    selectedCategory.questions.map((q) => (
                      <div key={q.points} className="my-4 mx-1 p-1">
                        <h3>Question points: {q.points}</h3>
                        <div className="flex flex-col">
                          <input
                            value={q.question !== "" ? q.question : ""}
                            placeholder="question..."
                            className="px-1 my-1"
                            style={{ color: "black" }}
                          />
                          <input
                            value={q.answer !== "" ? q.answer : ""}
                            placeholder="answer..."
                            className="px-1 my-1"
                            style={{ color: "black" }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
