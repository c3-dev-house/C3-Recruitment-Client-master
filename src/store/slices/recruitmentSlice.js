import { createSlice } from "@reduxjs/toolkit";
import {
  submitDevForm,
  checkRecruitId,
  submitRepoLink,
  submitConsultantForm,
  getAptitudeQuestions,
  checkRecruitEmail,
} from "../actions/recruitmentActions";

export const checkEmailSlice = createSlice({
  name: "checkEmail",
  initialState: {
    error: null,
    loading: "idle",
  },
  reducers: {
    reset: (state) => {
      state.error = null;
      state.loading = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkRecruitEmail.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(checkRecruitEmail.fulfilled, (state, action) => {
        state.loading = "success";
      })
      .addCase(checkRecruitEmail.rejected, (state, action) => {
        state.loading = "error";
        if (action.payload) {
          state.error = { message: action.payload };
        } else {
          state.error = { message: action.error };
        }
      });
  },
});

const initialState = {
  personalDetails: null,
  positionDetails: null,
  motivationDetails: null,
  interviewDate: null,
  uploadCV: null,
  department: null,
  step: 1,
  loading: "idle",
  error: null,
};

export const recruitmentSlice = createSlice({
  name: "recruitment",
  initialState,
  reducers: {
    setPersonalDetails: (state, action) => {
      state.personalDetails = action.payload;
    },
    setPositionDetails: (state, action) => {
      state.positionDetails = action.payload;
    },
    setMotivationDetails: (state, action) => {
      state.motivationDetails = action.payload;
    },
    setInterviewDateDetails: (state, action) => {
      state.interviewDate = action.payload;
    },
    setUploadCV: (state, action) => {
      state.uploadCV = action.payload;
    },
    setDepartement: (state, action) => {
      state.department = action.payload;
    },
    nextStep: (state) => {
      state.step++;
    },
    previousStep: (state) => {
      state.step--;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitDevForm.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(submitDevForm.fulfilled, (state, action) => {
        state.loading = "success";
      })
      .addCase(submitDevForm.rejected, (state, action) => {
        state.loading = "error";
        if (action.payload) {
          state.error = { message: action.payload };
        } else {
          state.error = { message: action.error };
        }
      })
      .addCase(submitConsultantForm.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(submitConsultantForm.fulfilled, (state, action) => {
        state.loading = "success";
      })
      .addCase(submitConsultantForm.rejected, (state, action) => {
        state.loading = "error";
        if (action.payload) {
          state.error = { message: action.payload };
        } else {
          state.error = { message: action.error };
        }
      });
  },
});

const initialAptitudeState = {
  questions: [],
  score: 0,
  loading: "idle",
  error: null,
};

export const aptitudeSlice = createSlice({
  name: "aptitude",
  initialState: initialAptitudeState,
  reducers: {
    addScore: (state, action) => {
      state.score++;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAptitudeQuestions.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(getAptitudeQuestions.fulfilled, (state, action) => {
        state.loading = "success";
        state.questions = action.payload;
      })
      .addCase(getAptitudeQuestions.rejected, (state, action) => {
        state.loading = "error";
        if (action.payload) {
          state.error = { message: action.payload };
        } else {
          state.error = { message: action.error };
        }
      });
  },
});

const initialSubmitState = {
  checkLoading: "idle",
  checkError: null,
  submitLoading: "idle",
  submitError: null,
};

export const submitSlice = createSlice({
  name: "submit",
  initialState: initialSubmitState,
  extraReducers: (builder) => {
    builder
      .addCase(checkRecruitId.pending, (state, action) => {
        state.checkLoading = "loading";
      })
      .addCase(checkRecruitId.fulfilled, (state, action) => {
        state.checkLoading = "success";
      })
      .addCase(checkRecruitId.rejected, (state, action) => {
        state.checkLoading = "error";
        if (action.payload) {
          state.checkError = { message: action.payload };
        } else {
          state.checkError = { message: action.error };
        }
      })
      .addCase(submitRepoLink.pending, (state, action) => {
        state.submitLoading = "loading";
      })
      .addCase(submitRepoLink.fulfilled, (state, action) => {
        state.submitLoading = "success";
      })
      .addCase(submitRepoLink.rejected, (state, action) => {
        state.submitLoading = "error";
        if (action.payload) {
          state.submitError = { message: action.payload };
        } else {
          state.submitError = { message: action.error };
        }
      });
  },
});

export const {
  setPersonalDetails,
  setPositionDetails,
  setMotivationDetails,
  setInterviewDateDetails,
  setUploadCV,
  setDepartement,
  nextStep,
  previousStep,
} = recruitmentSlice.actions;

export const { addScore } = aptitudeSlice.actions;
export const { reset } = checkEmailSlice.actions;
