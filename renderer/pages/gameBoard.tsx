/*
TODO:
TODO:
TODO: Create a board, populate with placeholder data
TODO: Contestants: names + points 

*/

import { useState } from "react";
import PlaceholderData from "../components/PlaceholderData";

const questionCard = () => {};
const answeredQuestionCard = () => {};

const openQuestion = (porps) => {};

export default function gameBoard() {
  const [categories, setCategories] = useState();
  const [openQuestion, setOpenQuestion] = useState([]);
  const [contestants, setContestants] = useState([]);
  const placeholderQuestions = PlaceholderData;

  // USE this + concat to add contestants
  const contestant = {
    name: "",
    points: "",
  };

  const saveGameState = () => {};

  return (
    <div className="h-full w-full">
      <div className="hidden">Open Question</div>
      <div id="Header"></div>
      <div id="Game" className="flex flex-row justify-center">
        <div key={placeholderQuestions[0].id} className="m-4">
          <h2>{placeholderQuestions[0].name}</h2>
          {placeholderQuestions[0].questions.map((q, i) => (
            <div key={i}>{q.question}</div>
          ))}
        </div>
        <div className="m-4">
          <h2>Category name</h2>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>
        <div className="m-4">
          <h2>Category name</h2>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>
        <div className="m-4">
          <h2>Category name</h2>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>
        <div className="m-4">
          <h2>Category name</h2>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>
        <div className="m-4">
          <h2>Category name</h2>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>
        <div className="m-4">
          <h2>Category name</h2>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>
      </div>
      <div id="Contestants"></div>
    </div>
  );
}
