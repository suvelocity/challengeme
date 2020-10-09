import React, {useState} from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SubmissionTable from "./SubmissionTable";
import ReviewSection from "./ReviewSection";

function TabPanel({ children, value, index, ...other }) {

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SolutionTable(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      className={classes.root}
      style={{
        width: "725px",
        height: "300px",
        backgroundColor: "lightskyblue",
        overflowY: "auto",
      }}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='on'
          indicatorColor='primary'
          textColor='primary'
          aria-label='scrollable force tabs example'>
          <Tab label='Submissions' {...a11yProps(0)} />
          <Tab label='Reviews' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel
        style={{ backgroundColor: "lightskyblue" }}
        value={value}
        index={0}>
        <SubmissionTable challengeId={props.challengeId} />
      </TabPanel>
      <TabPanel
        style={{ backgroundColor: "lightskyblue" }}
        value={value}
        index={1}>
        <ReviewSection challengeId={props.challengeId} />
      </TabPanel>
    </div>
  );
}
