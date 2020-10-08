import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import PeopleIcon from "@material-ui/icons/People";
import Email from "@material-ui/icons/Email";
// import {
//     MuiPickersUtilsProvider,
//     KeyboardTimePicker,
//     KeyboardDatePicker,
// } from "@material-ui/pickers";
const useStyles = makeStyles((theme) => ({
    country: {
        marginTop: "60px",
        marginBottom: "10px",
        width: "320px",
    },
    city: {
        // marginTop: "80px",
        marginBottom: "20px",
        width: "320px",
    },
    birthDate: {
        // marginTop: "80px",
        marginBottom: "10px",
        // width: "320px",
    },
    phoneNumber: {
        // marginTop: "80px",
        // marginBottom: "20px",
        width: "320px",
    },
}));
function PersonalDetails({ values, handleChange, prevStep, nextStep }) {
    const classes = useStyles();

    return (
        <div className="containerPersonalDetails">
            <FormControl className={classes.country}>
                <InputLabel style={{ color: "grey" }}>Countey</InputLabel>
                <Input
                    type="text"
                    value={values.country}
                    required
                    onChange={handleChange("country")}
                    endAdornment={
                        <InputAdornment
                            style={{ opacity: "0.7" }}
                            position="end"
                        >
                            <PeopleIcon />
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl className={classes.city}>
                <InputLabel style={{ color: "grey" }}>City</InputLabel>
                <Input
                    type="text"
                    value={values.city}
                    required
                    onChange={handleChange("city")}
                    endAdornment={
                        <InputAdornment
                            style={{ opacity: "0.7" }}
                            position="end"
                        >
                            <PeopleIcon />
                        </InputAdornment>
                    }
                />
            </FormControl>
            <label>Enter Birth Date</label>
            <input
            className={classes.birthDate}
                type="date"
                value={values.birthDate}
                onChange={handleChange("birthDate")}
            />
            {/* <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                // value={selectedDate}
                // onChange={handleDateChange}
                KeyboardButtonProps={{
                    "aria-label": "change date",
                }}
            /> */}
            <FormControl className={classes.phoneNumber}>
                <InputLabel style={{ color: "grey" }}>Phone Number</InputLabel>
                <Input
                    type="text"
                    value={values.phoneNumber}
                    required
                    onChange={handleChange("phoneNumber")}
                    endAdornment={
                        <InputAdornment
                            style={{ opacity: "0.7" }}
                            position="end"
                        >
                            <PeopleIcon />
                        </InputAdornment>
                    }
                />
            </FormControl>
        </div>
    );
}
export default PersonalDetails;
