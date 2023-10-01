import "./report.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck,faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useData } from "../../data-context";
import { MathJax, MathJaxContext } from "better-react-mathjax";
// import { NativeModules } from "react-native";
// import RNRestart from 'react-native-restart'; 
export const Report = () => {
  const location = useLocation();
  const { questionTimer } = location.state || {};
  const { questions, useremail,Reset} = useData();
  console.log(questions);
  const score = questions.reduce((total, ques) => {
    if (ques.correct_answer === ques.userOption) {
      return total + 1;
    } else {
      return total;
    }
  }, 0);
 

  return (
    <div className="main-quiz-container">
      <h2 className="header">
        <span className="my-quiz-logo">Nioclass</span>-{" "}
        <span className="quiz-logo">QUIZ</span>
      </h2>
      <div className="details-holder">
        <h3 className="timer">Obtained Score: {score}/15 </h3>
        <h3 className="user-name-holder">Name:{useremail}</h3>
        <h3>Total Time Taken: 02:47</h3>
        
      </div>
      {questionTimer && (
        <h3 className="timer">
          Time Left: {questionTimer.min < 10 ? "0" + questionTimer.min : questionTimer.min}:
          {questionTimer.sec < 10 ? "0" + questionTimer.sec : questionTimer.sec}{" "}
          <i className="bi bi-terminal-plus"></i>
        </h3>
      )}
      <div className="report-container">
        <div className="report-holder-top">
        Correct Option: <FontAwesomeIcon className="correct-option" icon={faCheck} ></FontAwesomeIcon>
        <br/>
        Your Answer: <FontAwesomeIcon className="user-option" icon={faCheckDouble}></FontAwesomeIcon>
        </div>
        
        <div className="report-holder">
          {questions.map((ques, index) => {
            return (
              
              <div className="questions-holder">
                <div className="single-question">
                  {index + 1}.{ques.question}
                </div>
                <div>
                  <h4>37 sec</h4>
                </div>
                <MathJaxContext>
                  <MathJax>
                <div>
                  {ques.options.map((option, index) => {
                    return (
                      <div className = "option">
                        {String.fromCharCode(65 + index)}.{option}
                        {option === ques.correct_answer && (
                          <FontAwesomeIcon className="correct-option" icon={faCheck} ></FontAwesomeIcon>
                        )}
                        {option === ques.userOption && <FontAwesomeIcon className="user-option" icon={faCheckDouble}></FontAwesomeIcon>  }
                      </div>
                      
                    );
                  })}
                </div>
                </MathJax>
                </MathJaxContext>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
