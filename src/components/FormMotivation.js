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
import DropdownIcon from "../generalComponents/dropdown";

export function FormMotivation() {

  const [qualification, setQualification] = useState("");
  const [year, setYear] = useState("");
  const [institution, setInstitution] = useState("");
  const [graduationYearArr, setGraduationYearArr] = useState([]);
  const [universitiesArr, setUniversitiesArr] = useState([]);

  const step = useSelector((state) => state.formDetails.step);
  const dispatch = useDispatch();

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
    "Bachelors of Engineering",
    "Bachelor of Engineering Technology",
    "Bachelors of Science Engineering ",
    "Masters of Engineering",
    "PhD in Engineering",
    "Bachelors of Commerce" ,
    "Bachelors of Science",
    "Other",
  ]

//User will have to specify their field related to these qualifications
  const qualificationsRequestingSpecifics=[ 
    "Bachelors of Engineering",
    "Bachelor of Engineering Technology",
    "Bachelors of Science Engineering ",
    "Masters of Engineering",
    "PhD in Engineering",
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
      // First, run the name validation
      const isValid = validations(qualification);
      if (!isValid) {
        // If name is not valid, stop further execution
        return;
      }
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
        // console.log("Submitting non-developer details:", { qualification: finalQualification, year, institution:finalUniversity },otherQualification);
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

  const validations = (qualification)=>{
    if (studyFieldRequired && !selectedStudyField ){
      toast.warning(`Please fill in all fields.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
      return false
    }
    return true;
  }

  return (
    <div className="flex flex-col ">
      <ToastContainer />
        <React.Fragment>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Highest qualification obtained
            </div>
            <div className="my-2 relative flex rounded border border-gray-200 bg-white p-1">
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
                className={'w-full appearance-none p-1 px-2 outline-none text-gray-800'}
              >
                {<option value="" className="text-gray-400">Select</option> }
                  {highestQualificationsArray.map((qual, index) => (
                    <option key={index} value={qual}>
                      {qual}
                    </option>
                  ))}
              </select>
              <DropdownIcon/>
            </div>
          </div>
          {studyFieldRequired &&(
            <React.Fragment>
            <div className="mx-2 mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Field of Study
            </div>
            <div className="mx-2 my-2 relative flex rounded border border-gray-200 bg-white p-1 w-full">
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
                <option value="" disabled>Select</option>
                  {studyFields.map((qual, index) => (
                    <option key={index} value={qual}>
                      {qual}
                    </option>
                  ))}
              </select>
              <DropdownIcon/>
            </div>
            </React.Fragment>
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
            <div className="my-2 relative flex rounded border border-gray-200 bg-white p-1">
              <select
                onChange={(e) => setYear(e.target.value)}
                value={year}
                name="year"
                placeholder="Qualifying year"
                className={'w-full appearance-none p-1 px-2 outline-none text-gray-800'}
              >
                <option value={""} className="text-gray-400">Select</option>
                {graduationYearArr.map((year,index)=>(
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}

              </select>
              <DropdownIcon/>
            </div>
          </div>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Institution where you received the qualification
            </div>
            <div className="my-2 relative flex rounded border border-gray-200 bg-white p-1">
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
                className={'w-full appearance-none p-1 px-2 outline-none text-gray-800'}
              >
                <option value='' className="text-gray-400">Select</option>
                {universitiesArr.map((uni,index)=>(
                  <option key={index} value={uni}>
                    {uni}
                  </option>
                ))}

              </select>
              <DropdownIcon/>
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

      <FormStepperControl handleNext={handleNext} step={step} />
    </div>
  );
}

export default FormMotivation;
