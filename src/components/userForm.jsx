import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import "./userForm.css";
import questionData from "./quiz_questions";
import logo from "../assets/react.svg";

const UserForm = () => {

    const [step,setStep] = useState(1);
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [currentQuestion,setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect,setIsCorrect] = useState(null);

    const [correctCount,setCorrectCount] = useState(0);
    const [wrongCount,setWrongCount] = useState(0);

    //const [lockAnswer,setLockAnswer] = useState(false);

    useEffect(() => {

        const storedFirstName = localStorage.getItem("firstname");
        const storedLastName = localStorage.getItem("lastname");
        const storedEmail = localStorage.getItem("email");

        if (storedFirstName) setFirstName(storedFirstName);
        if (storedLastName) setLastName(storedLastName);
        if (storedEmail) setEmail(storedEmail);

    },[]);

    const handleUserInfo = (e) => {
        e.preventDefault();

        localStorage.setItem("firstname", firstname);
        localStorage.setItem("lastname", lastname);
        localStorage.setItem("email", email);

        setStep(2);
        console.log("User Info Saved:", { firstname, lastname, email });
    } 


    const handleNextQuestion = () => {

        if (currentQuestion < questionData.length - 1) {

            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null); 
            setIsCorrect(null); 

          } else {

            //alert("Quiz Completed!"); 
            setStep(3);
          }
    }

    const handleAnswerSelection = (option) => {

        if( selectedAnswer !== null) return;

        setSelectedAnswer(option);

        if(option === questionData[currentQuestion].answer){
            setIsCorrect(true);
            setCorrectCount(correctCount+1);
        }else{
            setIsCorrect(false);          
            setWrongCount(wrongCount + 1);  
        }
    } 
    
    const handleRestartQuiz = () => {
        setStep(2);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setCorrectCount(0);
        setWrongCount(0);
    };

  return (
    <div className="userformsection">
      <div className="container">
        <div className="card p-4 shadow-lg rounded">
          {
            step === 1 && (
                <>
                 <h3 className="text-center mb-4 text-primary fw-bold">
                    User Information
                 </h3>
                 <form onSubmit={handleUserInfo}>
                    <div className="mb-3">
                    <label htmlFor="firstname" className="form-label fw-semibold">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        placeholder="First name"
                        onChange={(e)=>setFirstName(e.target.value)}
                        value={firstname}
                        required
                    />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="lastname" className="form-label fw-semibold">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        placeholder="Last name"
                        onChange={(e)=>setLastName(e.target.value)}
                        value={lastname}
                        required
                    />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                        Email Address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="name@example.com"
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 fw-bold">
                    Next
                    </button>
                 </form>
                </>
            )
          }
          {
            step === 2 && (
                <>
                    <div className="">
                        <h3 className="text-center mb-4 text-primary fw-bold">Quiz Start</h3>
                        <div className="text-center mb-3">
                            <h6 className="fw-semibold text-muted">Question {currentQuestion+1} of {questionData.length}</h6>
                        </div>

                        <h5 className="fw-bold mb-3">{questionData[currentQuestion].question}</h5>

                        <div className="list-group">
                            { questionData[currentQuestion].options.map( (option , index) => (
                                <label key={index} className={`list-group-item list-group-item-action p-3 rounded mt-2 ${selectedAnswer === option ? (isCorrect?"correct-answer" : "wrong-answer") : "" }` }>
                                    <input type="radio" name="quizOption" className="form-check-input me-2" value="option one" onChange={()=>handleAnswerSelection(option)} checked={selectedAnswer === option} disabled={ selectedAnswer !== null} /> {option}
                                </label>
                            ) )}
                        </div>
                        
                        <div className="text-end">
                            <button id="next-button" className="btn btn-primary mt-3" onClick={handleNextQuestion}>
                                { currentQuestion < questionData.length - 1 ? "Next" : "Finish Quiz" }
                            </button>
                        </div>

                    </div>
                </>
            )
          }
          {
            step === 3 && (
                <>
                    <div className="text-center">
                        <h2 className="mb-3 fw-bold" style={{ color: correctCount > wrongCount ? "#28a745" : "#dc3545" }}>
                        {correctCount > wrongCount ? "🎉 Well Done!" : "😞 Better Luck Next Time"}
                        </h2>
                        <p className="lead">
                        {correctCount > wrongCount ? "Great job, keep it up!" : "Don't worry, try again!"}  
                        <br />
                        <strong>{firstname} {lastname}!</strong>
                        </p>
                    </div>
                    <div className="card shadow-lg p-4 mb-4">
                        <h4 className="text-center fw-bold mb-3">Your Results 📊</h4>
                        <div className="d-flex justify-content-between">
                        <div className="text-success fw-bold">
                            ✅ Correct Answers: <span className="badge bg-success p-2">{correctCount}</span>
                        </div>
                        <div className="text-danger fw-bold">
                            ❌ Wrong Answers: <span className="badge bg-danger p-2">{wrongCount}</span>
                        </div>
                        </div>
                    </div>
                    <button onClick={handleRestartQuiz} className="btn btn-primary w-100 fw-bold">
                        <img src={logo} alt="Logo" className="w-15 h-15 animate-spin" /> Restart Quiz
                    </button>
                </>
            )
          }
         
        </div>
      </div>
    </div>
  );
};

export default UserForm;
