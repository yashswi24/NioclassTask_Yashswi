import {useContext,createContext,useState,useEffect} from "react"
import { useNavigate } from "react-router-dom";




export const DataContext = createContext();

export const DataProvider = ({children}) =>{

    const navigate = useNavigate();

    const [questions,setQuestions] =useState([]); //contains all questions
    const [currentQuestion,setCurrentQuestion] = useState(0); // holds current question index
    const [useremail,setUseremail] = useState(""); // holds user information
    const [selectedOption,setSelectedOption] = useState(-1); // holds user selected option
    const [time,setTime] = useState({min:39,sec:59}) //timer
    var updateMin = time.min,updateSec=time.sec; // to update time
    var refresh;

    const startTimer = () =>{
        run();
        refresh =  setInterval(run,1000)
    }



    const run =() =>{  //callback to run timer
        
        console.log("Running")
        if(updateMin ===0 && updateSec===0){
            clearInterval(refresh);
            refresh=null;
            navigate("/report");
        }
        if(updateSec === 0){
            updateMin--;
            updateSec = 59;
        }
         
        updateSec--;
        return setTime({min:updateMin,sec:updateSec})
    }
   
  
    

   
    // const getData = (QuestionID) => {
    //     // Construct the URL using the provided QuestionID
    //     const url = `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=AreaUnderTheCurve_2`;
        
    //     // Fetch data from the constructed URL
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => {
    //             setQuestions(data.results.map((ques, index) => {
    //                 let options = [];
    //                 options.push(...ques?.incorrect_answers)
    //                 options.push(ques?.correct_answer)
    //                 return ({...ques, _id: index + 1, visited: false, attempted: false, userOption: -1, options: options})

    //             }));
    //         });
    // }
    const getData = (data) => {
        setQuestions(data.results.map((ques, index) => {
            let options = [];
            options.push(...ques?.incorrect_answers)
            options.push(ques?.correct_answer)
            return ({...ques, _id: index + 1, visited: false, attempted: false, userOption: -1, options: options})
        }));
    }
    
    // useEffect(()=>getData(),[])
    //reset function
    useEffect(() => {
        const jsonData = {
            "response_code": 0,
            "results": [
              {
                "category": "Maths",
                "type": "boolean",
                "difficulty": "medium",
                "question": "Solve : \\(\n\\int_0^{\\frac{\\pi}{2}} \\sin ^3 \\theta \\cos \\theta d \\theta\n\\)",
                "correct_answer": "1",
                "incorrect_answers": [
                  "0"
                ]
              },
              {
                "category": "Maths",
                "type": "multiple",
                "difficulty": "medium",
                "question": "In the expansion of \\(\\left(x+\\sqrt{x^2-1} \\right)^6 + \\left(x-\\sqrt{x^2-1}\\right)^6\\). Find the number of terms",
                "correct_answer": "16",
                "incorrect_answers": [
                  "24",
                  "11",
                  "6"
                ]
              },
              {
                "category": "Maths",
                "type": "multiple",
                "difficulty": "easy",
                "question": "If \\((1+x)^n=C_0+C_1 x+C_2 x^2+\\ldots  C_n x^n\\). Prove that \\(C_0C_1+C_1C_2+.....C_{n-1}C_n=\\frac{2n!}{(n-1)!(n+1)!}\\)",
                "correct_answer": "Cannot be Determined",
                "incorrect_answers": [
                  "True",
                  "False",
                  "None of the Above"
                ]
              },
              {
                "category": "Maths",
                "type": "boolean",
                "difficulty": "hard",
                "question": "If \\(\\int_{-\\frac1{\\sqrt{3}}}^{\\frac1{\\sqrt{3}}} \\frac{x^4}{1-x^4} \\cos ^{-1} \\frac{2 x}{1+x^2} d x=-\\frac{\\pi}{\\sqrt{3}}-\\frac{\\pi}{4} \\log \\left(\\frac{\\sqrt{3}-1}{\\sqrt{3}+1}\\right)+k\\), then \\(k=?\\)",
                "correct_answer": "67",
                "incorrect_answers": [
                  "24",
                  "11",
                  "96"
                ]
              },
              {
                "category": "Maths",
                "type": "multiple",
                "difficulty": "easy",
                "question": "In the expansion of  \\(\\left(\\frac{4x}{5}-\\frac{5}{2x}\\right)^9\\\\\\)\nFind the 7th term.",
                "correct_answer": "87",
                "incorrect_answers": [
                  "57",
                  "43",
                  "11"
                ]
              },
              {
                "category": "Maths",
                "type": "multiple",
                "difficulty": "easy",
                "question": "In the expansion of  \\(\\left(ax^2+\\frac{1}{bx}\\right)^{11}\\), find the coefficient of \\(x^7\\).",
                "correct_answer": "76",
                "incorrect_answers": [
                  "01",
                  "23",
                  "198"
                ]
              },
              {
                "category": "Maths",
                "type": "multiple",
                "difficulty": "easy",
                "question": "Solve: \\(\\int_{-4}^3|x^2 -4| d x\\)",
                "correct_answer": "-11",
                "incorrect_answers": [
                  "29",
                  "11",
                  "-10"
                ]
              },
              {
                "category": "Maths",
                "type": "boolean",
                "difficulty": "medium",
                "question": "Solve : \\(\n\\int_0^{\\frac{\\pi}{2}} \\sin ^3 \\theta \\cos \\theta d \\theta\n\\)",
                "correct_answer": "1",
                "incorrect_answers": [
                  "0"
                ]
              },
              {
                "category": "Maths",
                "type": "multiple",
                "difficulty": "medium",
                "question": "In the expansion of \\(\\left(x+\\sqrt{x^2-1} \\right)^6 + \\left(x-\\sqrt{x^2-1}\\right)^6\\). Find the number of terms",
                "correct_answer": "16",
                "incorrect_answers": [
                  "24",
                  "11",
                  "6"
                ]
              },
              {
                "category": "Maths",
                "type": "multiple",
                "difficulty": "easy",
                "question": "If \\((1+x)^n=C_0+C_1 x+C_2 x^2+\\ldots  C_n x^n\\). Prove that \\(C_0C_1+C_1C_2+.....C_{n-1}C_n=\\frac{2n!}{(n-1)!(n+1)!}\\)",
                "correct_answer": "Cannot be Determined",
                "incorrect_answers": [
                  "True",
                  "False",
                  "None of the Above"
                ]
              },
              {
                "category": "Maths",
                "type": "boolean",
                "difficulty": "hard",
                "question": "If \\(\\int_{-\\frac1{\\sqrt{3}}}^{\\frac1{\\sqrt{3}}} \\frac{x^4}{1-x^4} \\cos ^{-1} \\frac{2 x}{1+x^2} d x=-\\frac{\\pi}{\\sqrt{3}}-\\frac{\\pi}{4} \\log \\left(\\frac{\\sqrt{3}-1}{\\sqrt{3}+1}\\right)+k\\), then \\(k=?\\)",
                "correct_answer": "67",
                "incorrect_answers": [
                  "24",
                  "11",
                  "96"
                ]
              },
              {
                "category": "Maths",
                "type": "multiple",
                "difficulty": "easy",
                "question": "In the expansion of  \\(\\left(\\frac{4x}{5}-\\frac{5}{2x}\\right)^9\\\\\\)\nFind the 7th term.",
                "correct_answer": "87",
                "incorrect_answers": [
                  "57",
                  "43",
                  "11"
                ]
              },
              {
                "category": "Maths",
                "type": "multiple",
                "difficulty": "easy",
                "question": "In the expansion of  \\(\\left(ax^2+\\frac{1}{bx}\\right)^{11}\\), find the coefficient of \\(x^7\\).",
                "correct_answer": "76",
                "incorrect_answers": [
                  "01",
                  "23",
                  "198"
                ]
              },
              {
                "category": "Maths",
                "type": "multiple",
                "difficulty": "easy",
                "question": "Solve: \\(\\int_{-4}^3|x^2 -4| d x\\)",
                "correct_answer": "-11",
                "incorrect_answers": [
                  "29",
                  "11",
                  "-10"
                ]
              },
              {
                "category": "Maths",
                "type": "multiple",
                "difficulty": "medium",
                "question": "In the expansion of \\(\\left(x+\\sqrt{x^2-1} \\right)^6 + \\left(x-\\sqrt{x^2-1}\\right)^6\\). Find the number of terms",
                "correct_answer": "16",
                "incorrect_answers": [
                  "24",
                  "11",
                  "6"
                ]
              }
            ]
        };
        getData(jsonData);
    }, []);

    const Reset = () =>{
        setQuestions([]);
        setCurrentQuestion(0);
        setUseremail("");
        setSelectedOption(-1);
        getData();
        setTime({min:39,sec:59})
        navigate("/");
        
    }








    return(
        <DataContext.Provider value = {{questions,setQuestions,currentQuestion,setCurrentQuestion,useremail,setUseremail,selectedOption,setSelectedOption,Reset,time,startTimer,

        }}>
            {children}
        </DataContext.Provider>
    )
}
export const useData = ()=>useContext(DataContext);
