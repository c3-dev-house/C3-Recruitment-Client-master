import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FormStepperControl } from "./FormStepperControl";
import {
  nextStep,
  setInterviewDateDetails,
} from "../store/slices/recruitmentSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';


export function FormAvailability() {

  const [residence, setResidence] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const step = useSelector((state) => state.formDetails.step);
  const dispatch = useDispatch();
  const department = useSelector((state) => state.formDetails.department);

  const interviewDateDetails = useSelector(
    (state) => state.formDetails.interviewDate
  );

  useEffect(() => {
    interviewDateDetails
      ? setResidence(interviewDateDetails.residence)
      : setResidence("");
  }, [interviewDateDetails]);

  const handleNext = () => {
    if (selectedOption && residence.length > 0) {
      console.log("Residence and ", { selectedOption: selectedOption, residence});
      dispatch(setInterviewDateDetails({ selectedOption, residence }));
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
  

  const handleCheckbox = (event)=>{
    const { name } = event.target;
    setSelectedOption(name === selectedOption ? "" : name);
  }


  return (
    <div className="flex flex-col ">
      <ToastContainer />
        <React.Fragment>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Current area of residence
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <select
                onChange={(e) => setResidence(e.target.value)}
                value={residence}
                name="residence"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              >
                <option value="">Select</option>
                <option value="limpopo">Limpopo</option>
                <option value="gauteng">Gauteng</option>
                <option value="western cape">Western Cape</option>
                <option value="kwazulu natal">KwaZulu-Natal</option>
                <option value="free state">Free State</option>
                <option value="eastern cape">Eastern Cape</option>
                <option value="mpumalanga">Mpumalanga</option>
                <option value="northern cape">Northern Cape</option>
                <option value="north west">North West</option>
              </select>
            </div>
          </div>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Would you be willing to relocate to Johannesburg?
            </div>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedOption === "yes"}
                      onChange={handleCheckbox}
                      name="yes"
                      disabled={selectedOption && selectedOption !== "yes"}
                    />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedOption === "no"}
                      onChange={handleCheckbox}
                      name="no"
                      disabled={selectedOption && selectedOption !== "no"}
                    />
                  }
                  label="No"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedOption === "limited"}
                      onChange={handleCheckbox}
                      name="limited"
                      disabled={selectedOption && selectedOption !== "limited"}
                    />
                  }
                  label="For a limited amount of time"
                />
              </FormGroup>
          </div>
        </React.Fragment>

      <FormStepperControl handleNext={handleNext} step={step} />
    </div>
  );
}

export default FormAvailability;
