export interface JobData {
    jdUid: string;
    jdLink: string;
    jobDetailsFromCompany: string;
    maxJdSalary: number;
    minJdSalary: number;
    salaryCurrencyCode: string;
    location: string;
    minExp: number | null;
    maxExp: number | null;
    jobRole: string;
    companyName: string;
    logoUrl: string;
}

export interface FilterData {
    [key: string]: {
        placeholder: string;
        values: string[];
    };
}

export interface ApiResponse {
    jdList: JobData[];
    totalCount: number;
}

export interface JobsState {
    jobs: JobData[];
    isLoading: boolean;
    hasMore: boolean;
    offset: number;
    limit: number;
    error: string | null;
    filteredJobs: JobData[];
    filters: {
        [key: string]: string[];
    }
}
