import { useState } from "react";

/*

TODO: MP3 UPLOAD

*/

const OpenQuestion = (props) => {
  const { categories, openQuestion } = props;

  const findCategory = categories.find((index) => index.id === openQuestion.id);

  let CurrentQuestion = findCategory.questions.find(
    ({ points }) => points === openQuestion.points
  );

  /*
    Use this to test 
    https://www.youtube.com/watch?v=W7MrDt_NPFk normal youtube link 
    https://www.youtube.com/embed/W7MrDt_NPFk

    "https://streamable.com/e/hodezr" <- e means embed 

src="https://www.youtube.com/embed/W7MrDt_NPFk


  
  */
  const DetermineEmbed = () => {
    let test = CurrentQuestion.question.includes("youtube");
    if (test) {
      const searchURL = new URL(CurrentQuestion.question).searchParams;
      let tester = searchURL.get("v");
      return `https://www.youtube.com/embed/${tester}`;
    } else {
      const searchURL = new URL(CurrentQuestion.question);
      let tester = searchURL.pathname.substring(1);
      return `https://streamable.com/e/${tester}`;
    }
  };

  console.log("CurrentQuestion", CurrentQuestion);
  DetermineEmbed();

  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="absolute border-2 border-black top-28 h-[500px] left-32 right-32 bg-white text-black">
      <div className="w-full h-full flex flex-col justify-center items-center relative">
        {!showAnswer && (
          <>
            <h1 className="text-6xl" style={{ color: "black" }}>
              {/*CurrentQuestion.question*/}
            </h1>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                paddingBottom: "56,250%",
              }}
            >
              <iframe
                height="100%"
                src={DetermineEmbed()}
                width="100%"
                style={{
                  border: "none",
                  width: "100",
                  height: "100%",
                  position: "absolute",
                  left: "0px",
                  top: "0px",
                  overflow: "hidden",
                }}
              ></iframe>
            </div>
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
