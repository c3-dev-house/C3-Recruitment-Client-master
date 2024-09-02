import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FormStepperControl } from "./FormStepperControl";
import { nextStep, setPositionDetails } from "../store/slices/recruitmentSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function FormPositionDetails() {
  const [seniority, setSeniority] = useState("0-1");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [availability, setAvailability] = useState("");

  const [currentlyEmployed, setCurrentlyEmployed] = useState("");
  const [disability, setDisability] = useState("");
  const [disabilityType, setDisabilityType] = useState("");
  const [reffered, setReffered] = useState("");
  const [refferedBy, setRefferedBy] = useState("");

  const step = useSelector((state) => state.formDetails.step);
  const positionDetails = useSelector(
    (state) => state.formDetails.positionDetails
  );
  const department = useSelector((state) => state.formDetails.department);

  const dispatch = useDispatch();

  useEffect(() => {
    positionDetails
      ? setSeniority(positionDetails.seniority)
      : setSeniority("");
    positionDetails
      ? setExperience(positionDetails.experience)
      : setExperience("");
    positionDetails ? setSalary(positionDetails.salary) : setSalary("");
    positionDetails
      ? setAvailability(positionDetails.availability)
      : setAvailability("");
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
    if (department === "developer") {
      if (
        seniority.length > 0 &&
        experience.length > 0 &&
        salary.length > 0 &&
        availability.length > 0
      ) {
        dispatch(
          setPositionDetails({ seniority, experience, salary, availability })
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
    } else {
      if (
        seniority.length > 0 &&
        currentlyEmployed.length > 0 &&
        disability.length > 0 &&
        reffered.length > 0
      ) {
        dispatch(
          setPositionDetails({
            seniority,
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
    }
  };

  return (
    <div className="flex flex-col ">
      <ToastContainer />
      <div className="flex">
        <div className="mx-2 w-full flex-1">
          <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            {department === "developer"
              ? "Seniority Level"
              : "Years working experience"}
          </div>
          <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
            <select
              onChange={(e) => setSeniority(e.target.value)}
              value={seniority}
              name="seniority"
              className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
            >
              <option value="">Select</option>
              {department === "developer" ? (
                <React.Fragment>
                  {/* <option value="intern">Intern</option> */}
                  <option value="junior">Junior</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="senior">Senior</option>
                  {/* <option value="lead">Lead</option> */}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <option value="0-1">0-1 Years</option>
                  <option value="2-3">2-3 Years</option>
                  <option value="4-5">4-5 Years</option>
                  <option value="5+">More than 5 years</option>
                </React.Fragment>
              )}
            </select>
          </div>
        </div>
        {department === "developer" && (
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Years of experience in industry
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <input
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                name="experience"
                placeholder="0"
                type="number"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              />
            </div>
          </div>
        )}
      </div>
      {department === "developer" && (
        <React.Fragment>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Salary Expectation
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <select
                onChange={(e) => setSalary(e.target.value)}
                value={salary}
                name="salary"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              >
                <option value="">Select</option>
                <option value="R15 000 - R20 000">R15 000 - R20 000</option>
                <option value="R20 000 - R25 000">R20 000 - R25 000</option>
                <option value="R25 000 - R30 000">R25 000 - R30 000</option>
                {seniority !== "junior" && (
                  <>
                    <option value="R30 000 - R35 000">R30 000 - R35 000</option>
                    <option value="R35 000 - R40 000">R35 000 - R40 000</option>
                    <option value="R40 000 - R45 000">R40 000 - R45 000</option>
                  </>
                )}
                {seniority === "senior" && (
                  <>
                    <option value="R45 000+">R45 000+</option>
                  </>
                )}
              </select>
            </div>
          </div>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Availability to start
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <input
                onChange={(e) => setAvailability(e.target.value)}
                value={availability}
                name="availability"
                placeholder="Select a date"
                type="date"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              />
            </div>
          </div>
        </React.Fragment>
      )}
      {department === "consultant" && (
        <React.Fragment>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Are you currently employed?
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
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
            </div>
          </div>
          <div className="flex">
            <div className="mx-2 w-full flex-1">
              <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                Disability
              </div>
              <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
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
                Were you reffered by a Convergenc3 employee?
              </div>
              <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
                <select
                  onChange={(e) => setReffered(e.target.value)}
                  value={reffered}
                  name="salary"
                  className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
            {reffered === "yes" && (
              <div className="mx-2 w-full flex-1">
                <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                  Please indicate the name of the convergenc3 employee
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
            )}
          </div>
        </React.Fragment>
      )}
      <FormStepperControl handleNext={handleNext} step={step} />
    </div>
  );
}

export default FormPositionDetails;
