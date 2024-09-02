import { useState, useEffect } from "react";
import { Progress } from "react-sweet-progress";
import { useDispatch, useSelector } from "react-redux";
import "react-sweet-progress/lib/style.css";

import { Markup } from "interweave";

import { nextStep, addScore } from "../store/slices/recruitmentSlice";
import { getAptitudeQuestions } from "../store/actions/recruitmentActions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AptitudeTest(props) {
  const [percentage, setPercentage] = useState(100);
  const [timeRemaining, setTimeRemaining] = useState(180);
  const [isActive, setIsActive] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();

  const [questionNum, setQuestionNum] = useState(1);

  const aptitudeState = useSelector((state) => state.aptitudeQuestions);
  const { loading, questions } = aptitudeState;

  useEffect(() => {
    let timer = null;

    if (isActive) {
      timer = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);
        setPercentage(((timeRemaining / 180) * 100).toFixed(0));
        if (timeRemaining <= 0) {
          setTimerExpired(true);
          setIsActive(false);
          setQuestionNum(0);
          return;
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  });

  const startTest = () => {
    dispatch(getAptitudeQuestions());

    setIsActive(true);
    setQuestionNum(1);
  };

  const selectQuestion = () => {
    const next = questionNum + 1;

    if (questionNum === 1 && answer === "") {
      toast.error(`Please select an option.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    } else if (questionNum === 2 && answer === "") {
      toast.error(`Please select an option.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    } else if (questionNum === 3 && answer === "") {
      toast.error(`Please select an option.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    } else if (questionNum === 4 && answer === "") {
      toast.error(`Please select an option.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    } else {
      if (questionNum === 1 && answer === questions[0].answer) {
        dispatch(addScore());
      } else if (questionNum === 2 && answer === questions[1].answer) {
        dispatch(addScore());
      } else if (questionNum === 3 && answer === questions[2].answer) {
        dispatch(addScore());
      } else if (questionNum === 4 && answer === questions[3].answer) {
        dispatch(addScore());
      }

      setAnswer("");

      setQuestionNum(next);
    }
  };

  const endTest = () => {
    setIsActive(false);
    dispatch(nextStep());
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <ToastContainer />
      {isActive && !timerExpired && <Progress percent={percentage} />}
      {timerExpired && (
        <>
          <h1 className="text-3xl font-bold mt-5">Time's up!</h1>
          <p className="text-center mt-3">Thank you for participating.</p>
          <div className="horizontal container mt-5 ">
            <div className="container mt-4 mb-8 flex justify-around">
              <button
                onClick={() => endTest()}
                className="flex items-center cursor-pointer rounded-lg bg-red-600 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
      {!isActive && !timerExpired ? (
        <>
          <h1 className="text-3xl font-bold mt-5">
            Welcome to the Aptitude Test
          </h1>
          <p className="text-center mt-3">
            Please answer the following 5 questions. You will have a time limit
            of 3 minutes.
            <br /> The timer will start as soon as you click the start button
            below.
          </p>
          <div className="horizontal container mt-5 ">
            <div className="container mt-4 mb-8 flex justify-around">
              <button
                onClick={() => startTest()}
                className="flex items-center cursor-pointer rounded-lg bg-red-600 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
              >
                Start
              </button>
            </div>
          </div>
        </>
      ) : (
        questionNum !== 0 && (
          <>
            <div className="horizontal container max-h-9/12">
              {loading === "loading" ? (
                <h1>loading...</h1>
              ) : (
                <div className="p-5">
                  {questionNum === 1 ? (
                    <>
                      <h2 className="mb-3">{questions[0].question}</h2>
                      <div className="flex justify-around items-center flex-col">
                        <img
                          src={`https://uat.api.portal.c3-dev-house.com/v1/upload/${questions[0].image}`}
                          width="250px"
                          alt=""
                        />
                        <div className="flex items-center pt-5">
                          <select
                            className="border-2"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                          >
                            <option value="">Select an Option</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                          </select>
                        </div>
                      </div>
                    </>
                  ) : questionNum === 2 ? (
                    <>
                      <h2 className="mb-3">{questions[1].question}</h2>
                      <div className="flex justify-around flex-col items-center">
                        <img
                          src={`https://uat.api.portal.c3-dev-house.com/v1/upload/${questions[1].image}`}
                          width="250px"
                          alt=""
                        />
                        <div className="flex items-center pt-5">
                          <select
                            className="border-2"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                          >
                            <option value="">Select an Option</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                          </select>
                        </div>
                      </div>
                    </>
                  ) : questionNum === 3 ? (
                    <>
                      <h2 className="mb-3 text-center">
                        <Markup content={questions[2].question} />
                      </h2>
                      <div className="flex justify-around">
                        <div className="flex flex-col items-center justify-center">
                          <select
                            className="border-2"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                          >
                            <option value="">Select an Option</option>
                            {questions[2].options.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="mb-3 text-center">
                        <Markup content={questions[3].question} />
                      </h2>
                      <div className="flex justify-around">
                        <div className="flex flex-col items-center justify-center">
                          <select
                            className="border-2"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                          >
                            <option value="">Select an Option</option>
                            {questions[3].options.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            {questionNum !== 4 ? (
              <div className="horizontal container mt-5 ">
                <div className="container mb-8 flex justify-around">
                  <button
                    onClick={() => selectQuestion()}
                    className="flex items-center cursor-pointer rounded-lg bg-red-600 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <div className="horizontal container mt-5 ">
                <div className="container mb-8 flex justify-around">
                  <button
                    onClick={() => endTest()}
                    className="flex items-center cursor-pointer rounded-lg bg-red-600 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </>
        )
      )}
    </div>
  );
}
export default AptitudeTest;
