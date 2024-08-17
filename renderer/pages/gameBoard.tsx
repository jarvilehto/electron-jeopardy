import { useState } from "react";
import PlaceholderData from "../components/PlaceholderData";
import GameQuestionContainer from "../components/GameQuestionContainer";
import GameHeaderComponent from "../components/GameHeaderComponent";

const QuestionCard = ({ pQ, handleOpenQuestion }) => {
  return (
    <div className="m-4 justify-center  flex wrap flex-col w-[250px] h-[150px] ">
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

const ContestantCard = () => {};

export default function gameBoard() {
  const placeholderQuestions = PlaceholderData;
  const [categories, setCategories] = useState(placeholderQuestions);
  const [openQuestion, setOpenQuestion] = useState({ id: 0, points: "" });
  const [modal, setModal] = useState(false);
  const [contestants, setContestants] = useState([]);
  const [contestant, setContestant] = useState("");
  // USE this + concat to add contestants
  const newContestant = {
    id: String(contestants.length),
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

  const handleContestantInput = (e) => {
    setContestant(e.target.value);
  };

  const createContestant = (event) => {
    event.preventDefault();
    const newContestant = {
      id: String(contestants.length),
      name: contestant,
      points: 0,
    };
    setContestants(contestants.concat(newContestant));
    setContestant("");
  };
  return (
    <>
      <div className="p-5 relative">
        {modal && (
          <OpenQuestion
            toggleModal={setModal}
            openQuestion={openQuestion}
            categories={categories}
          />
        )}
        <GameHeaderComponent />
        <GameQuestionContainer
          categories={categories}
          handleOpenQuestion={handleOpenQuestion}
        />
        <div id="gameContestants" className=" p-2 my-5 text-white">
          <div className="flex flex-row items-center justify-between border-b pb-3">
            <h1>Contestants</h1>
            <form onSubmit={createContestant}>
              <input
                style={{ color: "black" }}
                className="px-2"
                type="text"
                placeholder="cool name..."
                value={contestant}
                onChange={handleContestantInput}
              />
            </form>
          </div>
          <div id="contestants-game">
            {contestants.map((contestant, i) => (
              <div key={i}>
                <h1>{contestant.name}</h1>
                <h2>{contestant.points}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

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
