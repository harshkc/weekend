import React from "react";
import ReactDOM from "react-dom/client";
import JobCard from "./components/JobCard";

const data = {
    id: "cfff35ac-053c-11ef-83d3-06301d0a7178-92010",
    companyLogo: "https://logo.clearbit.com/dropbox.com",
    companyName: "Dropbox",
    role: "frontend",
    location: "delhi ncr",
    minExp: 3,
    minSalary: 41,
    maxSalary: 61,
    description:
        "This is a sample job and you must have displayed it to understand that its not just some random lorem ipsum text but something which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and now in this assignment.",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <JobCard data={data} />
    </React.StrictMode>
);
