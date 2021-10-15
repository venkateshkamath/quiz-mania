import axios from "axios"; //then set this thing
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  gk: 9,
  film: 11,
  television: 14,
  history: 23,
  politics: 24,
  art: 25,
  music: 12,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";
const tempUrl =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]); // array of questions
  const [index, setIndex] = useState(0); // Index of the questions
  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState(0); // 0 correct
  const [isModalOpen, setIsModalOpen] = useState(false);
  //quizm for the form

  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  // handle Change and handle Submit

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    //change the respective state dynamically, see that other vals aren't wiped
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;

    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    fetchQuestions(url);
  };

  // nextQuestion function

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = 1 + oldIndex;
      if (index > questions.length - 1) {
        openModal(); // open modal and then return
        return 0;
      } else return index;
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCorrect(0); // end game/restart
    setIsModalOpen(false);
    setWaiting(true);
  };
  const checkAnswer = (value) => {
    if (value) setCorrect((currentVal) => currentVal + 1); // taking in the current value and then incrementing it
    nextQuestion();
  };
  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setError(false);
        setQuestions(data);
        setLoading(false);
        setWaiting(false); // we got the questions
      } else {
        setError(true);
        setWaiting(true); // still at waiting window
      }
    } else {
      setWaiting(true);
    }
  };

  // useEffect(() => {
  //   fetchQuestions(tempUrl);
  // }, []); // re render on Loading

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        error,
        correct,
        isModalOpen,
        quiz,
        nextQuestion,
        checkAnswer,
        closeModal,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use, otherwise won't work
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppContext, AppProvider };
