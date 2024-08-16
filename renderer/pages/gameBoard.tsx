import { useState } from "react";
import PlaceholderData from "../components/PlaceholderData";
import MenuButton from "../components/MenuButton";

const QuestionCard = ({ pQ, handleOpenQuestion }) => {
  return (
    <div className="m-4 justify-center  flex wrap flex-col ">
      <h2>{pQ.name}</h2>
      {pQ.questions.map((q, i) => (
        <div key={i} className="border boder-round  my-3 p-3 text-center">
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
      <div
        id="Header"
        className="flex flex-row justify-center content-center wrap w-full"
      >
        <div className="">
          <h1>Jeopardy</h1>
          <MenuButton text={"return"} navigate={"/newGame"} />
        </div>
      </div>
      <div
        id="Game"
        className="flex flex-row justify-center content-center wrap  w-full"
      >
        {placeholderQuestions.map((pQ) => (
          <QuestionCard
            key={pQ.id}
            pQ={pQ}
            handleOpenQuestion={handleOpenQuestion}
          />
        ))}
      </div>
      <div
        id="Contestants"
        className="flex flex-row justify-center content-center wrap w-full"
      >
        <div className="">
          <h1>Contestants</h1>
        </div>
      </div>
    </div>
  );
}
