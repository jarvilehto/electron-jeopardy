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
  const { categories, openQuestion } = props;
  const CurrentQuestion = categories[openQuestion.id].questions.find(
    ({ points }) => points === openQuestion.points
  );
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="absolute top-10 h-[300px] left-32 right-32 bg-white text-black flex flex-col justify-center items-center">
      {!showAnswer && (
        <h1 style={{ color: "black" }}>{CurrentQuestion.question}</h1>
      )}
      {showAnswer && (
        <h1 style={{ color: "black" }}>{CurrentQuestion.answer}</h1>
      )}
      <button
        style={{ color: "black" }}
        onClick={() => props.toggleModal(false)}
      >
        close
      </button>
      <button
        style={{ color: "black" }}
        onClick={() => setShowAnswer(!showAnswer)}
      >
        Correct
      </button>
      <button style={{ color: "black" }}>False</button>
    </div>
  );
};

export default function gameBoard() {
  const placeholderQuestions = PlaceholderData;
  const [categories, setCategories] = useState(placeholderQuestions);
  const [openQuestion, setOpenQuestion] = useState({ id: 0, points: "" });
  const [modal, setModal] = useState(false);
  const [contestants, setContestants] = useState([]);

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
    <div className="h-full w-full relative text-white">
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
        {categories.map((pQ) => (
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
