import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const url = "https://api.portal.c3-dev-house.com/v1"; // * production
const url = "http://localhost:3001/v1"; // * development
// const url = "https://uat.api.portal.c3-dev-house.com/v1"; // * uat

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
      transcript,
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
        transcript,
      };

      const res = await axios.post(`${url}/recruitment/submitDevForm`, data);
      // Initial email sent out to applicant. Ensure that stage corresponds to any changes made on portal frontend stages
      const emailApplicant = await axios.post(
        `${url}/recruitment/sendDevEmail`, 
        { email: data.email,name:data.name,stage:"CV to be screened" }
      );

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
      transcript,
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
        transcript,
      };

      const res = await axios.post(
        `${url}/recruitment/submitConsultantForm`,
        data
      );
      // Initial email sent out to applicant. Ensure that stage corresponds to any changes made on portal frontend stages
      const emailApplicant = await axios.post(
        `${url}/recruitment/sendConsultantEmail`, 
        { email: data.email,name:data.name,stage:"CV to be screened" }
      );

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
  async ({ email}, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${url}/recruitment/checkRecruitEmail`,
        { email },
        {
          headers: {
            'auth-token': `${localStorage.getItem('token')}`,  // Add the token to the headers
          },
        }
      );
      console.log("response", res);
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const isNewApplicant = async (email, name, cell) => {
  try {
    const token = localStorage.getItem('token'); // Get token from local storage
    console.log(token)
    const res = await axios.post(
      `${url}/recruitment/isNewApplicant`,
      {
        email,
        name,
        cell,
      },
      {
        headers: {
          'auth-token': token,  // Add the token to the headers
        },
      }
    );
    console.log("response", res);
    return res.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    console.error('Error:', error.response.data);
    throw error.response.data;
  }
}


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

// export const getUniversitiesSA = async () => {
//   try {
//     const res = await axios.get(`${url}/recruitment/getAllUniversities`)//`${url}/recruitment/getAllUniversities`); `http://universities.hipolabs.com/search?country=South%20Africa`
//     console.log(res);
//     return res.data;
//   } catch (error) {
//     if (!error.response) {
//       throw error;
//     }
//     return error.response.data.message;
//   }
// };

export const getCountries = async () => {
  try {
    const res = await axios.get(`https://restcountries.com/v3.1/all`)
    return res.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return error.response.data.message;
  }
};
