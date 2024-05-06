import {useEffect, useRef, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";

import JobsSection from "../components/jobs/JobsSection";
import Dropdown from "../components/common/DropDown";

import {filterData} from "../helpers/filterCategories";
import {FilterData} from "../types/types";

import {fetchJobs} from "../redux/slices/jobsSlice";
import {RootState, AppDispatch} from "../redux/store/jobsStore";

const JobsListingPage = () => {
    const filterKeys = Object.keys(filterData) as (keyof FilterData)[];
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
            {filterKeys.map((key) => {
                return (
                    <Dropdown
                        key={key}
                        placeholder={filterData[key].placeholder}
                        values={filterData[key].values}
                    />
                );
            })}
            <JobsSection lastJobElementRef={lastJobElementRef} jobsData={jobs} />
        </div>
    );
};

export default JobsListingPage;
