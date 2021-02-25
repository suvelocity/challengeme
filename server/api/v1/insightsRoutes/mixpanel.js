const mixpanelRoute = require("express").Router();
const {
  checkTeacherPermission,
  checkTeamPermission,
} = require("../../../middleware/checkTeamPermission");
const { getTeamUsersNames } = require("./getTeamUsers");
const axios = require("axios");

function validNum(data) {
  const parsedInt = parseInt(data)
  if (isNaN(parsedInt)) {
    return Date.now()
  } else {
  return  parsedInt
  }
}

// get all team users start challenge time of the last month
// on development just team 3 have started events (suvelocity user)
mixpanelRoute.get("/started-challenge/:teamId",
  checkTeamPermission, checkTeacherPermission, async (req, res) => {
    const { teamId } = req.params;
    const { from, to } = req.query;
    try {
      const usersNames = await getTeamUsersNames(teamId);
      const fromDate = validNum(from)
      const toDate = validNum(to)
      const formattedFrom = new Date(fromDate).toISOString().slice(0, 10);
      const formattedTo = new Date(toDate).toISOString().slice(0, 10);
      todayDate = new Date().toISOString().slice(0, 10);
      // the mixpanel return string !!
      const response = await axios.get(
        `https://data.mixpanel.com/api/2.0/export?to_date=${formattedTo}&from_date=${formattedFrom}&event=%5B%22User%20Started%20Challenge%22%5D`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic MGI1YzUyOGE2MTQxNGExMWQwMTgwODc1MDEwYTlkYzM6",
          },
        }
      );

      // // orginized the string to arrays 
      const regex = /}}/ig
      const commaEndOfObjects = response.data.replace(regex, '}},');
      const lastCommaToRemove = commaEndOfObjects.lastIndexOf('}},') + 2
      const removeLastComma = commaEndOfObjects.slice(0, lastCommaToRemove) + commaEndOfObjects.slice(lastCommaToRemove + 1);
      const onlySingleQuotes = removeLastComma.replace(/'/g, '"');
      const insideArray = `[${onlySingleQuotes}]`
      const result = JSON.parse(insideArray)
        console.log(new Date(result[0].properties.time *1000).toDateString());
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res.status(400).json({ message: "Cannot process request" });
    }
  }
);

module.exports = mixpanelRoute;
