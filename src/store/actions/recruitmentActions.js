import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const url = "https://api.portal.c3-dev-house.com/v1"; // * production
// const url = "http://localhost:3001/v1"; // * development
const url = "https://uat.api.portal.c3-dev-house.com/v1"; // * uat

export const submitDevForm = createAsyncThunk(
  "recruitment/submitDevForm",
  async (
    {
      name,
      email,
      cell,
      dob,
      nationality,
      gender,
      experience,
      currentlyEmployed,
      disability,
      disabilityType,
      reffered,
      refferedBy,
      highestQualification,
      highestQualificationYear,
      highestQualificationInstitution,
      currentAreaOfResidence,
      abilityToRelocate,
      salaryExpectation,
      notice,
      workExperience,
      goals,
      repository,
      cv,
    },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        name,
        email,
        cell,
        dob,
        nationality,
        gender,
        experience,
        currentlyEmployed,
        disability,
        disabilityType,
        reffered,
        refferedBy,
        highestQualification,
        highestQualificationYear,
        highestQualificationInstitution,
        currentAreaOfResidence,
        abilityToRelocate,
        salaryExpectation,
        notice,
        workExperience,
        goals,
        repository,
        cv,
      };

      const res = await axios.post(`${url}/recruitment/submitDevForm`, data);
      // console.log("Data",data)
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const submitConsultantForm = createAsyncThunk(
  "recruitment/submitConsultantForm",
  async (
    {
      name,
      email,
      cell,
      dob,
      nationality,
      gender,
      experience,
      currentlyEmployed,
      disability,
      disabilityType,
      reffered,
      refferedBy,
      highestQualification,
      highestQualificationYear,
      highestQualificationInstitution,
      currentAreaOfResidence,
      abilityToRelocate,
      workExperience,
      goals,
      salaryExpectation,
      notice,
      cv,
    },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        name,
        email,
        cell,
        dob,
        nationality,
        gender,
        experience,
        currentlyEmployed,
        disability,
        disabilityType,
        reffered,
        refferedBy,
        highestQualification,
        highestQualificationYear,
        highestQualificationInstitution,
        currentAreaOfResidence,
        abilityToRelocate,
        workExperience,
        goals,
        salaryExpectation,
        notice,
        cv,
      };

      const res = await axios.post(
        `${url}/recruitment/submitConsultantForm`,
        data
      );
      // console.log("Data",data)
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const checkRecruitId = createAsyncThunk(
  "submit/checkRecruitId",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}/recruitment/checkRecruitId`, { id });

      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const checkRecruitEmail = createAsyncThunk(
  "submit/checkRecruitEmail",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}/recruitment/checkRecruitEmail`, {
        email,
      });

      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const submitRepoLink = createAsyncThunk(
  "submit/submitRepoLink",
  async ({ id, repository }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}/recruitment/submitRepoLink`, {
        id,
        repository,
      });

      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAptitudeQuestions = createAsyncThunk(
  "aptitude/getQuestions",
  async () => {
    try {
      const res = await axios.get(`${url}/aptitude/getAptitudeQuestions`);

      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return error.response.data.message;
    }
  }
);

export const getUniversitiesSA = async () => {
  try {
    const res = await axios.get(`http://universities.hipolabs.com/search?country=South%20Africa`)//`${url}/recruitment/getAllUniversities`); `http://universities.hipolabs.com/search?country=South%20Africa`
    console.log(res);
    return res.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return error.response.data.message;
  }
};
