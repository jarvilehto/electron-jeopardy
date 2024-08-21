import { useEffect, useState } from "react";

/*
  WIP: ADD ABILITY TO DO EMBED / PICTURE ANSWERS AND QUESTIONS
  TODO: Multiple answers
  TODO: Add Embed files / Pictures to questions and answers
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

  const handleSaveChanges = () => {
    const catSave = selectedCategory;
    catSave.questions.map((q, i) => {
      q.question = question.value[i];
      q.answer = answer.value[i];
    });
    setSelectedCategory(catSave);
  };

  const testFunc = () => {
    let qValue = question.value;
    let aValue = answer.value;
    selectedCategory.questions.map((q, i) => {
      qValue[i] = q.question;
      aValue[i] = q.answer;
    });
    setQuestion({ value: qValue });
    setAnswer({ value: aValue });
  };

  useEffect(() => {
    testFunc();
  }, [selectedCategory]);

  const handleQ = (index) => (event) => {
    let { value } = question;
    value[index] = event.target.value;
    setQuestion({ value });
  };

  const handleA = (index) => (event) => {
    let { value } = answer;
    value[index] = event.target.value;
    setAnswer({ value });
  };

  return (
    <>
      <div className="flex flex-row justify-around wrap">
        {selectedCategory.id !== null &&
          selectedCategory.questions.map((q, i) => (
            <div
              key={q.points}
              className=" my-4 mx-2 p-1 flex flex-col justify-center items-center"
            >
              <div className="border-b w-full mb-2">
                <h3 className="text-center text-xl py-1">{q.points}</h3>
              </div>
              <div className="flex flex-col wrap">
                {/*
                  * Add radio buttons for 
                  - Media Question/Answer
                */}
                <input
                  className="my-1 p-1 px-2 rounded"
                  style={{ color: "black" }}
                  placeholder={"Question"}
                  value={question.value[i]}
                  onChange={handleQ(i)}
                />
                <input
                  className="my-1 p-1 px-2 rounded"
                  style={{ color: "black" }}
                  placeholder={"Answer"}
                  value={answer.value[i]}
                  onChange={handleA(i)}
                />
              </div>
            </div>
          ))}
      </div>
      {selectedCategory.id !== null && (
        <div className="flex flex-row-reverse p-6">
          <button
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
