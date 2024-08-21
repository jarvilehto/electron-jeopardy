import { useEffect, useState } from "react";
import PlaceholderData from "../components/PlaceholderData";
import GameQuestionContainer from "../components/GameQuestionContainer";
import GameHeaderComponent from "../components/GameHeaderComponent";

/*
TODO: IMAGES / MULTI QUESTION / ANSWER / EMBEDS
TODO: POINT SYSTEM - Add points inside card, modify and add custom points outside of card
TODO: ADD SOUND WHEN WRONG ANSWER
TODO: ADD SOUND WHEN CORRECT ANSWER
TODO: GAMECONTESTANTS INTO A COMPONENT
*/

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
  const [categories, setCategories] = useState([]);
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

  const getData = async () => {
    let lol = await window.ipc.getStoredData("2");
    console.log(lol);
    let parseJSON = JSON.parse(lol.game);
    setCategories(categories.concat(parseJSON));
    console.log("parseData", parseJSON);
  };

  useEffect(() => {
    getData();
  }, []);

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
            contestants={contestant}
            setContestants={setContestant}
          />
        )}
        <GameHeaderComponent />
        <GameQuestionContainer
          categories={categories}
          handleOpenQuestion={handleOpenQuestion}
        />
        <div id="gameContestants" className=" p-2 my-5 bg-white">
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
          <div id="contestants-game" className="w-full">
            {contestants.map((contestant, i) => (
              <div
                key={i}
                className="flex flex-col justify-center items-center align-center"
              >
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

  const findCategory = categories.find((index) => index.id === openQuestion.id);

  let CurrentQuestion = findCategory.questions.find(
    ({ points }) => points === openQuestion.points
  );

  console.log("CurrentQuestion", CurrentQuestion);

  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="absolute border-2 border-black top-28 h-[500px] left-32 right-32 bg-white text-black">
      <div className="w-full h-full flex flex-col justify-center items-center relative">
        {!showAnswer && (
          <>
            <h1 className="text-6xl" style={{ color: "black" }}>
              {CurrentQuestion.question}
            </h1>
            <div className="absolute bottom-0 right-2 text-4xl p-2">
              <button onClick={() => setShowAnswer(!showAnswer)}>✅</button>
              <button>❌</button>
            </div>
          </>
        )}
        {showAnswer && (
          <>
            <h1 className="text-6xl" style={{ color: "black" }}>
              {CurrentQuestion.answer}
            </h1>
            <div className="absolute bottom-0 right-2 text-4xl p-2">
              <button>🏆</button>
            </div>
          </>
        )}
        <div className="absolute top-0 right-2 text-2xl mr-2">
          <button onClick={() => props.toggleModal(false)}>x</button>
        </div>
      </div>
    </div>
  );
};
