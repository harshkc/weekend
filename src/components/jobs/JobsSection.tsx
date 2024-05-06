import Box from "@mui/material/Box";
import JobCard from "./JobCard";

import {JobData} from "../../types/types";

interface IJobsSectionProps {
    lastJobElementRef: (node: HTMLDivElement) => void;
    jobsData: JobData[];
}

const JobsSection: React.FC<IJobsSectionProps> = (props) => {
    const {jobsData, lastJobElementRef} = props;

    return (
        <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {jobsData.map((job, index) => {
                if (lastJobElementRef && jobsData.length === index + 1) {
                    return (
                        <div ref={lastJobElementRef} key={job.jdUid}>
                            <JobCard data={job} />
                        </div>
                    );
                } else {
                    return <JobCard key={job.jdUid} data={job} />;
                }
            })}
        </Box>
    );
};

export default JobsSection;
