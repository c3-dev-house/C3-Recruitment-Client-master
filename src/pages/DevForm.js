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
import { FormBackgroundAndProfile } from "../components/Background";

import { Container } from "@mui/material";

export function DevForm({ selectedJob = null }) {
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
    "Qualification",
    "Administrative Questions",
    "Background and Profile",
    "Upload CV",
    "Success",
  ];

  const displayStep = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return <FormPersonalDetails />;
      case 2:
        return <FormPositionDetails selectedJob={selectedJob} />;
      case 3:
        return <FormMotivation />;
      case 4:
        return <FormAvailability />;
      case 5:
        return <FormBackgroundAndProfile />;
      case 6:
        return <FormUpload selectedJob={selectedJob} />;
      case 7:
        return <FormReview />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen">
      <RecruitmentHeader />
      {selectedJob && (
        <div className="selected-job-banner">
          <span>Target role</span>
          <strong>{selectedJob.title}</strong>
          <em>{selectedJob.stream} / {selectedJob.experience}</em>
        </div>
      )}
      <Container sx={{ pt: selectedJob ? 8 : 15 }}>
        {step !== 6 && <FormStepper steps={steps} currentStep={step} />}
        <div className="pt-10">{displayStep(step)}</div>
      </Container>
    </div>
  );
}
export default DevForm;
