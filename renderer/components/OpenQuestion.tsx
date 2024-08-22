import { useState } from "react";

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

export default OpenQuestion;
