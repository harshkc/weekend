import {useState} from "react";
import {FormControl, Select, MenuItem, SelectChangeEvent, OutlinedInput, Chip} from "@mui/material";

import {useDispatch} from "react-redux";
import {applyFilters} from "../../redux/slices/jobsSlice";

interface IDropDownProps {
    filterKey: string;
    placeholder: string;
    values: string[];
    isOnlySingleSelection?: boolean;
}

const Dropdown: React.FC<IDropDownProps> = (props) => {
    const dispatch = useDispatch();
    const [selectedvalues, setSelectedvalues] = useState<string[]>([]);

    const {values, placeholder, isOnlySingleSelection = false, filterKey} = props;

    const handleSelection = (event: SelectChangeEvent<typeof selectedvalues>) => {
        const {
            target: {value},
        } = event;

        let newSelectedValues = [...(value as string[])],
            payload = {key: filterKey, value: newSelectedValues};

        if (isOnlySingleSelection) {
            newSelectedValues = [value[value.length - 1] as string];
            payload = {key: filterKey, value: newSelectedValues};
        }

        setSelectedvalues(newSelectedValues);
        dispatch(applyFilters(payload));
    };

    const handleDelete = (value: string) => {
        const newValues = selectedvalues.filter((item) => item !== value);
        setSelectedvalues(newValues);
        dispatch(applyFilters({key: filterKey, value: newValues}));
    };

    return (
        <FormControl>
            <Select
                sx={{minWidth: 180, height: 40}}
                multiple
                value={selectedvalues}
                onChange={handleSelection}
                input={
                    <OutlinedInput
                        sx={{
                            "& .MuiOutlinedInput-input": {
                                padding: "10px 14px",
                            },
                        }}
                        notched={selectedvalues.length === 0}
                    />
                }
                displayEmpty
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <span style={{color: "#d0d0d0", fontSize: "12px"}}>{placeholder}</span>;
                    }
                    return selected.map((value) => (
                        <Chip
                            sx={{
                                height: 26,
                                borderRadius: "4px",
                                padding: "0 8px",
                                margin: "2px",
                                fontSize: "10px",
                                justifyContent: "space-between",
                            }}
                            key={value}
                            label={value}
                            onDelete={() => handleDelete(value)}
                            onMouseDown={(e) => {
                                e.stopPropagation();
                            }}
                        />
                    ));
                }}
            >
                {values
                    .filter((item) => !selectedvalues.includes(item))
                    .map((item) => (
                        <MenuItem key={item} value={item.toLowerCase()}>
                            {item}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
};

export default Dropdown;
