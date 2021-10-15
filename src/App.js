import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useGlobalContext } from "./context"; // THIS IS A FUNCTION and not  a component

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    waiting,
    loading,
    index,
    questions,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();

  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }
  /* both might be false Initially */
  //If waiting is false, that is form is filled and loading is false, then we destructure and display
  const { question, incorrect_answers, correct_answer } = questions[index];

  // simplicity, we make an answer array

  // const answers = [...incorrect_answers, correct_answer];

  // randomizer
  let answers = [...incorrect_answers];
  const tempIndex = Math.trunc(Math.random() * 4);

  if (tempIndex === 3) {
    // push to last
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]); //duplicate
    answers[tempIndex] = correct_answer;
  }
  return (
    <main>
      <h2>
        Quiz <span>Mania</span>.
      </h2>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          Correct Answers: {correct}/{index}
        </p>
        <article className="container">
          {/* The issue is questions are in HTML, cannot render */}
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  onClick={() => checkAnswer(answer === correct_answer)}
                  className="answer-btn"
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          Next quest
        </button>
      </section>
      <footer>
        &#169;
        <a href="https://www.linkedin.com/in/venkateshkamath08/">venkzy </a>
        for Quiz <span>Mania</span>.
      </footer>
    </main>
  );
}

export default App;
