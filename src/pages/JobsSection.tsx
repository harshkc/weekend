import React, {useEffect, useRef, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchJobs} from "../redux/slices/jobsSlice";
import {RootState, AppDispatch} from "../redux/store/jobsStore";
import JobCard from "../components/JobCard";

const JobsSection: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {jobs, isLoading, hasMore, error} = useSelector((state: RootState) => state.jobs);
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

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {jobs.map((job, index) => {
                if (jobs.length === index + 1) {
                    return (
                        <div ref={lastJobElementRef} key={job.jdUid}>
                            <JobCard data={job} />
                        </div>
                    );
                } else {
                    return <JobCard key={job.jdUid} data={job} />;
                }
            })}
            {isLoading && <div>Loading...</div>}
        </div>
    );
};

export default JobsSection;
