import { useState, useEffect } from "react";
import { RecruitmentHeader } from "../components/RecruitmentHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  checkRecruitId,
  submitRepoLink,
} from "../store/actions/recruitmentActions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoonLoader } from "react-spinners";

export function Submission() {
  const [repo, setRepo] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkState = useSelector((state) => state.repoLink);
  const { checkLoading, checkError, submitLoading } = checkState;

  const { id } = useParams();

  useEffect(() => {
    id && dispatch(checkRecruitId(id));
  }, [dispatch, id]);

  const handleSubmit = () => {
    if (repo !== "") {
      dispatch(submitRepoLink({ id, repository: repo }));
    } else {
      toast.error(`Please fill in all fields.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="h-screen">
      <RecruitmentHeader />
      <ToastContainer />
      <div className="bg-white h-screen flex items-center justify-center">
        <div className="mx-auto rounded-2xl p-5 bg-white pb-2 md:w-1/2">
          <div className="horizontal container mt-5 ">
            <div className="my-10 p-10 ">
              {checkLoading === "loading" && (
                <div className="horizontal container mt-5 ">
                  <div className="container mt-4 mb-8 flex justify-around">
                    <MoonLoader />
                  </div>
                </div>
              )}
              {checkError && navigate("/submit")}
              {submitLoading === "loading" ? (
                <div className="horizontal container mt-5 ">
                  <div className="container mt-4 mb-8 flex justify-around">
                    <MoonLoader />
                  </div>
                </div>
              ) : (
                !checkError &&
                checkLoading === "success" &&
                submitLoading !== "success" && (
                  <div className="flex flex-col ">
                    <div className="mx-2 w-full flex-1">
                      <h1 className="text-3xl font-bold text-center">
                        Technical Test Submission
                      </h1>
                      <p className="text-center mt-3 mb-5">
                        Thank you for participating. Please provide us with the
                        link to your GitHub repository.
                        <br />
                        (Remember to make sure that the repo visibility is set
                        to public.)
                      </p>
                      <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
                        <input
                          onChange={(e) => setRepo(e.target.value)}
                          value={repo}
                          name="repo"
                          placeholder="GitHub Repo"
                          className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
                        />
                      </div>
                    </div>
                    <div className="horizontal container mt-5 ">
                      <div className="container mt-4 mb-8 flex justify-around">
                        <button
                          onClick={handleSubmit}
                          className="flex items-center cursor-pointer rounded-lg bg-red-600 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
              {submitLoading === "success" && (
                <div className="flex flex-col ">
                  <div className="mx-2 w-full flex-1">
                    <h1 className="text-3xl font-bold text-center">
                      Thank you for your submission!
                    </h1>
                    <p className="text-center mt-3 mb-5">
                      We will be in contact with you shortly.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Submission;
