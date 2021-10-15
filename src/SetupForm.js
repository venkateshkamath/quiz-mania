import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  // destructuring
  const { error, quiz, handleSubmit, handleChange } = useGlobalContext();

  return (
    <main><h2>Quiz <span>Mania</span>.</h2> 
      <section className="quiz quiz-small">
        <form className="setup-form">
          <h2>Setup your Quiz</h2>
          {/* amount */}
          <div className="form-control">
            <label htmlFor="amount">Number of Questions</label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="form-input"
              onChange={handleChange}
              value={quiz.amount}
              min={1}
              max={20}
            />
          </div>
          {/* Category */}
          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              onChange={handleChange}
              className="form-input"
              value={quiz.category}
            >
              <option value="sports">Sports</option>
              <option value="gk">General Knowledge</option>
              <option value="film">Film</option>
              <option value="television">Television</option>
              <option value="music">Music</option>

              <option value="history">History</option>
              <option value="politics">Politics</option>
              <option value="art">Art</option>
            </select>
          </div>
          {/* difficulty */}
          <div className="form-control">
            <label htmlFor="difficulty">difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              onChange={handleChange}
              className="form-input"
              value={quiz.difficulty}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          {error && (
            <p className="error">
              Cannot generate quiz, please try again with diffferent inputs.
            </p>
          )}
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </section>
      <footer>&#169; 
        <a href="https://www.linkedin.com/in/venkateshkamath08/">venkzy </a>
         for Quiz <span>Mania</span>.
      </footer>
    </main>
  );
};

export default SetupForm;
