import {useState} from "react";
import {FormControl, Select, MenuItem, SelectChangeEvent, OutlinedInput, Chip} from "@mui/material";

interface IDropDownProps {
    placeholder: string;
    values: string[];
}

const Dropdown: React.FC<IDropDownProps> = (props) => {
    const [selectedvalues, setSelectedvalues] = useState<string[]>([]);

    const {values, placeholder} = props;

    const handleChange = (event: SelectChangeEvent<typeof selectedvalues>) => {
        const {
            target: {value},
        } = event;
        setSelectedvalues(typeof value === "string" ? value.split(",") : value);
    };

    return (
        <FormControl>
            <Select
                sx={{minWidth: 180, height: 40}}
                multiple
                value={selectedvalues}
                onChange={handleChange}
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
                            onDelete={() => {}}
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
