import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

/*
  WIP: ADD ABILITY TO DO EMBED / PICTURE ANSWERS AND QUESTIONS
  TODO: Multiple answers
  //TODO: Add Embed files / Pictures to questions and answers
*/

const QuestionForm = ({
  selectedCategory,
  setSelectedCategory,
  categories,
  setCategories,
}) => {
  const [question, setQuestion] = useState({
    value: { 0: "", 1: "", 2: "", 3: "", 4: "" },
  });
  const [answer, setAnswer] = useState({
    value: { 0: "", 1: "", 2: "", 3: "", 4: "" },
  });

  const [imgQuestion, setImgQuestion] = useState({
    value: { 0: "", 1: "", 2: "", 3: "", 4: "" },
  });
  const [imgAnswer, setImgAnswer] = useState({
    value: { 0: "", 1: "", 2: "", 3: "", 4: "" },
  });

  const handleSaveChanges = () => {
    const catSave = selectedCategory;
    toast.success("Category Saved!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    catSave.questions.map((q, i) => {
      q.question = question.value[i];
      q.answer = answer.value[i];
      q.imgQ = imgQuestion.value[i];
      q.imgA = imgAnswer.value[i];
    });
    setSelectedCategory(catSave);
  };

  const testFunc = () => {
    let qValue = question.value;
    let aValue = answer.value;
    let imgQValue = imgQuestion.value;
    let imgAValue = imgAnswer.value;
    selectedCategory.questions.map((q, i) => {
      qValue[i] = q.question;
      aValue[i] = q.answer;
      imgQValue[i] = q.imgQ;
      imgAValue[i] = q.imgA;
    });
    setQuestion({ value: qValue });
    setAnswer({ value: aValue });
    setImgQuestion({ value: imgQValue });
    setImgAnswer({ value: imgAValue });
  };

  useEffect(() => {
    testFunc();
  }, [selectedCategory]);

  const handleQA = (index, isAnswer) => (event) => {
    if (isAnswer) {
      let { value } = answer;
      value[index] = event.target.value;
      setAnswer({ value });
    } else {
      let { value } = question;
      value[index] = event.target.value;
      setQuestion({ value });
    }
  };

  const chooseFile = async (index, isAnswer) => {
    const testRes = await window.ipc.openFile();
    if (isAnswer) {
      let { value } = imgAnswer;
      value[index] = testRes;
      setImgAnswer({ value });
    } else {
      let { value } = imgQuestion;
      value[index] = testRes;
      setImgQuestion({ value });
    }
  };

  return (
    <>
      <div className="flex flex-row justify-around wrap">
        {selectedCategory.id === null && (
          <div className="p-10">
            <p>Select a category!</p>
          </div>
        )}
        {selectedCategory.id !== null &&
          selectedCategory.questions.map((q, i) => (
            <div
              key={q.points}
              className=" my-4 mx-2 p-1 flex flex-col justify-center items-center"
            >
              <div className="border-b w-full mb-2">
                <h3 className="text-center text-xl py-1">{q.points}</h3>
              </div>
              <div>
                <Image
                  className="ml-auto mr-auto"
                  src={`media-loader:///${imgQuestion.value[i]}`}
                  alt="Logo image"
                  width={100}
                  height={100}
                />
                <button onClick={() => chooseFile(i, false)}>
                  Add Question Image
                </button>
                <Image
                  className="ml-auto mr-auto"
                  src={`media-loader:///${imgAnswer.value[i]}`}
                  alt="Logo image"
                  width={256}
                  height={256}
                />
                <button onClick={() => chooseFile(i, true)}>
                  Add Answer Image
                </button>
              </div>
              <div className="flex flex-col wrap">
                <input
                  className="my-1 p-1 px-2 rounded"
                  style={{ color: "black" }}
                  placeholder={"Question"}
                  value={question.value[i]}
                  onChange={handleQA(i, false)}
                />
                <input
                  className="my-1 p-1 px-2 rounded"
                  style={{ color: "black" }}
                  placeholder={"Answer"}
                  value={answer.value[i]}
                  onChange={handleQA(i, true)}
                />
              </div>
            </div>
          ))}
      </div>
      {selectedCategory.id !== null && (
        <div className="flex flex-row-reverse p-6">
          <button
            id="hover-button"
            className="border p-2 rounded px-5"
            onClick={() => handleSaveChanges()}
          >
            Save
          </button>
        </div>
      )}
    </>
  );
};

const QuestionCluster = ({
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <QuestionForm
      categories={categories}
      setCategories={setCategories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
  );
};

export default QuestionCluster;
