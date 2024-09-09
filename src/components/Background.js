import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setPersonalDetails, nextStep, setBackground } from "../store/slices/recruitmentSlice";
import { FormStepperControl } from "./FormStepperControl";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reset } from "../store/slices/recruitmentSlice";

export function FormBackgroundAndProfile() {
  const [experience, setExperience] = useState("");
  const [goals, setGoals] = useState("");

  const background = useSelector(
    (state) => state.formDetails.background
  );

  const department = useSelector((state) => state.formDetails.department);

  useEffect(() => {
    background ? setExperience(background.experience) : setExperience("");
    background ? setGoals(background.goals) : setGoals("");
  }, [background]);

  const step = useSelector((state) => state.formDetails.step);

  const dispatch = useDispatch();

  const handleNext = () => {
        if (experience.length > 0 && goals.length > 0) {
          console.log("Background and profile", { experience: experience, goals:goals});
          dispatch(setBackground({ experience, goals }));
          dispatch(nextStep());
        } else {
          toast.error(`Please fill in all fields.`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
          });
        }
    }
    const handleChange = (e) => {
        const words = e.target.value.split(/\s+/);
        if (words.length <= 200 && e.target.name === 'experience') {
          setExperience(e.target.value);
        }else if(words.length <= 200 && e.target.name === 'goals'){
          setGoals(e.target.value);
        }
    };

  return (
    <div className="flex flex-col ">
        <ToastContainer />
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            Do you have any interest/experience in consulting and the financial services industry?
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
            <textarea
                onChange={handleChange}
                value={experience}
                name="experience"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none resize-none"
                rows="3"
            />
        </div>
      </div>
      <div className="text-xs text-gray-500">
          {experience.split(/\s+/).length} / 200 words
      </div>
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            Please briefly describe what interests you and your career goals over the next 3 years.
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
            <textarea
                onChange={handleChange}
                value={goals}
                name="goals"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none resize-none"
                rows="3"
            />
        </div>
        <div className="text-xs text-gray-500">
          {goals.split(/\s+/).length} / 200 words
        </div>
      </div>
      <FormStepperControl handleNext={handleNext} step={step} />
    </div>
  );
}

export default FormBackgroundAndProfile;
