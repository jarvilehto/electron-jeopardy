import { useState } from "react";
import PlaceholderData from "../components/PlaceholderData";

const QuestionCard = ({ pQ, handleOpenQuestion }) => {
  return (
    <div className="m-4">
      <h2>{pQ.name}</h2>
      {pQ.questions.map((q, i) => (
        <div key={i}>
          <button onClick={() => handleOpenQuestion(pQ.id, q.points)}>
            {q.points}
          </button>
        </div>
      ))}
    </div>
  );
};
const AnsweredQuestionCard = () => {};

const OpenQuestion = (props) => {
  return (
    <div className="absolute top-10 h-[300px] left-32 right-32   ">
      <p>openQuestion</p>
      <button onClick={() => props.toggleModal(false)}>close</button>
    </div>
  );
};

export default function gameBoard() {
  const [categories, setCategories] = useState();
  const [openQuestion, setOpenQuestion] = useState({ id: 0, points: "" });
  const [modal, setModal] = useState(false);
  const [contestants, setContestants] = useState([]);
  const placeholderQuestions = PlaceholderData;

  // USE this + concat to add contestants
  const contestant = {
    name: "",
    points: "",
  };

  const saveGameState = () => {};

  const handleOpenQuestion = (id: number, points: string) => {
    setModal(!modal);
    const openQuestion = {
      id: id,
      points: points,
    };
    setOpenQuestion(openQuestion);
  };

  return (
    <div className="h-full w-full relative">
      {modal && (
        <OpenQuestion
          toggleModal={setModal}
          openQuestion={openQuestion}
          categories={categories}
        />
      )}
      <div id="Header"></div>
      <div id="Game" className="flex flex-row justify-center wrap">
        {placeholderQuestions.map((pQ) => (
          <QuestionCard
            key={pQ.id}
            pQ={pQ}
            handleOpenQuestion={handleOpenQuestion}
          />
        ))}
      </div>
      <div id="Contestants"></div>
    </div>
  );
}
