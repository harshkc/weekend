import Box from "@mui/material/Box";
import JobCard from "./JobCard";

import {JobData} from "../../types/types";
interface IJobsSectionProps {
    lastJobElementRef: ((node: HTMLDivElement) => void) | null;
    jobsData: JobData[];
    isLoading: boolean;
}

const JobsSection: React.FC<IJobsSectionProps> = (props) => {
    const {jobsData, lastJobElementRef, isLoading} = props;

    if (jobsData.length === 0 && !isLoading) {
        return (
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                <h1>No Jobs Found</h1>
            </Box>
        );
    }

    return (
        <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {jobsData.map((job, index) => {
                if (lastJobElementRef && jobsData.length === index + 1) {
                    return (
                        <div ref={lastJobElementRef} key={job.jdUid + index}>
                            <JobCard data={job} />
                        </div>
                    );
                } else {
                    return <JobCard key={job.jdUid + index} data={job} />;
                }
            })}
        </Box>
    );
};

export default JobsSection;
