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
      <div id="Game" className="flex flex-row justify-center wrap">
        {placeholderQuestions.map((pQ) => (
          <div key={pQ.id} className="m-4">
            <h2>{pQ.name}</h2>
            {pQ.questions.map((q, i) => (
              <div key={i}>
                <button>{q.points}</button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div id="Contestants"></div>
    </div>
  );
}
