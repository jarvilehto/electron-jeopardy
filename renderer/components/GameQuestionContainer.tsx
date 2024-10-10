import Image from "next/image";
import SmallNoja from "./makaras/SmallNoja";

const GameQuestionContainer = (props) => {
  const { categories, handleOpenQuestion } = props;
  console.log(categories);

  return (
    <div id="gameBoard" className=" text-center ">
      {categories.map((c) => (
        <div key={c.id} style={{}} className={c.answered ? "black" : ""}>
          {c.name}
          <div id="questionColumn">
            {c.questions.map((q, i) => (
              <div key={i} id="cardContainerChild">
                <button onClick={() => handleOpenQuestion(c.id, q.points)}>
                  {!q.answered && q.points}
                  {q.answered && <SmallNoja />}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameQuestionContainer;
