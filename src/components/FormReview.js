import { useSelector } from "react-redux";

export function FormReview() {
  const department = useSelector((state) => state.formDetails.department);

  const handleClick = () => {
    window.location.href = "/";
  };

  return (
    <div>
      {department === "developer" ? (
        <>
          <h1 className="text-3xl font-bold mb-3">Thank You!</h1>
          <h3>
            Instructions for your technical test will be emailed to you, along
            with a submission link.
          </h3>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-3 text-center">Thank You!</h1>
          <h3 className="text-center">
            We will be in contact with you shortly.
          </h3>
        </>
      )}
      <div className="horizontal container mt-5 ">
        <div className="container mt-4 mb-8 flex justify-around">
          <button
            onClick={handleClick}
            className="flex items-center cursor-pointer rounded-lg bg-red-600 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
export default FormReview;