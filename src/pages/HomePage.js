import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setDepartement } from "../store/slices/recruitmentSlice";
import { RecruitmentHeader } from "../components/RecruitmentHeader";
import { Grid, Typography } from "@mui/material";

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
      <div className="bg-white h-screen flex items-center justify-center">
        <div className="mx-auto rounded-2xl bg-white md:w-3/4">
          <h1 className="text-3xl font-bold text-center pb-4">
            Welcome to Convergenc3 recruitment 
          </h1>
          <h2 className="text-center mt-3">
            Are you a consultant or a developer?
          </h2>
          <Grid container spacing={5} sx={{ py: 5 }}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              xl={6}
              lg={6}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoverDev(true)}
              onMouseLeave={() => setHoverDev(false)}
              onClick={selectDev}
            >
              <img
                src="./images/dev.png"
                alt="developer"
                style={{
                  width: "80%",
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
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              xl={6}
              lg={6}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoverConsultant(true)}
              onMouseLeave={() => setHoverConsultant(false)}
              onClick={selectConsultant}
            >
              <img
                src="./images/consultant.png"
                alt="developer"
                style={{
                  width: "80%",
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
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
