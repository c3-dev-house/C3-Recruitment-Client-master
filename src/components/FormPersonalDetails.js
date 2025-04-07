import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setPersonalDetails, nextStep } from "../store/slices/recruitmentSlice";
import { FormStepperControl } from "./FormStepperControl";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  checkRecruitEmail,
  isNewApplicant,
} from "../store/actions/recruitmentActions";
import { reset } from "../store/slices/recruitmentSlice";
import { getCountries } from "../store/actions/recruitmentActions";

export function FormPersonalDetails() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cell, setCell] = useState("");
  const [dob, setDOB] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [countryArray, setCountryArray] = useState([]);
  const countryList = [];

  const personalDetails = useSelector(
    (state) => state.formDetails.personalDetails
  );

  const emailState = useSelector((state) => state.checkEmail);
  const { error: emailError } = emailState;

  const department = useSelector((state) => state.formDetails.department);

  useEffect(() => {
    getCountries()
      .then((countries) => {
        const countryList = countries
          .map((country) => country.name.common)
          .filter(
            (name) =>
              !name.toLowerCase().includes("island") &&
              !name.toLowerCase().includes("islands")
          );

        countryList.push("Other");
        countryList.sort((a, b) => a.localeCompare(b));

        setCountryArray(countryList);
      })
      .catch((error) => {
        console.error("Unexpected error:", error);
        // As a final fallback if something else goes wrong
        setCountryArray(["South Africa", "Other"]);
      });
  }, []);

  useEffect(() => {
    personalDetails ? setName(personalDetails.name) : setName("");
    personalDetails ? setEmail(personalDetails.email) : setEmail("");
    personalDetails ? setCell(personalDetails.cell) : setCell("");
    personalDetails ? setDOB(personalDetails.dob) : setDOB("");
    personalDetails
      ? setNationality(personalDetails.nationality)
      : setNationality("");
    personalDetails ? setGender(personalDetails.gender) : setGender("");
  }, [personalDetails]);

  const step = useSelector((state) => state.formDetails.step);

  const dispatch = useDispatch();

  useEffect(() => {
    // added a name check for same person using different email
    dispatch(reset());
    if (email.length > 0) dispatch(checkRecruitEmail(email));
  }, [email, dispatch]);

  const handleNext = () => {
    // First, run the name validation
    // console.log("form details: ",name,email)
    const isValid = validations(name, email, cell, nationality);
    if (!isValid) {
      // If name is not valid, stop further execution
      return;
    }
    if (email.length > 0) {
      dispatch(checkRecruitEmail(email));
      isNewApplicant(email, name, cell);
    }

    if (emailError === null) {
      if (
        name.length > 0 &&
        email.length > 0 &&
        cell.length > 0 &&
        dob.length > 0 &&
        nationality.length > 0 &&
        gender.length > 0
      ) {
        dispatch(
          setPersonalDetails({ name, email, cell, dob, nationality, gender })
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
      toast.error(`A submission with this email has already been received.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });

      dispatch(reset());
    }
  };

  const validations = (name, email, cell, nationality) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nationalityRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    const cellRegex = /^[0-9]{7,15}$/;
    if (name.length < 3) {
      toast.warning(`Name should be 3 characters minimum.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.warning(`Please enter a valid email address.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
      return false;
    }
    if (!cellRegex.test(cell)) {
      toast.warning(`Please enter a valid phone number`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
      return false;
    }
    if (!nationalityRegex.test(nationality)) {
      toast.warning(`Please enter a valid nationality`, {
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

  return (
    <div className="flex flex-col ">
      <ToastContainer />
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Full Name
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            name="name"
            placeholder="Full Name"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Email Address
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            placeholder="Email Address"
            type="email"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
      <React.Fragment>
        <div className="flex">
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Cellphone Number
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <input
                type="number"
                onChange={(e) => {
                  setCell(e.target.value);
                }}
                value={cell.toString()}
                name="cell"
                placeholder="Cellphone Number"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              />
            </div>
          </div>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Nationality
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <select
                onChange={(e) => setNationality(e.target.value)}
                value={nationality}
                name="nationality"
                className={
                  "w-full appearance-none p-1 px-2 outline-none text-gray-800"
                }
              >
                <option value="" className="text-gray-400">
                  Select
                </option>
                {countryArray.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Gender
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <select
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                name="salary"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Date of Birth
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <input
                onChange={(e) => setDOB(e.target.value)}
                value={dob}
                name="availability"
                placeholder="Select a date"
                type="date"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
      <FormStepperControl handleNext={handleNext} step={step} />
    </div>
  );
}

export default FormPersonalDetails;
