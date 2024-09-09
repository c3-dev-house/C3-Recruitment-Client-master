import { useDispatch } from "react-redux";
import { previousStep } from "../store/slices/recruitmentSlice";

export const FormStepperControl = ({ handleNext, step }) => {
  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(previousStep());
  };

  return (
    <div className="horizontal container mt-5">
      <div className="container mt-4 mb-8 flex justify-around">
        {step !== 1 && step !== 7 && (
          <button
            onClick={handleBack}
            className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-white py-2 px-4 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white`}
          >
            Back
          </button>
        )}

        <button
          onClick={handleNext}
          className="cursor-pointer rounded-lg bg-red-600 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
        >
          {step === 7 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default FormStepperControl;
