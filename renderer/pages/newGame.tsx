import Head from "next/head";
import React, { useState } from "react";
import CategoryForm from "../components/CategoryForm";
import QuestionCluster from "../components/QuestionCluster";
import MenuButton from "../components/MenuButton";

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

  return (
    <React.Fragment>
      <Head>
        <title>Create a new game</title>
      </Head>
      <div className="w-full h-full">
        <h1>Create a new game</h1>
        <MenuButton text={"Start Game"} navigate={"/gameBoard"} />
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
          <QuestionCluster
            categories={categories}
            setCategories={setCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
