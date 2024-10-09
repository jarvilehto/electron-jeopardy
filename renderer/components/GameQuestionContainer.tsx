const GameQuestionContainer = (props) => {
  const { categories, handleOpenQuestion } = props;

  return (
    <div id="gameBoard" className=" text-center ">
      {categories.map((c) => (
        <div key={c.id} style={{ backgroundColor: "" }}>
          {c.name}
          <div id="questionColumn">
            {c.questions.map((q, i) => (
              <div key={i} className="" id="cardContainerChild">
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
