import Image from "next/image";
import { useState } from "react";

/*
 */

const OpenQuestion = ({
  openQuestion,
  categories,
  contestants,
  setContestants,
  toggleModal,
}) => {
  const findCategory = categories.find((index) => index.id === openQuestion.id);
  let CurrentQuestion = findCategory.questions.find(
    ({ points }) => points === openQuestion.points
  );

  const [showAnswer, setShowAnswer] = useState(false);

  const DetermineEmbed = (url) => {
    if (url.includes("youtube")) {
      const searchURL = new URL(url).searchParams;
      let tester = searchURL.get("v");
      return `https://www.youtube.com/embed/${tester}`;
    } else {
      if (url.includes("streamable")) {
        const searchURL = new URL(url);
        let tester = searchURL.pathname.substring(1);
        return `https://streamable.com/e/${tester}`;
      }
    }
  };

  return (
    <div className="absolute w-full max-w-[1200px] h-3/4 border-2 border-black bg-white text-black">
      <div className="w-full h-full flex flex-col justify-center items-center relative py-4">
        {!showAnswer && (
          <>
            <h1 className="text-3xl text-center" style={{ color: "black" }}>
              {CurrentQuestion.question}
            </h1>
            {CurrentQuestion.embedQ !== "" && (
              <div
                style={{
                  width: "80%",
                  height: "100%",
                }}
                className="flex justify-center items-center"
              >
                <iframe
                  height="90%"
                  src={DetermineEmbed(CurrentQuestion.embedQ)}
                  width="90%"
                  style={{}}
                  className="m-4"
                ></iframe>
              </div>
            )}
            {CurrentQuestion.imgQ !== "" && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
                className="flex items-center justify-center"
              >
                <Image
                  className=""
                  src={`media-loader:///${CurrentQuestion.imgQ}`}
                  alt="Logo image"
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                  width={250}
                  height={150}
                />
              </div>
            )}

            <div className="absolute bottom-0 right-2 text-4xl p-2">
              <button onClick={() => setShowAnswer(!showAnswer)}>✅</button>
              <button>❌</button>
            </div>
          </>
        )}
        {showAnswer && (
          <>
            <h1
              className="text-3xl text-center mt-3"
              style={{ color: "black" }}
            >
              {CurrentQuestion.answer}
            </h1>
            {CurrentQuestion.embedA !== "" && (
              <div
                style={{
                  width: "80%",
                  height: "100%",
                }}
                className="flex justify-center items-center"
              >
                <iframe
                  height="90%"
                  src={DetermineEmbed(CurrentQuestion.embedA)}
                  width="90%"
                  style={{}}
                  className="m-4"
                ></iframe>
              </div>
            )}
            {CurrentQuestion.imgA !== "" && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
                className="flex items-center justify-center p-5"
              >
                <Image
                  className=""
                  src={`media-loader:///${CurrentQuestion.imgA}`}
                  alt="Logo image"
                  style={{ height: "100%", width: "auto" }}
                  width={250}
                  height={150}
                />
              </div>
            )}

            <div className="absolute bottom-0 right-2 text-4xl p-2">
              <button onClick={() => setShowAnswer(!showAnswer)}>⬅️</button>
              <button>🏆</button>
            </div>
          </>
        )}
        <div className="absolute top-0 right-2 text-2xl mr-2">
          <button onClick={() => toggleModal(false)} style={{ color: "black" }}>
            x
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenQuestion;
