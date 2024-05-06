import {Box} from "@mui/material";
import Dropdown from "../common/DropDown";

import {filterData} from "../../helpers/filterCategories";

const FilterSection = () => {
    const filterKeys = Object.keys(filterData) as string[];
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                flexWrap: "wrap",
                margin: "1rem auto",
                maxWidth: "80%",
            }}
        >
            {filterKeys.map((filter: string) => {
                const {placeholder, values, isOnlySingleSelection = false} = filterData[filter];
                return (
                    <Dropdown
                        key={filter}
                        filterKey={filter}
                        placeholder={placeholder}
                        values={values}
                        isOnlySingleSelection={isOnlySingleSelection}
                    />
                );
            })}
        </Box>
    );
};

export default FilterSection;
