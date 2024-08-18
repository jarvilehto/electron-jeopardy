import Head from "next/head";
import React, { useState } from "react";
import CategoryForm from "../components/CategoryForm";
import QuestionCluster from "../components/QuestionCluster";
import MenuButton from "../components/MenuButton";

const template = {
  id: null,
  name: "",
  questions: [
    { points: 100, question: "", answer: "" },
    { points: 200, question: "", answer: "" },
    { points: 300, question: "", answer: "" },
    { points: 400, question: "", answer: "" },
    { points: 500, question: "", answer: "" },
  ],
};

export default function NewGame() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(template);
  const maxCat = 7;

  //Creates a new category
  const createNewCategory = (event: any) => {
    event.preventDefault();
    const nCategory = {
      id: Math.floor(Math.random() * 9000) + 1000,
      name: newCategory,
      questions: [
        { points: 100, question: "", answer: "" },
        { points: 200, question: "", answer: "" },
        { points: 300, question: "", answer: "" },
        { points: 400, question: "", answer: "" },
        { points: 500, question: "", answer: "" },
      ],
    };

    if (categories.length !== maxCat) {
      setCategories(categories.concat(nCategory));
    }
    setNewCategory("");
  };

  const removeCategory = (id) => {
    const newArr = categories.filter((item, i) => item.id !== id);
    setCategories(newArr);
    setSelectedCategory(template);
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
    <div className="max-w-[1200px] m-auto text-white">
      <Head>
        <title>Create a new game</title>
      </Head>
      <div
        id="newGameHeader"
        style={{ color: "black" }}
        className=" flex   align-center justify-between items-center bg-white p-3 mb-2"
      >
        <h1 className="text-4xl text-bolder">Create A Game</h1>
        <div className="mr-10">
          <button>Load Save</button>
          <MenuButton text={"Start Game"} navigate={"/gameBoard"} />
        </div>
      </div>
      <div id="newGameCategories">
        <div className="">
          <CategoryForm
            formSubmit={createNewCategory}
            inputValue={newCategory}
            inputOnChange={handleCategories}
            categories={categories}
            changeCategory={changeCategory}
            rmCategory={removeCategory}
          />
        </div>
      </div>
      <QuestionCluster
        categories={categories}
        setCategories={setCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}

/*
      <Head>
        <title>Create a new game</title>
      </Head>
      <div className="w-full h-full text-white">
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

*/
