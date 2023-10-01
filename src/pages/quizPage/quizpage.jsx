import "./quizpage.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../data-context";
import { NavigationPanel } from "../../components/navigation-panel";
// import { MathJax, MathJaxContext } from "better-react-mathjax";
import { MathJax, MathJaxContext } from "better-react-mathjax";


export const QuizPage = () => {
  const [questionTimer, setQuestionTimer] = useState({ min: 5, sec: 0 });
  const [overallTime, setOverallTime] = useState(0);
  const navigate = useNavigate();
  const {
    questions,
    setQuestions,
    useremail,
    currentQuestion,
    setCurrentQuestion,
    selectedOption,
    setSelectedOption,
    time
  } = useData();

  useEffect(() => {
    const interval = setInterval(() => {
      if (questionTimer.sec === 0) {
        if (questionTimer.min === 0) {
          clearInterval(interval);
          // Time's up for this question! Do something here.
          setOverallTime(overallTime + 60);
        } else {
          setQuestionTimer({ min: questionTimer.min - 1, sec: 59 });
        }
      } else {
        setQuestionTimer({ min: questionTimer.min, sec: questionTimer.sec - 1 });
      }
      setOverallTime(prev => ({ min: prev.min, sec: prev.sec + 1 }));
    }, 1000);

    return () => clearInterval(interval);
  }, [questionTimer,overallTime]);

  const markVisited = () => {
    // marks the current question as visited
    let temp = questions;
    temp[currentQuestion].visited = true;
    setQuestions(temp);
    setSelectedOption(questions[currentQuestion]?.userOption);
  };
  const saveAndNextFunction = () => {
    // save the current option in questions array and show next
    let temp = questions;

    temp[currentQuestion].userOption = selectedOption;
    temp[currentQuestion].visited = true;

    if (selectedOption !== -1) {
      temp[currentQuestion].attempted = true;
    } else if (questions[currentQuestion].attempted === true) {
      temp[currentQuestion].attempted = true;
    } else {
      temp[currentQuestion].attempted = false;
    }

    setQuestions(temp);
    setSelectedOption(questions[currentQuestion + 1]?.userOption); //next question
    setOverallTime(overallTime + (60 - questionTimer.sec)); 
    setCurrentQuestion(currentQuestion + 1);
    setQuestionTimer({ min: 1, sec: 0 });
  };
  const getCheckedOption = (option) => {
    //get selected option  from questions array
    if (questions[currentQuestion].userOption !== -1) {
      return questions[currentQuestion].userOption === option;
    } else {
      return option === selectedOption;
    }
  };
  const clearSelectionFunction = () => {
    // clear selection in questions array andf on DOM
    setSelectedOption(-1);
    let temp = questions;
    temp[currentQuestion].userOption = -1;
    temp[currentQuestion].attempted = false;
    setQuestions(temp);
  };
  const saveAndSubmit = () => {
    //submit quiz and get report
    let temp = questions;

    temp[currentQuestion].userOption = selectedOption;
    temp[currentQuestion].visited = true;

    if (selectedOption !== -1) {
      temp[currentQuestion].attempted = true;
    } else if (questions[currentQuestion].attempted === true) {
      temp[currentQuestion].attempted = true;
    } else {
      temp[currentQuestion].attempted = false;
    }

    setQuestions(temp);
    
    setQuestionTimer({ min: 1, sec: 0 });
    navigate("/report", { questionTimer });
  };

  return (
    <MathJaxContext>
   
    <div className="main-quiz-container">
      <h2 className="header">Nioclass Quiz</h2>
      <div className="details-holder">
        {/* time left should change!? */}
        <h3 className="timer">
          Time Left: {time.min < 10 ? "0" + time.min : time.min}:
          {time.sec < 10 ? "0" + time.sec : time.sec}{" "}
          <i class="bi bi-terminal-plus"></i>
        </h3>
        {/* {timer for particular question} */}
        <h3 className="timer">
         Question Time Left: {questionTimer.min < 10 ? "0" + questionTimer.min : questionTimer.min}:
          {questionTimer.sec < 10 ? "0" + questionTimer.sec : questionTimer.sec}{" "}
          <i className="bi bi-terminal-plus"></i>
        </h3>
        <h3 className="user-name-holder">Name: {useremail}</h3>
        {currentQuestion !== 14 && (
          <button className="details-btn" onClick={() => saveAndSubmit()}>
            Save and Submit{" "}
          </button>
        )}
      </div>
      <div className="quiz-container">
        <div className="left">
          <div className="quiz-ques-holder">
          <h3 className="question-number">
              Question {questions[currentQuestion]?._id}.  
            </h3>
          
         
   <MathJax>
   <h3 className="question-statement">
   <MathJax>{questions[currentQuestion]?.question}</MathJax> 
            </h3></MathJax> 
          
           {questions[currentQuestion]?.options.map((option, index) => {
              return (
                <>
                  <h3 className="options">
                    {String.fromCharCode(65 + index)}.{option}{" "}
                    <input
                      type="radio"
                      className="radio-input"
                      name="xyz"
                      id="options"
                      checked={getCheckedOption(option)}
                      value={option}
                      onChange={(e) => setSelectedOption(e.target.value)}
                    />{" "}
                  </h3>
                </>
              );
            })}
          </div>
          <div className="buttons-control">
            <button //navigate to previous question
              className="control-btn"
              onClick={() => {
                if (currentQuestion !== 0) {
                  markVisited(currentQuestion);
                  setCurrentQuestion(currentQuestion - 1);
                }
              }}
            >
              Previous
            </button>{" "}
            
            <button
              className="control-btn"
              onClick={() => clearSelectionFunction()}
            >
              Clear Selection
            </button>
            {currentQuestion === 14 ? (
              <button onClick={() => saveAndSubmit()} className="details-btn">
                Save and Submit{" "}
              </button>
            ) : (
              <button
                className="control-btn"
                onClick={() => saveAndNextFunction()}
              >
                Save and Next{" "}
              </button>
            )}
          </div>
        </div>

        <NavigationPanel />
      </div>
    </div>
    </MathJaxContext>    

  );
};