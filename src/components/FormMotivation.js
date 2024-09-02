import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FormStepperControl } from "./FormStepperControl";
import {
  nextStep,
  setMotivationDetails,
} from "../store/slices/recruitmentSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {getUniversitiesSA} from "../store/actions/recruitmentActions";
import { TextField } from "@mui/material";

export function FormMotivation() {
  const [reason, setReason] = useState("");
  const [hardest, setHardest] = useState("");

  const [qualification, setQualification] = useState("");
  const [year, setYear] = useState("");
  const [institution, setInstitution] = useState("");
  const [graduationYearArr, setGraduationYearArr] = useState([]);
  const [universitiesArr, setUniversitiesArr] = useState([]);

  const step = useSelector((state) => state.formDetails.step);
  const dispatch = useDispatch();
  const department = useSelector((state) => state.formDetails.department);

  const motivationDetails = useSelector(
    (state) => state.formDetails.motivationDetails
  );
  const [isOtherQualfication,setIsOtherQualification]=useState(false);
  const [isOtherUniversity,setIsOtherUniversity]=useState(false);
  const [otherQualification, setOtherQualification] = useState("");
  const [otherUniversity, setOtherUniversity] = useState("");
  const [studyFieldRequired,setStudyFieldRequired]=useState(false);
  const [selectedStudyField,setSelectedStudyField]=useState("");
  const [isOtherStudyField,setIsOtherStudyField]=useState(false)
  const [otherStudyField,setOtherStudyField]=useState("");

  const highestQualificationsArray=[
    "Bachelors of engineering",
    "Bachelor of Engineering Technology",
    "Bachelors of Science Engineering ",
    "Masters of engineering",
    "PhD in engineering",
    "Bachelors of commerce" ,
    "Bachelors of science",
    "Other",
  ]

//User will have to specify their field related to these qualifications
  const qualificationsRequestingSpecifics=[ 
    "Bachelors of engineering",
    "Bachelor of Engineering Technology",
    "Bachelors of Science Engineering ",
    "Masters of engineering",
    "PhD in engineering",
  ]

  const studyFields=[
    "Industrial",
    "Chemical",
    "Mechanical",
    "Civil",
    "Mechatronic",
    "Electrical",
    "Environmental",
    "Data",
    "Mining",
    "Transport",
    "Other",
  ]

  const years = [];
  const universityList = [];
  const currentYear = new Date().getFullYear()
  const startingYear = 1960;
  
  const generateYears = () =>{
    for (let year = startingYear; year <= currentYear; year++) {
      years.push(year);
    }
    years.reverse();
    setGraduationYearArr(years);
  }

  useEffect(() => {
    generateYears();
    // console.log(graduationYearArr)
    getUniversitiesSA().then((universities) => {
      universities.map((uni)=>{
        universityList.push(uni.name)
      });
      universityList.push('Other')
      // console.log(universityList)
      setUniversitiesArr(universityList)
    }).catch((error) => {
      console.error('Error fetching universities:', error);
    });
  },[])

  const checkIfFieldRequired = (qualification) => {
    const foundQual = qualificationsRequestingSpecifics.find((qual) => qualification === qual);
  
    if (foundQual) {
      setStudyFieldRequired(true);
    } else {
      setStudyFieldRequired(false);
    }
  };
  

  useEffect(() => {
    motivationDetails ? setReason(motivationDetails.reason) : setReason("");
    motivationDetails ? setHardest(motivationDetails.hardest) : setHardest("");
    motivationDetails
      ? setQualification(motivationDetails.qualification)
      : setQualification("");
    motivationDetails ? setYear(motivationDetails.year) : setYear("");
    motivationDetails
      ? setInstitution(motivationDetails.institution)
      : setInstitution("");
    checkIfFieldRequired(qualification);
  }, [motivationDetails]);

  useEffect(() => {
    checkIfFieldRequired(qualification);
  }, [qualification]);

  const handleNext = () => {
    if (department === "developer") {
      if (reason.length > 0 && hardest.length > 0) {
        dispatch(setMotivationDetails({ reason, hardest }));
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
        qualification.length > 0 &&
        year.length > 0 &&
        institution.length > 0
      ) {
        const finalQualification = qualification === "Other" 
          ? otherQualification 
          : selectedStudyField === "Other" 
            ? `${qualification} : ${otherStudyField}`
            : selectedStudyField 
              ? `${qualification} : ${selectedStudyField}`
              : qualification;
        const finalUniversity = institution === "Other" ? otherUniversity : institution;
        console.log("Submitting non-developer details:", { qualification: finalQualification, year, institution:finalUniversity });
        dispatch(setMotivationDetails({ qualification: finalQualification, year, institution }));
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
      {department === "developer" ? (
        <React.Fragment>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Why are you applying for this position? (max three sentences)
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <textarea
                onChange={(e) => setReason(e.target.value)}
                value={reason}
                name="reason"
                placeholder="Enter your answer"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              />
            </div>
          </div>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              What is the hardest you've ever worked on something in your life?
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <textarea
                onChange={(e) => setHardest(e.target.value)}
                value={hardest}
                name="hardest"
                placeholder="Enter your answer"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              />
            </div>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Highest qualification obtained
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <select
                onChange={(e) => {
                  // setQualification(e.target.value)
                  if(e.target.value === "Other"){
                    setIsOtherQualification(true);
                    setQualification(e.target.value)
                  }else{
                    setIsOtherQualification(false);
                    setQualification(e.target.value)
                  }
                }}
                value={qualification}
                name="qualification"
                placeholder="Highest qualification"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              >
                <option value="">Select your highest qualification</option>
                  {highestQualificationsArray.map((qual, index) => (
                    <option key={index} value={qual}>
                      {qual}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {studyFieldRequired &&(
            <div className="mx-2 my-2 flex rounded border border-gray-200 bg-white p-1 w-full">
              <select
                onChange={(e) => {
                  if(e.target.value === "Other"){
                    setIsOtherStudyField(true);
                    setSelectedStudyField(e.target.value)
                  }else{
                    setIsOtherStudyField(false);
                    setSelectedStudyField(e.target.value)
                  }
                }}
                value={selectedStudyField}
                name="qualification"
                placeholder="Highest qualification"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              >
                <option value="" disabled>Select your respective field of study</option>
                  {studyFields.map((qual, index) => (
                    <option key={index} value={qual}>
                      {qual}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {isOtherQualfication &&(
            <div className="mx-2">
              <TextField
                placeholder="Please provide qualification"
                value={otherQualification}
                onChange={(e) => setOtherQualification(e.target.value)}
                variant="outlined"
                fullWidth
              />
            </div>
          )}
          {isOtherStudyField &&(
            <div className="mx-2">
              <TextField
                placeholder="Please provide specific field"
                value={otherStudyField}
                onChange={(e) => setOtherStudyField(e.target.value)}
                variant="outlined"
                fullWidth
              />
            </div>
          )}
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              In what year did you obtain this qualification? (Enter graduation
              year if currently studying)
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <select
                onChange={(e) => setYear(e.target.value)}
                value={year}
                name="year"
                placeholder="Qualifying year"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              >
                <option value={""}>In what year did you obtain this qualification? (Enter graduation
                  year if currently studying)
                </option>
                {graduationYearArr.map((year,index)=>(
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}

              </select>
            </div>
          </div>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Institution where you received the qualification
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <select
                onChange={(e) => {
                  // setQualification(e.target.value)
                  if(e.target.value === "Other"){
                    setIsOtherUniversity(true);
                    setInstitution(e.target.value)
                  }else{
                    setIsOtherUniversity(false);
                    setInstitution(e.target.value)
                  }
                }}
                value={institution}
                name="institution"
                placeholder="Qualifying institution"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              >
                <option value=''>Institution where you received the qualification</option>
                {universitiesArr.map((uni,index)=>(
                  <option key={index} value={uni}>
                    {uni}
                  </option>
                ))}

              </select>
            </div>
          </div>
          {isOtherUniversity &&(
            <div className="mx-2">
              <TextField
                placeholder="Please provide university"
                value={otherUniversity}
                onChange={(e) => setOtherUniversity(e.target.value)}
                variant="outlined"
                fullWidth
              />
            </div>
          )}
        </React.Fragment>
      )}

      <FormStepperControl handleNext={handleNext} step={step} />
    </div>
  );
}

export default FormMotivation;
