import { useEffect, useState } from "react";
import PlaceholderData from "../components/PlaceholderData";
import GameQuestionContainer from "../components/GameQuestionContainer";
import GameHeaderComponent from "../components/GameHeaderComponent";
import GameContestantContainer from "../components/GameContestantContainer";
import OpenQuestion from "../components/OpenQuestion";

export default function gameBoard() {
  const [categories, setCategories] = useState([]);
  const [openQuestion, setOpenQuestion] = useState({ id: 0, points: "" });
  const [modal, setModal] = useState(false);
  const [contestants, setContestants] = useState([]);
  const [contestant, setContestant] = useState("");

  const getData = async () => {
    let storedData: any = await window.ipc.getStoredData();
    let parseJSON = JSON.parse(storedData.game);
    const updatedCategories = parseJSON.map((category) => ({
      ...category,
      questions: category.questions.map((question) => ({
        ...question,
        answered: question.answered ?? false, // If undefined, set to false
      })),
    }));
    setCategories(updatedCategories);
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

  const setAnswered = (categoryId, points) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              questions: cat.questions.map((question) => {
                return question.points === points
                  ? { ...question, answered: !question.answered }
                  : question;
              }),
            }
          : cat
      )
    );
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
