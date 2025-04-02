import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FormStepperControl } from "./FormStepperControl";
import {
  nextStep,
  setInterviewDateDetails,
} from "../store/slices/recruitmentSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropdownIcon from "../generalComponents/dropdown";

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { colors, TextField } from "@mui/material";

export function FormAvailability() {

  const [residence, setResidence] = useState("");
  const [selectedRelocateOption, setSelectedRelocateOption] = useState("");
  const [selectedSalary,setSelectedSalary]=useState("");
  const [noticePeriod,setNoticePeriod]=useState("");
  const [otherResidence,setOtherResidence]=useState("")
  const [isOtherResidence,setIsOtherResidence]=useState(false)

  const step = useSelector((state) => state.formDetails.step);
  const dispatch = useDispatch();
  const department = useSelector((state) => state.formDetails.department);

  const interviewDateDetails = useSelector(
    (state) => state.formDetails.interviewDate
  );

  const salaryRange = [
    "R15 000 - R20 000",
    "R20 000 - R25 000",
    "R25 000 - R30 000",
    "R30 000 - R35 000",
    "R35 000 - R40 000",
    "R40 000 - R50 000",
    "R50 000 - R60 000",
    "R60 000 - R70 000",
    "R70 000 - R80 000",
    "R80 000 +",
    ]

  useEffect(() => {
    interviewDateDetails
      ? setResidence(interviewDateDetails.residence)
      : setResidence("");
  }, [interviewDateDetails]);

  const handleNext = () => {
    if (selectedRelocateOption &&
      residence.length > 0 &&
      selectedSalary.length > 0 &&
      noticePeriod.length > 0 &&
      (!isOtherResidence || otherResidence.length > 0) // Ensure otherResidence is checked only when isOtherResidence is true
    ) {
      const finalResidence = isOtherResidence ? otherResidence : residence;
      // console.log("Residence and ", { selectedRelocateOption: selectedRelocateOption, residence,selectedSalary,noticePeriod});
      dispatch(setInterviewDateDetails({ selectedRelocateOption,residence:finalResidence,selectedSalary,noticePeriod }));
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
  

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;
  
    // Ensure only the selected checkbox is active
    if (checked) {
      setSelectedRelocateOption(name); // Set the name of the selected option
    } else {
      setSelectedRelocateOption(""); // Clear the selection if unchecked
    }
  };
  


  return (
    <div className="flex flex-col ">
      <ToastContainer />
        <React.Fragment>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Current area of residence
            </div>
            <div className="my-2 relative flex rounded border border-gray-200 bg-white p-1">
              <select
                onChange={(e) => {
                  // setQualification(e.target.value)
                  if(e.target.value === "other"){
                    setIsOtherResidence(true);
                    setResidence(e.target.value)
                  }else{
                    setIsOtherResidence(false);
                    setResidence(e.target.value)
                  }
                }}
                // onChange={(e) => setResidence(e.target.value)}
                value={residence}
                name="residence"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              >
                <option value="">Select</option>
                <option value="eastern cape">Eastern Cape</option>
                <option value="free state">Free State</option>
                <option value="gauteng">Gauteng</option>
                <option value="kwazulu natal">KwaZulu-Natal</option>
                <option value="limpopo">Limpopo</option>
                <option value="mpumalanga">Mpumalanga</option>
                <option value="north west">North West</option>
                <option value="northern cape">Northern Cape</option>
                <option value="western cape">Western Cape</option>
                <option value="other">Other</option>
              </select>
              <DropdownIcon/>
            </div>
            {isOtherResidence &&(
            <>
              <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                Other Residence
              </div>
              <div className="mt-3">
                <TextField
                  value={otherResidence}
                  onChange={(e) => setOtherResidence(e.target.value)}
                  variant="outlined"
                  fullWidth
                  sx={{
                    '.MuiOutlinedInput-root': {
                      height: '40px', // Set the total height including borders
                    },
                    '.MuiInputBase-input': {
                      height: '35px', // Set the input field height excluding padding and borders
                      padding: '8px 14px', // Adjust padding as needed
                    },
                  }}
                />
              </div>
            </>
          )}
          </div>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Would you be willing to relocate to Johannesburg?
            </div>
              <FormGroup className="pl-3 text-gray-800">
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{color:"gray"}}
                      checked={selectedRelocateOption === "yes"}
                      onChange={handleCheckbox}
                      name="yes"
                    />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{color:"gray"}}
                      checked={selectedRelocateOption === "no"}
                      onChange={handleCheckbox}
                      name="no"
                    />
                  }
                  label="No"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{color:"gray"}}
                      checked={selectedRelocateOption === "limited"}
                      onChange={handleCheckbox}
                      name="limited"
                    />
                  }
                  label="For a limited amount of time"
                />
              </FormGroup>
          </div>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            What are your salary expectations? (This is a monthly cost to the company range)
            This ensures what you are looking for is aligned with what we can offer you.
            </div>
            <div className="my-2 relative flex rounded border border-gray-200 bg-white p-1">
              <select
                onChange={(e) => setSelectedSalary(e.target.value)}
                value={selectedSalary}
                name="salary"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              >
                <option value="">Select</option>
                {salaryRange.map((range,index)=>(
                  <option key={index} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              <DropdownIcon/>
            </div>
          </div>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              What is your current notice period? (Students please select the option that best fits when you will be graduating)
            </div>
            <div className="my-2 relative flex rounded border border-gray-200 bg-white p-1">
              <select
                onChange={(e) => setNoticePeriod(e.target.value)}
                value={noticePeriod}
                name="noticePeriod"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              >
                <option value="">Select</option>
                <option value="I can start immediately">I can start immediately</option>
                <option value="1 month">1 Month</option>
                <option value="1 calendar month">1 Calendar month</option>
                <option value="2 months">2 Months</option>
                <option value="2 calendar months">2 Calendar months</option>
                <option value="More than 2 months">More than 2 months</option>
              </select>
              <DropdownIcon/>
            </div>
          </div>
        </React.Fragment>

      <FormStepperControl handleNext={handleNext} step={step} />
    </div>
  );
}

export default FormAvailability;
