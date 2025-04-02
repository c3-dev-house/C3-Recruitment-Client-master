import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FormStepperControl } from "./FormStepperControl";
import { nextStep, setPositionDetails } from "../store/slices/recruitmentSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropdownIcon from "../generalComponents/dropdown";

export function FormPositionDetails() {
  const [experience, setExperience] = useState("");

  const [currentlyEmployed, setCurrentlyEmployed] = useState("");
  const [disability, setDisability] = useState("");
  const [disabilityType, setDisabilityType] = useState("");
  const [reffered, setReffered] = useState("");
  const [refferedBy, setRefferedBy] = useState("");

  const step = useSelector((state) => state.formDetails.step);
  const positionDetails = useSelector(
    (state) => state.formDetails.positionDetails
  );

  const dispatch = useDispatch();

  useEffect(() => {
    positionDetails
      ? setExperience(positionDetails.experience)
      : setExperience("");
    positionDetails
      ? setCurrentlyEmployed(positionDetails.currentlyEmployed)
      : setCurrentlyEmployed("");
    positionDetails
      ? setDisability(positionDetails.disability)
      : setDisability("");
    positionDetails
      ? setDisabilityType(positionDetails.disabilityType)
      : setDisabilityType("");
    positionDetails ? setReffered(positionDetails.reffered) : setReffered("");
    positionDetails
      ? setRefferedBy(positionDetails.refferedBy)
      : setRefferedBy("");
  }, [positionDetails]);

  const handleNext = () => {
    // First, run the name validation
    const isValid = validations(
      disability,
      disabilityType,
      reffered,
      refferedBy
    );
    if (!isValid) {
      // If name is not valid, stop further execution
      return;
    }
    if (
      experience.length > 0 &&
      currentlyEmployed.length > 0 &&
      disability.length > 0 &&
      reffered.length > 0
    ) {
      dispatch(
        setPositionDetails({
          experience,
          currentlyEmployed,
          disability,
          disabilityType: !disability ? "None" : disabilityType,
          reffered,
          refferedBy: !reffered ? "None" : refferedBy,
        })
      );
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
  };

  const validations = (disability, type) => {
    if (disability === "yes" && !disabilityType.length > 0) {
      toast.warning(`Please fill in all fields.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
      return false;
    }
    if (reffered === "yes" && !refferedBy.length > 0) {
      toast.warning(`Please fill in all fields.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
      return false;
    }
    return true;
  };

  const recruitmentSources = [
    "LinkedIn",
    "Indeed",
    "C3 Referral",
    "Agency",
    "Website",
    "Other",
  ];

  return (
    <div className="flex flex-col ">
      <ToastContainer />
      <div className="flex">
        <div className="mx-2 w-full flex-1">
          <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            Years working experience
          </div>
          <div className="my-2 relative flex rounded border border-gray-200 bg-white p-1">
            <select
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              name="experience"
              className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
            >
              <option value="">Select</option>
              <React.Fragment>
                <option value="0-1">0-1 Years</option>
                <option value="1-3">1-3 Years</option>
                <option value="3-7">3-7 Years</option>
                <option value="7+">7+ years</option>
              </React.Fragment>
            </select>
            <DropdownIcon />
          </div>
        </div>
      </div>
      <React.Fragment>
        <div className="flex">
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Are you currently employed?
            </div>
            <div className="my-2 relative flex rounded border border-gray-200 bg-white p-1">
              <select
                onChange={(e) => setCurrentlyEmployed(e.target.value)}
                value={currentlyEmployed}
                name="salary"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <DropdownIcon />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Disability
            </div>
            <div className="my-2 relative flex rounded border border-gray-200 bg-white p-1">
              <select
                onChange={(e) => setDisability(e.target.value)}
                value={disability}
                name="salary"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <DropdownIcon />
            </div>
          </div>
          {disability === "yes" && (
            <div className="mx-2 w-full flex-1">
              <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                Please indicate the type of disability
              </div>
              <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
                <input
                  onChange={(e) => setDisabilityType(e.target.value)}
                  value={disabilityType}
                  name="disability"
                  placeholder="Type of disability"
                  className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex">
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Recruitment Source
            </div>
            <div className="my-2 relative flex rounded border border-gray-200 bg-white p-1">
              <select
                onChange={(e) => setReffered(e.target.value)}
                value={reffered}
                name="salary"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              >
                <option value="">Select</option>
                {recruitmentSources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
              <DropdownIcon />
            </div>
          </div>
          {reffered === "C3 Referral" ? (
            <div className="mx-2 w-full flex-1">
              <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                Please indicate the name of the Convergenc3 employee
              </div>
              <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
                <input
                  onChange={(e) => setRefferedBy(e.target.value)}
                  value={refferedBy}
                  name="name"
                  placeholder="Full Name"
                  className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
                />
              </div>
            </div>
          ) : reffered === "Other" ? (
            <div className="mx-2 w-full flex-1">
              <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                Please specify your reccruitment source
              </div>
              <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
                <input
                  onChange={(e) => setRefferedBy(e.target.value)}
                  value={refferedBy}
                  name="name"
                  placeholder="Other source"
                  className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
                />
              </div>
            </div>
          ) : null}
        </div>
      </React.Fragment>
      <FormStepperControl handleNext={handleNext} step={step} />
    </div>
  );
}

export default FormPositionDetails;
