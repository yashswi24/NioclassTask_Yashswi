import {useState} from "react"
import "./landingpage.css"
import { useData } from "../../data-context";
import { useNavigate } from "react-router-dom"
export const LandingPage = () =>{
  const navigate = useNavigate();

  const {setUseremail,startTimer} = useData();
  const [email,setEmail]=useState()


    return(
        <div className="main-container-landing">
            <div className="center-container-landing">
                <h2 className="welcome-note">
                    Welcome to Nioclass Quiz
                </h2>
                <h3>Enter Your name to begin the Quiz</h3>
                <input type="name" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <button className="details-btn" onClick={()=>{setUseremail(email);navigate('/quiz');startTimer()}}>Submit and Start</button>
                <div className="quiz-details">
                    <p>There are 15 Questions in Quiz. </p>
                    <p>Maximum time alloted is 40 minutes the Quiz will auto submit after 40 minutes.</p>
                </div>
            </div>
        </div>
    )
}