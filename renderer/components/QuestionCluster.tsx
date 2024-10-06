import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const QuestionForm = ({ selectedCategory, setSelectedCategory }) => {
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
    handleSaveChanges();
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
    handleSaveChanges();
  };

  const removeFile = (index, isAnswer) => {
    if (isAnswer) {
      let { value } = imgAnswer;
      value[index] = "";
      setImgAnswer({ value });
    } else {
      let { value } = imgQuestion;
      value[index] = "";
      setImgQuestion({ value });
    }
    handleSaveChanges();
  };

  return (
    <>
      <div className="">
        {selectedCategory.id === null && (
          <div className="p-10">
            <p>Select a category!</p>
          </div>
        )}

        <div className="flex flex-col px-4">
          {selectedCategory.id !== null &&
            selectedCategory.questions.map((q, i) => (
              <div
                key={q.points}
                className="flex flex-col border rounded p-2 mb-4"
              >
                <div className="  mb-2">
                  <h3 className=" text-large py-1 ">Points: {q.points}</h3>
                </div>
                <div className="flex justify-around flex-col sm:flex-row">
                  {/*//Question */}
                  <div className="mb-4">
                    <input
                      className="my-1 p-1 px-2 rounded-sm w-full mb-2"
                      style={{ color: "black" }}
                      placeholder={"Question"}
                      value={question.value[i]}
                      onChange={handleQA(i, false)}
                    />
                    <div className="flex flex-col">
                      <div className="mb-2 flex justify-around sm:justify-between">
                        <button onClick={() => chooseFile(i, false)}>
                          🖼️ add
                        </button>
                        <button onClick={() => removeFile(i, false)}>
                          ❌ remove
                        </button>
                      </div>
                      {imgQuestion.value[i] != "" && (
                        <Image
                          className="ml-auto mr-auto"
                          src={`media-loader:///${imgQuestion.value[i]}`}
                          alt="Logo image"
                          width={150}
                          height={150}
                        />
                      )}
                    </div>
                  </div>
                  {/*//Answer */}
                  <div>
                    <input
                      className="my-1 p-1 px-2 w-full rounded-sm"
                      style={{ color: "black" }}
                      placeholder={"Question"}
                      value={answer.value[i]}
                      onChange={handleQA(i, true)}
                    />
                    <div className="flex flex-col">
                      <div className="mb-2 flex justify-around sm:justify-between">
                        <button onClick={() => chooseFile(i, true)}>
                          🖼️ add
                        </button>
                        <button onClick={() => removeFile(i, true)}>
                          ❌ remove
                        </button>
                      </div>
                      {imgAnswer.value[i] != "" && (
                        <Image
                          className="ml-auto mr-auto"
                          src={`media-loader:///${imgAnswer.value[i]}`}
                          alt="Logo image"
                          width={150}
                          height={150}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
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
