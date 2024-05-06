import {Card, CardContent, Typography, Button, Chip, Grid, Avatar} from "@mui/material";
import {JobData} from "../types/types";

interface JobCardProps {
    data: JobData;
}

const capitalize = (str: string) => {
    if (!str) return "";
    const words = str.split(" ");
    const capitalizedWords = words.map((word) => word[0].toUpperCase() + word.slice(1));
    return capitalizedWords.join(" ");
};

const JobCard = ({data}: JobCardProps) => {
    const {
        jdLink = "",
        jobDetailsFromCompany = "",
        maxJdSalary = 0,
        minJdSalary = 0,
        salaryCurrencyCode = "",
        location = "",
        minExp = 0,
        jobRole = "",
        companyName = "",
        logoUrl = "",
    } = data;
    return (
        <Card
            sx={{
                maxWidth: 330,
                maxHeight: 700,
                margin: 2,
                boxShadow: 2,
                borderRadius: "20px",
                transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                "&:hover": {
                    boxShadow: "0px 6px 12px rgba(0,0,0,0.2)",
                    transform: "scale(1.003)",
                },
            }}
        >
            <CardContent sx={{position: "relative", padding: "20px !important"}}>
                <Chip
                    label='⏳ Posted 10 days ago'
                    size='small'
                    sx={{
                        mb: 2,
                        backgroundColor: "transparent",
                        color: "#0f0f0f",
                        border: "1px solid #d0d0d0",
                        borderRadius: 2.5,
                        fontSize: 10,
                        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                    }}
                />
                <Grid sx={{display: "flex", alignItems: "center"}}>
                    <Avatar
                        src={logoUrl}
                        alt='logo'
                        sx={{width: 60, height: 60, borderRadius: 0, marginRight: 2}}
                    />
                    <Grid>
                        <Typography
                            sx={{fontSize: 14, color: "#8b8b8b", fontWeight: 600, marginBottom: "3px"}}
                        >
                            {capitalize(companyName)}
                        </Typography>
                        <Typography sx={{fontSize: 14, lineHeight: 1.5, color: "#000000"}}>
                            {capitalize(jobRole)}
                        </Typography>
                        <Typography sx={{fontSize: 12}}>{capitalize(location)}</Typography>
                    </Grid>
                </Grid>
                <Grid sx={{mt: 1, display: "flex"}}>
                    <Typography
                        sx={{fontSize: 14, color: "rgb(77, 89, 106)", lineHeight: 1.43, margin: "8px 0"}}
                    >
                        Estimated Salary: {salaryCurrencyCode} {minJdSalary && `${minJdSalary} -`}{" "}
                        {maxJdSalary} LPA ✅
                    </Typography>
                </Grid>
                <Typography sx={{fontSize: 16}}>About Company:</Typography>
                <Typography sx={{fontSize: 14}}>
                    {jobDetailsFromCompany.slice(0, 450)}
                    <Grid
                        sx={{
                            padding: "28px 20px 0 0",
                            position: "absolute",
                            bottom: "121px",
                            background: "linear-gradient(to top, white, rgba(255, 255, 255, 0.8))",
                            width: "90%",
                            textAlign: "center",
                            zIndex: "5",
                            color: "blue",
                            fontSize: 14,
                            fontWeight: 400,
                        }}
                    >
                        Show More
                    </Grid>
                </Typography>
                <Typography
                    sx={{
                        margin: "10px 0 3px 0",
                        fontSize: 14,
                        color: "#8b8b8b",
                        fontWeight: 600,
                        letterSpacing: "1px",
                    }}
                >
                    Minimum Experience
                </Typography>
                <Typography sx={{fontSize: 14}}>{minExp} years</Typography>

                <Button
                    variant='contained'
                    sx={{
                        margin: "10px 0 0 0",
                        backgroundColor: "rgb(85, 239, 196)",
                        color: "#000",
                        width: "100%",
                        borderRadius: "8px",
                        boxShadow: "none",
                        "&:hover": {
                            backgroundColor: "rgb(85, 239, 196)",
                            boxShadow: "none",
                        },
                        textTransform: "none",
                        fontSize: "14px",
                        padding: "8px 18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onClick={() => {
                        window.open(jdLink, "_blank");
                    }}
                >
                    ⚡ Easy Apply
                </Button>
            </CardContent>
        </Card>
    );
};

export default JobCard;
