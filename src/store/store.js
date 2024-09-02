import { configureStore } from "@reduxjs/toolkit";
import {
  recruitmentSlice,
  submitSlice,
  aptitudeSlice,
  checkEmailSlice,
} from "./slices/recruitmentSlice";

export const RecruitmentStore = configureStore({
  reducer: {
    formDetails: recruitmentSlice.reducer,
    repoLink: submitSlice.reducer,
    aptitudeQuestions: aptitudeSlice.reducer,
    checkEmail: checkEmailSlice.reducer,
  },
});

export default RecruitmentStore;
