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
  const [games, setGames] = useState([]);
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
        { points: 100, question: "", answer: "", answered: false },
        { points: 200, question: "", answer: "", answered: false },
        { points: 300, question: "", answer: "", answered: false },
        { points: 400, question: "", answer: "", answered: false },
        { points: 500, question: "", answer: "", answered: false },
      ],
    };

    if (categories.length !== maxCat) {
      setCategories(categories.concat(nCategory));
    }
    setNewCategory("");
  };

  const getData = async () => {
    let savedData = await window.ipc.getStoredData();
    let parseJSON = JSON.parse(savedData.game);
    console.log(parseJSON);
    setCategories(parseJSON);
    setGames(parseJSON);
  };

  useEffect(() => {
    getData();
  }, []);

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

  const saveGame = async () => {
    //TODO: CHECK FOR PRE EXISTING SAVE?
    let newSave = {
      //id: Math.floor(Math.random() * 9000) + 1000,
      game: JSON.stringify(categories),
    };
    let test = await window.ipc.setStoredData(newSave);
    toast.success("Game Saved!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    console.log(test);
  };

  return (
    <div className="max-w-[1200px] m-auto text-white">
      <Head>
        <title>Create and Edit</title>
      </Head>
      <div
        id="newGameHeader"
        style={{ color: "black" }}
        className=" flex   align-center justify-between items-center bg-white p-3 mb-2"
      >
        <h1 className="text-4xl text-bolder">Create and Edit</h1>
        <div className="mr-10">
          <button>Load Save</button>
          <MenuButton text={"Start Game"} navigate={"/gameBoard"} />
          <button onClick={() => saveGame()}>save state</button>
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
      <ToastContainer />
    </div>
  );
}
