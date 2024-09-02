import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormPersonalDetails } from "../components/FormPersonalDetails";
import { FormPositionDetails } from "../components/FormPositionDetails";
import { FormMotivation } from "../components/FormMotivation";
import { FormAvailability } from "../components/FormAvailability";
import { FormUpload } from "../components/FormUpload";
import { FormStepper } from "../components/FormStepper";
import { FormReview } from "../components/FormReview";
import { RecruitmentHeader } from "../components/RecruitmentHeader";
import { AptitudeTest } from "../components/AptitudeTest";

import { Container } from "@mui/material";

export function DevForm() {
  const step = useSelector((state) => state.formDetails.step);
  const department = useSelector((state) => state.formDetails.department);

  const navigate = useNavigate();

  useEffect(() => {
    if (!department) {
      navigate("/");
    }
  }, [navigate, department]);

  const steps = [
    "Personal Details",
    "Position Details",
    `${department === "developer" ? "Motivation" : "Qualification"}`,
    `${
      department === "developer"
        ? "Interview Availability"
        : "Administrative Questions"
    }`,
    // "Aptitude Test",
    "Upload CV",
    "Success",
  ];

  const displayStep = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return <FormPersonalDetails />;
      case 2:
        return <FormPositionDetails />;
      case 3:
        return <FormMotivation />;
      case 4:
        return <FormAvailability />;
      // case 5:
      //   return <AptitudeTest />;
      case 5:
        return <FormUpload />;
      case 6:
        return <FormReview />;
      default:
    }
  };

  return (
    <div className="h-screen">
      <RecruitmentHeader />
      <Container sx={{ pt: 15 }}>
        {step !== 5 && <FormStepper steps={steps} currentStep={step} />}
        <div className="m-5 p-10">{displayStep(step)}</div>
      </Container>
    </div>
  );
}
export default DevForm;
