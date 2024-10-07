import Head from "next/head";
import React, { useEffect, useState } from "react";
import CategoryForm from "../components/CategoryForm";
import QuestionCluster from "../components/QuestionCluster";
import MenuButton from "../components/MenuButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/*
TODO: CHOOSE FROM PREV GAMES
TODO: SAVE TO GAMES
LATER
*/

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
        {
          points: 100,
          question: "",
          answer: "",
          answered: false,
          hasImgQ: false,
          hasImgA: false,
          imgQ: "",
          imgA: "",
          embedQ: "",
          embedA: "",
        },
        {
          points: 200,
          question: "",
          answer: "",
          answered: false,
          hasImgQ: false,
          hasImgA: false,
          imgQ: "",
          imgA: "",
          embedQ: "",
          embedA: "",
        },
        {
          points: 300,
          question: "",
          answer: "",
          answered: false,
          hasImgQ: false,
          hasImgA: false,
          imgQ: "",
          imgA: "",
          embedQ: "",
          embedA: "",
        },
        {
          points: 400,
          question: "",
          answer: "",
          answered: false,
          hasImgQ: false,
          hasImgA: false,
          imgQ: "",
          imgA: "",
          embedQ: "",
          embedA: "",
        },
        {
          points: 500,
          question: "",
          answer: "",
          answered: false,
          hasImgQ: false,
          hasImgA: false,
          imgQ: "",
          imgA: "",
          embedQ: "",
          embedA: "",
        },
      ],
    };

    if (categories.length !== maxCat) {
      setCategories(categories.concat(nCategory));
      saveGame();
    }
    setNewCategory("");
    saveGame();
  };

  const getData = async () => {
    let savedData = await window.ipc.getStoredData();
    let parseJSON = JSON.parse(savedData.game);
    console.log(parseJSON);
    setCategories(parseJSON);
  };

  useEffect(() => {
    getData();
  }, []);

  const removeCategory = (id) => {
    const newArr = categories.filter((item, i) => item.id !== id);
    setCategories(newArr);
    setSelectedCategory(template);
    saveGame();
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

  const saveGame = async () => {
    let newSave = {
      game: JSON.stringify(categories),
    };
    await window.ipc.setStoredData(newSave);
  };
  return (
    <div className="max-w-[900px] m-auto text-white p-2">
      <Head>
        <title>Create and Edit</title>
      </Head>
      <div
        id="newGameHeader"
        style={{ color: "black" }}
        className=" flex   align-center justify-between items-center bg-white p-3 mb-2"
      >
        <div className="w-[500px]">
          <h1>Create</h1>
          <p>
            You can add categories by typing in the "add categories" field and
            pressing enter. To remove a category you can do so by pressing the
            '❌' next to the category name. To embed media add a youtube or
            streamable link to either question or answer input fields. Add an
            Image using the 🖼️ and remove it with ❌. Allowed files: jpeg, jpg,
            png, gif.
          </p>
        </div>
        <div className="mr-10">
          <MenuButton text={"Main Menu"} navigate={"/home"} style={"mr-4"} />
          <MenuButton
            text={"Start Game"}
            navigate={"/gameBoard"}
            style={"mr-4"}
          />
          <button onClick={() => saveGame()}>save state</button>
        </div>
      </div>
      <div
        id="newGameCategories"
        className="flex flex-col sm:flex-row mt-4 justify-around"
      >
        <div className="w-full sm:w-1/3">
          <CategoryForm
            formSubmit={createNewCategory}
            inputValue={newCategory}
            inputOnChange={handleCategories}
            categories={categories}
            changeCategory={changeCategory}
            rmCategory={removeCategory}
            selectedCategory={selectedCategory}
          />
        </div>
        <div className="w-full sm:w-2/3">
          <QuestionCluster
            categories={categories}
            setCategories={setCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
