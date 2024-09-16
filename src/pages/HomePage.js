import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setDepartement } from "../store/slices/recruitmentSlice";
import { RecruitmentHeader } from "../components/RecruitmentHeader";
import { Grid, Typography,Box,Link, colors } from "@mui/material";

export function HomePage() {
  const [dev, setDev] = useState(false);
  const [consultant, setConsultant] = useState(false);
  const [hoverDev, setHoverDev] = useState(false);
  const [hoverConsultant, setHoverConsultant] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const selectConsultant = () => {
    dispatch(setDepartement("consultant"));
    navigate("/form");
  };

  const selectDev = () => {
    dispatch(setDepartement("developer"));
      navigate("/form");
  };

  return (
    <div className="h-screen">
      <RecruitmentHeader />
      <ToastContainer />
      <div>
        <div className="bg-white flex items-center justify-center" style ={{minHeight: '90vh'}}>
          <div className="mx-auto rounded-2xl bg-white md:w-3/4">
            <h1 className="text-3xl font-bold text-center pb-4">
              Welcome to Convergenc3 recruitment 
            </h1>
            <h2 className="text-center mt-3">
              Are you a consultant or a developer?
            </h2>
            <div className="flex justify-center" style={{marginTop:"5%"}}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  marginRight:"5%",
                }}
                onMouseEnter={() => setHoverDev(true)}
                onMouseLeave={() => setHoverDev(false)}
                onClick={selectDev}
              >
                <img
                  src="./images/dev.png"
                  alt="developer"
                  style={{
                    width: "15rem",
                    filter: hoverDev || dev ? "grayscale(0%)" : "grayscale(100%)",
                    transition: "all 0.5s ease",
                  }}
                />
                <Typography
                  variant="h6"
                  component="h6"
                  className="text-center"
                  sx={{ pt: 3, color: hoverDev || dev ? "#d92027" : "black" }}
                >
                  Developer
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  marginLeft:"5%",
                }}
                onMouseEnter={() => setHoverConsultant(true)}
                onMouseLeave={() => setHoverConsultant(false)}
                onClick={selectConsultant}
              >
                <img
                  src="./images/consultant.png"
                  alt="developer"
                  style={{
                    width: "15rem",
                    filter:
                      hoverConsultant || consultant
                        ? "grayscale(0%)"
                        : "grayscale(100%)",
                    transition: "all 0.5s ease",
                  }}
                />
                <Typography
                  variant="h6"
                  component="h6"
                  className="text-center"
                  sx={{
                    pt: 3,
                    color: hoverConsultant || consultant ? "#d92027" : "black",
                  }}
                >
                  Consultant
                </Typography>
              </div>
            </div>
            
            
          </div>
        </div>
        <Box 
          sx={{ 
            marginLeft:'5%',
            marginRight:'5%',
            marginBottom:'100px',
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            backgroundColor: '#f9f9f9', 
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            textAlign:'center' 
          }}>
          <Typography variant="body1" gutterBottom sx={{fontSize:"12px"}}>
            <strong>Data Protection Notice: </strong> 
             We value your privacy and are committed to protecting your personal information in accordance with the Protection of Personal Information Act (POPIA). 
          </Typography>
          <Typography variant="body2" sx={{fontSize:"12px"}}>
            By proceeding with this form, you agree to our data collection practices as outlined in our 
            {' '}
            <Link href="/legal" target="_blank" underline="always">
              POPIA policy
            </Link>.
          </Typography>
        </Box>
      </div>
    </div>
  );
}
export default HomePage;
