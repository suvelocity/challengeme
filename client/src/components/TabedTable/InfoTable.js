import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SubmissionTab from "../ChallengePage/InfoTable/Tabs/SubmissionsTab/SubmissionTab";
import ReviewsTab from './Tabs/ReviewsTab';
import TabPanel from './TabPanel'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

function InfoTable({challengeId}) {
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
        <SubmissionTab challengeId={challengeId} />
      </TabPanel>
      <TabPanel
        style={{ backgroundColor: "lightskyblue" }}
        value={value}
        index={1}>
        <ReviewsTab challengeId={challengeId} />
      </TabPanel>
    </div>
  );
}

export default InfoTable;


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
