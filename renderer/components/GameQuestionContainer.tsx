const GameQuestionContainer = (props) => {
  const { categories, handleOpenQuestion } = props;

  return (
    <div id="gameBoard" className=" text-center ">
      {categories.map((c) => (
        <div key={c.id} style={{}} className={c.answered ? "black" : ""}>
          {c.name}
          <div id="questionColumn">
            {c.questions.map((q, i) => (
              <div
                key={i}
                id="cardContainerChild"
                className={c.answered ? "bg-white" : ""}
              >
                <button onClick={() => handleOpenQuestion(c.id, q.points)}>
                  {q.points}
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
