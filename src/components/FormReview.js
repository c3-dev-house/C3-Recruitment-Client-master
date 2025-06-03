import React from "react";
import { useSelector } from "react-redux";

export function FormReview() {
  const error = useSelector((state) => state.formDetails.error);
  const department = useSelector((state) => state.formDetails.department);
  const loading = useSelector((state) => state.formDetails.loading);

  const handleClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="mt-4 text-center">
      {loading === "loading" && <p>Submitting your form, please wait...</p>}

      {loading === "error" && (
        <div>
          <h1 className="text-3xl font-bold mb-3 text-red-600">Submission Failed</h1>
          <p>{"Something went wrong. Please try again."}</p>
        </div>
      )}

      {loading === "success" && (
        <div>
          <h1 className="text-3xl font-bold mb-3">Submission Complete!</h1>
          <h3>
            Thank you for submitting your application
            {department ? ` for the ${department} role.` : "."} We will be in contact with you shortly.
          </h3>
        </div>
      )}

      {(loading === "idle" || loading === "success" || loading === "error") && (
        <div className="container mt-5 flex justify-center">
          <button
            onClick={handleClick}
            className="rounded-lg bg-red-600 py-2 px-4 font-semibold uppercase text-white hover:bg-slate-700 transition duration-200"
          >
            Exit
          </button>
        </div>
      )}
    </div>
  );
}

export default FormReview;
