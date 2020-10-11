import React from "react";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
const useStyles = makeStyles((theme) => ({
    securityQTitle: {
        marginTop: "120px",
        width: "320px",
    },
    answerForgotPass: {
        marginTop: "40px",
        marginBottom: "30px",
        width: "320px",
    },
}));
function Security({
    // nextStep,
    // securityAnswer,
    // handleChange,
    // securityQuestion,
    data,
    handleChange,
}) {
    const classes = useStyles();

    console.log(data);
    return (
        <div className={classes.securityQTitle}>
            <span>{data.secQuestion}</span>
            {/* <Select
        displayEmpty
        value={securityQuestion}
        onChange={handleChange("securityQuestion")}
      >
        <MenuItem value="" disabled>
          Choose Security Question...
        </MenuItem>
        <MenuItem value="Q1">Q 1</MenuItem>
        <MenuItem value="Q2">Q 2</MenuItem>
        <MenuItem value="Q3">Q 3</MenuItem>
        <MenuItem value="Q4">Q 4</MenuItem>
        <MenuItem value="Q5">Q 5</MenuItem>
      </Select> */}
            <FormControl className={classes.answerForgotPass}>
                <InputLabel style={{ color: "grey" }}>
                    Enter your answer
                </InputLabel>
                <Input
                    id='answer'
                    type="text"
                    value={data.secAnswer}
                    required
                    onChange={handleChange("answer")}
                    endAdornment={
                        <InputAdornment
                            style={{ opacity: "0.7" }}
                            position="end"
                        >
                            <QuestionAnswerIcon />
                        </InputAdornment>
                    }
                />
            </FormControl>
        </div>
    );
}

export default Security;
