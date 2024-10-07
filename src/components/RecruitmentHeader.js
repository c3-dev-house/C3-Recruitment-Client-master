export function RecruitmentHeader() {
  return (
    <nav className="mt-4 flex items-center justify-between flex-wrap px-20 py-3 left-0 top-0 w-full bg-white z-50 shadow-md">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img
          src="./images/new_logo.png"
          width="200"
          height="120"
          alt="Convergence Logo"
        />
      </div>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow"></div>
        <div>
          <a
            href="mailto:recruitment@convergenc3.com"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-red-600 border-red-600 hover:border-transparent hover:text-white hover:bg-red-600 mt-4 lg:mt-0"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

export default RecruitmentHeader;
