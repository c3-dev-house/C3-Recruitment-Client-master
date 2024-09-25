import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FormStepperControl } from "./FormStepperControl";
import { nextStep } from "../store/slices/recruitmentSlice";
import {
  submitDevForm,
  submitConsultantForm,
} from "../store/actions/recruitmentActions";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoonLoader } from "react-spinners";

export function FormUpload() {
  const step = useSelector((state) => state.formDetails.step);

  const [uploading, setUploading] = useState(false);
  const [fileLink, setFileLink] = useState("");
  const [transcriptLink, setTranscriptLink] = useState("");
  const [acceptedTerms,setAcceptedTerms] = useState(false);
  const [transcriptRequired,setTranscriptRequired] = useState(false);

  const department = useSelector((state) => state.formDetails.department);

  const personalDetails = useSelector(
    (state) => state.formDetails.personalDetails
  );

  const positionDetails = useSelector(
    (state) => state.formDetails.positionDetails
  );

  const motivationDetails = useSelector(
    (state) => state.formDetails.motivationDetails
  );

  const interviewDetails = useSelector(
    (state) => state.formDetails.interviewDate
  );

  const background = useSelector(
    (state) => state.formDetails.background
  );

  const score = useSelector((state) => state.aptitudeQuestions.score);

  const dispatch = useDispatch();

  useEffect(()=>{
    validations()
  },[])

  const handleNext = () => {
    const isValid = validations();
    if (!isValid) {
      toast.error(`Please upload required files`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
      return;
    }
    if (department === "developer") {
      dispatch(
        submitDevForm({
          name: personalDetails.name,
          email: personalDetails.email,
          cell: personalDetails.cell,
          dob: personalDetails.dob,
          nationality: personalDetails.nationality,
          gender: personalDetails.gender,
          experience: positionDetails.experience,
          currentlyEmployed: positionDetails.currentlyEmployed,
          disability: positionDetails.disability,
          disabilityType: positionDetails.disabilityType,
          reffered: positionDetails.reffered,
          refferedBy: positionDetails.refferedBy,
          highestQualification: motivationDetails.qualification,
          highestQualificationYear: motivationDetails.year,
          highestQualificationInstitution: motivationDetails.institution,
          currentAreaOfResidence: interviewDetails.residence,
          abilityToRelocate: interviewDetails.selectedRelocateOption,
          workExperience:background.experience,
          goals:background.goals,
          salaryExpectation: interviewDetails.selectedSalary,
          notice: interviewDetails.noticePeriod,
          repository:background.repository,
          cv: fileLink? fileLink: "",
          transcript:transcriptLink? transcriptLink: "", 
          // aptitudeScore: score,
        })
      );
      dispatch(nextStep());
    } else {
      dispatch(
        submitConsultantForm({
          name: personalDetails.name,
          email: personalDetails.email,
          cell: personalDetails.cell,
          dob: personalDetails.dob,
          nationality: personalDetails.nationality,
          gender: personalDetails.gender,
          experience: positionDetails.experience,
          currentlyEmployed: positionDetails.currentlyEmployed,
          disability: positionDetails.disability,
          disabilityType: positionDetails.disabilityType,
          reffered: positionDetails.reffered,
          refferedBy: positionDetails.refferedBy,
          highestQualification: motivationDetails.qualification,
          highestQualificationYear: motivationDetails.year,
          highestQualificationInstitution: motivationDetails.institution,
          currentAreaOfResidence: interviewDetails.residence,
          abilityToRelocate: interviewDetails.selectedRelocateOption,
          workExperience:background.experience,
          goals:background.goals,
          salaryExpectation: interviewDetails.selectedSalary,
          notice: interviewDetails.noticePeriod,
          cv: fileLink? fileLink: "",
          transcript:transcriptLink? transcriptLink: "", 
          // aptitudeScore: score,
        })
      );
      dispatch(nextStep());
    }
  };

  const uploadFileHandler = (category) => async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error(`Please upload your`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    } else {
      const formData = new FormData();

      formData.append("file", file);
      setUploading(true);
      console.log("formData",formData)
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const { data } = await axios.post(
          // `http://localhost:3001/v1/upload`,
          `https://uat.api.portal.c3-dev-house.com/v1/upload`,
          formData,
          config
        );
        console.log(data)
        if(category === "cv"){
          setFileLink(data.result.key);
        }
        if(category === "transcript"){
          setTranscriptLink(data.result.key)
        }
        setUploading(false);
      } catch (error) {
        console.error(error);
        setUploading(true);
      }
    }
  };

  const handleCheckboxChange = (event) => {
    setAcceptedTerms(event.target.checked);
  };

  const OpenLegalPage = () => {
    window.open('/legal', '_blank'); // Opens in a new tab or window
  };

  const validations = ()=>{
    let currentYear = new Date().getFullYear();
    let graduateYear = parseInt(localStorage.getItem('graduationYear'));
    let conditionalValue = currentYear - graduateYear;
    console.log(currentYear,typeof(currentYear))
    console.log(graduateYear,typeof(graduateYear))
    console.log(conditionalValue)
    if (conditionalValue<4 && !transcriptLink){
      setTranscriptRequired(true);
      return false
    }
    if(conditionalValue>4 && !fileLink){
      return false
    }
    return true;
  }

  return (
    <div className="flex flex-col ">
      <ToastContainer />
      <div className="mx-2 w-full flex-1">
        <div className="flex">
          <div style={{ color: "red" }} className="mt-4 text-lg font-bold">
            *
          </div>
          <div className="ml-2 mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            Upload your CV
          </div>
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            type="file"
            id="myFile"
            accept="application/pdf"
            name="filename"
            onChange={uploadFileHandler("cv")}
          />
        </div>
      </div>
      <div className="mx-2 w-full flex-1">
        <div className="flex">
          {transcriptRequired && (
            <div style={{ color: "red" }} className="mt-4 text-lg font-bold">
              *
            </div>
          )}
          <div className="ml-2 mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            Upload your university transcript
          </div>
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            type="file"
            id="transcript"
            accept="application/pdf"
            name="transcript"
            onChange={uploadFileHandler("transcript")}
          />
        </div>
      </div>
      <div 
        className="text-center" 
        style={{
          border:"1px solid", 
          marginLeft: '30%', 
          marginRight: '30%' ,
          borderRadius:"10px 10px 10px 10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
          backgroundColor:"InfoBackground"
        }}>
        <input 
          type="checkbox" 
          id="consent" 
          name="consent"
          checked={acceptedTerms}
          onChange={handleCheckboxChange}
          required
        />
        <label for="consent"> I have read and agree to the <a style={{color:"red"}} onClick={OpenLegalPage}>POPIA Policy</a>.</label>
      </div>
      {uploading ? (
        <div className="horizontal container mt-5">
          <div className="container mt-4 mb-8 flex justify-around">
            <MoonLoader />
          </div>
        </div>
      ) : (
        acceptedTerms && (
          <FormStepperControl handleNext={handleNext} step={step} />
        )
      )}
    </div>
  );
}

export default FormUpload;
