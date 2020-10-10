import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Charts from "./charts/Charts";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    grid: {
      display: "grid",
      gridGap: "20px",
      textAlign: "center",
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: "lightblue",
      padding: "10px",
      height: "inherit",
      width: "inherit",
      gridTemplate: `
        'headChart headChart' 300px 
        'topChart bottomChart' 300px `,
    },
    div: {
      textAlign: "center",
      alignContent: "center",
      padding: "20px",
      fontWeight: "bold",
      backgroundColor: "lightgray",
      borderRadius: "20px",
      boxShadow: "6px 6px 12px black",
    },
    main: {
      display: "grid",
      padding: "10px",
      alignContent: "center",
      justifyItems: "center",
      alignItems: "center",
      gridTemplateColumns: "auto",
      width: "100%",
    },
    span: {
      fontSize: "30px",
    },
  }));

function UserStatistics() {
    const classes = useStyles();
    const imageStyle = { backgroundColor: "lightgray" };
    const [topUsersData, setTopUsersData] = useState(null);

    const userData = {
        labels: topUsersData && topUsersData.map(index => index.User ? index.User.userName : 'Itay'), // array of values for x axis (strings)
        title: "Top Users", // title for the chart
        rawData: [
          {
            label: "Submitions", // name of the line (one or two words)
            backgroundColor: ['red', 'blue' , 'green' , 'yellow' , 'purple' , 'black' , 'pink' , 'gray'], //raw color
            borderColor: "cyan", //use the same as background color
            fill: false, // change the line chart
            data: topUsersData && [...topUsersData.map(index => index.countSub), 0], // array of values for Y axis (numbers)
          },
          // you can add as many object as you wand, each one will a different line with different color
        ],
      };
     
      useEffect(() => {
        getUsersData() 
        return () => {
          setTopUsersData(null)
        }
      }, [])
      
      const getUsersData = async () => {
        const { data: usersInfo } = await axios.get('/api/v1/statistics/users/top-users');
        setTopUsersData(usersInfo)
        // console.log(usersInfo[0].User.userName)
      };


    return (
        <div className={classes.main}>
      <div className={classes.grid}>
        <div
          className={classes.div}
          style={{ gridArea: "headChart", ...imageStyle }}
        >
          <Charts
            width={"600px"}
            height={"2000px"}
            chart={[0, 2]}
            data={userData}
          />
        </div>
        <div
          className={classes.div}
          style={{ gridArea: "topChart", ...imageStyle }}
        >
          <Charts
            width={"450px"}
            height={"70px"}
            chart={[0, 2]}
            data={userData}
          />
        </div>
        <div
          className={classes.div}
          style={{ gridArea: "bottomChart", ...imageStyle }}
        >
          <Charts
            width={"450px"}
            height={"70px"}
            chart={[0, 1]}
            data={userData}
          />
        </div>
      </div>
    </div>
  );
}

export default UserStatistics;
