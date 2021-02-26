const mixpanelRoute = require("express").Router();
const axios = require("axios");
const {
  checkTeacherPermission,
  checkTeamPermission,
} = require("../../../middleware/checkTeamPermission");
const checkAdmin = require('../../../middleware/checkAdmin');
const { getTeamUsersNames } = require("./getTeamUsers");
const { validDateNum } = require("../../../utils");

const cachedEvents = {}

function queryDiff(presentQuery, cachedQuery) {
  if (presentQuery.from != cachedQuery.from) return false
  if (presentQuery.to != cachedQuery.to) return false
  if (!(presentQuery.limit <= cachedQuery.limit)) return false
  return true
}

function isAlreadyCached(event, query) {
  const cached = cachedEvents[event]
  if (!cached) return false
  if (cached.lastCached < (Date.now() - (1000 * 60 * 60 * 24))) return false
  if (!queryDiff(query, cached.query)) return false
  const cloneData = JSON.parse(JSON.stringify(cached))
  cloneData.data.length = parseInt(query.limit)
  return cloneData
}

function manipulateEvents(array) {
  return array.map(event => event.properties)
}

// get all team users start challenge time of the last month
// on development just team 3 have started events (suvelocity user)
mixpanelRoute.get("/", checkAdmin, async (req, res) => {
  const { from, to, event, limit } = req.query;
  try {
    const encodedEvent = encodeURIComponent(`["${event}"]`)
    const fromDate = validDateNum(from)
    const toDate = validDateNum(to)
    const formattedFrom = new Date(fromDate).toISOString().slice(0, 10);
    const formattedTo = new Date(toDate).toISOString().slice(0, 10);
    todayDate = new Date().toISOString().slice(0, 10);
    const verifiedLimit = parseInt(limit) >= 2 ? parseInt(limit) : '';
    const eventsExist = isAlreadyCached(event, req.query)
    if (eventsExist) {
      console.log('use cache', eventsExist.data.length);
      return res.json(eventsExist.data);
    }
    // the mixpanel return string !!
    const response = await axios.get(
      `https://data.mixpanel.com/api/2.0/export?to_date=${formattedTo}&from_date=${formattedFrom}&event=${encodedEvent}&limit=${verifiedLimit}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${process.env.MIXPANEL_SECRET}`,
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
    const parsedEvents = JSON.parse(insideArray)

    const results = manipulateEvents(parsedEvents)
    cachedEvents[event] = { data: results, lastCached: Date.now(), query: req.query }
    res.json(results);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Cannot process request" });
  }
}
);

module.exports = mixpanelRoute;
