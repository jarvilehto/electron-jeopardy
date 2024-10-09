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
    <>
      {!showAnswer && (
        <div
          id=""
          className=" text-center max-w-[1200px] h-[480px] flex m-auto flex-col items-center justify-center"
        >
          <h1
            className="text-3xl text-center"
            style={{ color: "white", fontWeight: "bold" }}
          >
            {CurrentQuestion.question}
          </h1>
          {CurrentQuestion.embedQ !== "" && (
            <div
              style={{
                width: "100%",
                height: "100%",
                maxWidth: "500px",
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
            <Image
              src={`media-loader:///${CurrentQuestion.imgQ}`}
              alt="Logo image"
              fill={false}
              objectFit="none"
              objectPosition="50% 50%"
              style={{
                height: "auto",
                width: "auto",
                maxWidth: "800px",
                maxHeight: "480px",
              }}
              width={450}
              height={300}
            />
          )}
        </div>
      )}
      {showAnswer && (
        <>
          <div
            id=""
            className="  text-center max-w-[1200px] h-[480px] flex m-auto flex-col items-center justify-center"
          >
            <h1
              className="text-3xl text-center"
              style={{ color: "white", fontWeight: "bold" }}
            >
              {CurrentQuestion.answer}
            </h1>
            {CurrentQuestion.embedA !== "" && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  maxWidth: "800px",
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
              <Image
                src={`media-loader:///${CurrentQuestion.imgA}`}
                alt="Logo image"
                fill={false}
                objectFit="none"
                objectPosition="50% 50%"
                style={{
                  height: "auto",
                  width: "auto",
                  maxWidth: "800px",
                  maxHeight: "480px",
                }}
                width={450}
                height={300}
              />
            )}
          </div>
        </>
      )}

      <div className=" right-2 text-4xl p-2 flex w-full flex justify-around">
        <div>
          <button onClick={() => setShowAnswer(!showAnswer)}>✅</button>
          <button onClick={() => setShowAnswer(!showAnswer)}>⬅️</button>
        </div>

        <div>
          <button>🏆</button>
        </div>
      </div>

      <div className="absolute top-0 right-2 text-2xl mr-2">
        <button onClick={() => toggleModal(false)} style={{ color: "white" }}>
          x
        </button>
      </div>
    </>
  );
};

export default OpenQuestion;

/*
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
            <div className="">
              <Image
                src={`media-loader:///${CurrentQuestion.imgQ}`}
                alt="Logo image"
                fill={false}
                objectFit="contain"
                width={500}
                height={500}
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
          <h1 className="text-3xl text-center mt-3" style={{ color: "black" }}>
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
            <div className="flex items-center justify-center p-5 ">
              <Image
                className=""
                src={`media-loader:///${CurrentQuestion.imgA}`}
                alt="Logo image"
                fill={true}
                objectFit="contain"
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

*/
