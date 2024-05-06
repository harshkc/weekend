import { FilterData } from "../types/types";

export const filterData : FilterData  = {
    jobRole: {
        placeholder: "Select Role",
        values: ["Frontend", "Backend", "FullStack", "Ios", "Android", "React Native", "Flutter"],
    },
    minExp: {
        placeholder: "Min Experience Level",
        values: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        isOnlySingleSelection: true,
    },
    location: {
        placeholder: "Select Location",
        values: [
            "Bangalore",
            "Chennai",
            "Delhi",
            "Mumbai",
            "Pune",
            "Hyderabad",
            "Kolkata",
            "Gurgaon",
            "Noida",
            "remote"
        ],
    },
    minJdSalary: {
        placeholder: "Min Base Pay",
        values: ["10", "20", "30", "40", "50", "60", "70", "80", "90+"],
        isOnlySingleSelection: true,
    },
};
