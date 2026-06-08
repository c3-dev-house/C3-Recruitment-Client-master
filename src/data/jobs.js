export const jobs = [
  {
    _id: "senior-full-stack-developer",
    title: "Senior Full Stack Developer",
    stream: "Developer",
    experience: "4-7 years",
    duration: "Permanent",
    capacity: 3,
    active: true,
    location: "Hybrid / South Africa",
    description:
      "Build and maintain production web applications across modern React frontends and Node.js service layers. You will work with product, data, and business teams to ship durable software, improve observability, and mentor junior developers.\n\nKey responsibilities:\n• Develop maintainable frontend and backend features\n• Participate in architecture and code review\n• Improve performance, reliability, and delivery practices\n• Translate ambiguous business needs into working systems",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
  },
  {
    _id: "junior-frontend-developer",
    title: "Junior Frontend Developer",
    stream: "Developer",
    experience: "0-1 year",
    duration: "Permanent",
    capacity: 2,
    active: true,
    location: "Hybrid / South Africa",
    description:
      "A growth role for a frontend developer who wants hands-on exposure to production interfaces, component systems, and team delivery. You will pair with senior engineers and learn by shipping real product increments.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Git"],
  },
  {
    _id: "data-scientist",
    title: "Data Scientist",
    stream: "Data",
    experience: "1-3 years",
    duration: "Contract",
    capacity: 1,
    active: true,
    location: "Hybrid / South Africa",
    description:
      "Work with operational and business datasets to produce insight, models, and decision support. This role suits someone comfortable moving from raw data into practical recommendations and working prototypes.",
    skills: ["Python", "Machine Learning", "SQL", "Statistics", "Pandas"],
  },
  {
    _id: "business-analyst",
    title: "Business Analyst",
    stream: "Business",
    experience: "1-3 years",
    duration: "Permanent",
    capacity: 2,
    active: true,
    location: "Hybrid / South Africa",
    description:
      "Bridge stakeholder needs and delivery teams. You will map processes, clarify requirements, support solution design, and help ensure software delivery aligns with measurable business outcomes.",
    skills: ["Business Analysis", "Requirements", "Process Mapping", "Stakeholder Management"],
  },
  {
    _id: "senior-data-engineer",
    title: "Senior Data Engineer",
    stream: "Data",
    experience: "4-7 years",
    duration: "Permanent",
    capacity: 1,
    active: true,
    location: "Hybrid / South Africa",
    description:
      "Design and operate the data pipelines and data quality foundations that make analytical and AI systems dependable. You should be comfortable owning data movement from source through consumption.",
    skills: ["Python", "Spark", "AWS", "Data Pipelines", "Airflow"],
  },
  {
    _id: "inactive-product-manager",
    title: "Product Manager",
    stream: "Business",
    experience: "4-7 years",
    duration: "Permanent",
    capacity: 1,
    active: false,
    location: "Hybrid / South Africa",
    description: "Inactive calibration role. Must not appear in active listings.",
    skills: ["Product Strategy", "Agile", "User Research"],
  },
];

export const activeJobs = jobs.filter((job) => job.active);

export function findJobById(jobId) {
  return jobs.find((job) => job._id === jobId);
}

export function departmentForStream(stream) {
  if (stream === "Developer") return "developer";
  if (stream === "Data") return "data";
  return "consultant";
}
