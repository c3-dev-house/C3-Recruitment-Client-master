import { useNavigate } from "react-router-dom";
import { RecruitmentHeader } from "../components/RecruitmentHeader";

export function PageNotFound(props) {
  const navigate = useNavigate();

  return (
    <div className="h-screen">
      <RecruitmentHeader />
      <div className="bg-white h-screen flex items-center justify-center">
        <div className="mx-auto rounded-2xl p-5 bg-white md:w-1/2 h-1/2">
          <h1 className="text-3xl font-bold text-center">
            404: Page not found
          </h1>
          <p className="text-center mt-3">
            We couldn't find the page you were looking for.
          </p>
          {/* <div className="my-5 p-10 flex"></div> */}
          <div className="horizontal container mt-5 ">
            <div className="container mt-4 mb-8 flex justify-around">
              <button
                onClick={() => navigate("/")}
                className="flex items-center cursor-pointer rounded-lg bg-red-600 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
              >
                Back Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PageNotFound;
