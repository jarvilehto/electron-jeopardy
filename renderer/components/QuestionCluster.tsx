import { useState } from "react";

const QuestionForm = ({
  selectedCategory,
  setSelectedCategory,
  categories,
  setCategories,
}) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleQ = (event) => {
    setQuestion(event.target.value);
  };

  const handleA = (event) => {
    setAnswer(event.target.value);
  };

  return (
    <div>
      {selectedCategory.id !== null &&
        selectedCategory.questions.map((q) => (
          <div key={q.points} className="my-4 mx-1 p-1">
            <h3>Question points: {q.points}</h3>
            <div className="flex flex-col">
              <input />
            </div>
          </div>
        ))}
    </div>
  );
};

const QuestionCluster = ({
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const handleSaveChanges = () => {
    const catSave = selectedCategory;
    catSave.questions.filter((x) => {
      if (x.points === 100) {
        x.answer = "test";
      }
    });
    setSelectedCategory(catSave);
  };

  return (
    <div>
      <div>
        <div>
          <h2>Questio: Selected {selectedCategory.name}</h2>
        </div>
        <div>
          <div>
            <p>questions</p>
            <button onClick={() => handleSaveChanges()}>save</button>
          </div>

          <QuestionForm
            categories={categories}
            setCategories={setCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCluster;
