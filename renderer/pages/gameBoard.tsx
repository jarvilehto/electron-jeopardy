import { useEffect, useState } from "react";
import PlaceholderData from "../components/PlaceholderData";
import GameQuestionContainer from "../components/GameQuestionContainer";
import GameHeaderComponent from "../components/GameHeaderComponent";
import GameContestantContainer from "../components/GameContestantContainer";
import OpenQuestion from "../components/OpenQuestion";

/*
TODO: IMAGES / MULTI QUESTION / ANSWER / EMBEDS
TODO: POINT SYSTEM - Add points inside card, modify and add custom points outside of card
TODO: ADD SOUND WHEN WRONG ANSWER
TODO: ADD SOUND WHEN CORRECT ANSWER
TODO: GAMECONTESTANTS INTO A COMPONENT
*/

const AnsweredQuestionCard = () => {};

const ContestantCard = () => {};

export default function gameBoard() {
  const [categories, setCategories] = useState([]);
  const [openQuestion, setOpenQuestion] = useState({ id: 0, points: "" });
  const [modal, setModal] = useState(false);
  const [contestants, setContestants] = useState([]);
  const [contestant, setContestant] = useState("");

  const getData = async () => {
    let storedData: any = await window.ipc.getStoredData();
    let parseJSON = JSON.parse(storedData.game);
    setCategories(categories.concat(parseJSON));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleOpenQuestion = (id: number, points: string) => {
    setModal(!modal);
    const openQuestion = {
      id: id,
      points: points,
    };
    setOpenQuestion(openQuestion);
  };

  const setAnswered = (id) => {
    // ADD STUFF TO MAKE THE ANSWER GO FALSE! :)
    // RENDER BG COLOR AS RED THEN! :)
    id.answered = !id.answered;
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
      <div className="">
        <GameHeaderComponent />
        {modal && (
          <OpenQuestion
            toggleModal={setModal}
            openQuestion={openQuestion}
            categories={categories}
            contestants={contestant}
            setContestants={setContestant}
            setAnswered={setAnswered}
          />
        )}
        {!modal && (
          <GameQuestionContainer
            categories={categories}
            handleOpenQuestion={handleOpenQuestion}
          />
        )}
        <GameContestantContainer
          createContestant={createContestant}
          contestant={contestant}
          handleContestantInput={handleContestantInput}
          contestants={contestants}
        />
      </div>
    </>
  );
}
