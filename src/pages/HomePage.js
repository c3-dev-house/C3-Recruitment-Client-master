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
    if (consultant) {
      setConsultant(false);
    } else {
      setConsultant(true);
      dev && setDev(false);
    }
  };

  const selectDev = () => {
    if (dev) {
      setDev(false);
    } else {
      setDev(true);
      consultant && setConsultant(false);
    }
  };

  const handleClick = () => {
    if (consultant) {
      dispatch(setDepartement("consultant"));
      navigate("/form");
    } else if (dev) {
      dispatch(setDepartement("developer"));
      navigate("/form");
    } else {
      toast.error(`Please select a role.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="h-screen">
      <RecruitmentHeader />
      <ToastContainer />
      <div className="bg-white h-screen flex items-center justify-center">
        <div className="mx-auto rounded-2xl bg-white md:w-1/2">
          <h1 className="text-3xl font-bold text-center">
            Welcome to Convergenc3 recruitment
          </h1>
          <p className="text-center mt-3">
            Are you a consultant or a developer?
          </p>
          {/* <div className="my-3 p-10 flex h-full">
            <div className="flex-1 bg-white h-full p-5">
              <div
                onClick={selectDev}
                className={`p-5 rounded-xl flex flex-col items-center justify-between h-full cursor-pointer ${
                  dev
                    ? "bg-red-50 border-2 border-red-600"
                    : "bg-white border border-slate-300"
                }`}
              >
                <div className="basis-10/12 w-full flex items-center justify-center">
                  <img
                    src="./images/dev.svg"
                    width="180"
                    height="100"
                    alt="Convergence Logo"
                  />
                </div>
                <h2 className="basis-2/12 flex items-end font-semibold">
                  Developer
                </h2>
              </div>
            </div>
            <div className="flex-1 bg-white h-full p-5">
              <div
                onClick={selectConsultant}
                className={`p-5 rounded-xl flex flex-col items-center justify-between h-full cursor-pointer ${
                  consultant
                    ? "bg-red-50 border-2 border-red-600"
                    : "bg-white border border-slate-300"
                }`}
              >
                <div className="basis-10/12 w-full flex items-center justify-center">
                  <img
                    src="./images/consultant.svg"
                    width="180"
                    height="120"
                    alt="Convergence Logo"
                  />
                </div>
                <h2 className="basis-2/12 flex items-end font-semibold">
                  Consultant
                </h2>
              </div>
            </div>
          </div> */}
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
          <div className="horizontal container mt-5 ">
            <div className="container mt-4 mb-8 flex justify-around">
              <button
                onClick={handleClick}
                className="flex items-center cursor-pointer rounded-lg bg-red-600 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
              >
                Continue <FaLongArrowAltRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
