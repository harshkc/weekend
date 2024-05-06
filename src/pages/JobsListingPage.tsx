import {useEffect, useRef, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";

import {CircularProgress, Typography} from "@mui/material";
import JobsSection from "../components/jobs/JobsSection";
import FilterSection from "../components/filters/FilterSection";

import {RootState, AppDispatch} from "../redux/store/jobsStore";
import {fetchJobs} from "../redux/slices/jobsSlice";

const JobsListingPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {jobs, isLoading, hasMore, error, filteredJobs, isFilterApplied} = useSelector(
        (state: RootState) => state.jobs
    );
    const observer = useRef<IntersectionObserver | null>(null);

    const lastJobElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (isLoading) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    dispatch(fetchJobs());
                }
            });

            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore, dispatch]
    );

    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    return (
        <>
            <Typography sx={{textAlign: "center", margin: "2rem 0", fontSize: "2rem", fontWeight: "600"}}>
                Weekend
            </Typography>
            <FilterSection />
            <JobsSection
                lastJobElementRef={isFilterApplied ? null : lastJobElementRef}
                jobsData={isFilterApplied ? filteredJobs : jobs}
                isLoading={isLoading}
            />
            {error && <div>Error: {error}</div>}
            {isLoading && (
                <CircularProgress
                    sx={{
                        margin: "5rem auto",
                        color: "rgb(85, 239, 196)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                />
            )}
        </>
    );
};

export default JobsListingPage;
