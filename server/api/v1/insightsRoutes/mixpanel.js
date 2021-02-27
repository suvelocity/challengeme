const mixpanelRoute = require('express').Router();
const axios = require('axios');
const checkAdmin = require('../../../middleware/checkAdmin');
const { validDateNum } = require('../../../utils');

const cachedEvents = {};

function queryDiff(presentQuery, cachedQuery) {
  if (presentQuery.from != cachedQuery.from) return false;
  if (presentQuery.to != cachedQuery.to) return false;
  if (!(parseInt(presentQuery.limit) <= parseInt(cachedQuery.limit))) return false;
  return true;
}

function isAlreadyCached(event, query) {
  const cached = cachedEvents[event];
  if (!cached) return false;
  if (cached.lastCached < (Date.now() - (1000 * 60 * 60 * 24))) return false;
  if (!queryDiff(query, cached.query)) return false;
  const cloneData = JSON.parse(JSON.stringify(cached));
  cloneData.data.length = parseInt(query.limit);
  return cloneData;
}

function manipulateRowData(string) {
  const regex = /}}/ig;
  const commaEndOfObjects = string.replace(regex, '}},');
  const lastCommaToRemove = commaEndOfObjects.lastIndexOf('}},') + 2;
  const removeLastComma = commaEndOfObjects.slice(0, lastCommaToRemove) + commaEndOfObjects.slice(lastCommaToRemove + 1);
  const onlySingleQuotes = removeLastComma.replace(/'/g, '"');
  const insideArray = `[${onlySingleQuotes}]`;
  const parsedEvents = JSON.parse(insideArray);
  return parsedEvents;
}

function manipulateEvents(array) {
  if (Array.isArray(array)) {
    return array.map((event) => {
      event.properties.id = event.properties.$insert_id;
      event.properties.time = new Date(event.properties.time * 1000).toString();
      return event.properties;
    });
  }
  return null;
}

// get all team users start challenge time of the last month
// on development just team 3 have started events (suvelocity user)
mixpanelRoute.get('/', checkAdmin, async (req, res) => {
  const {
    from, to, event, limit,
  } = req.query;
  try {
    const encodedEvent = encodeURIComponent(`["${event}"]`);
    const fromDate = validDateNum(from);
    const toDate = validDateNum(to);
    const formattedFrom = new Date(fromDate).toISOString().slice(0, 10);
    const formattedTo = new Date(toDate).toISOString().slice(0, 10);
    const verifiedLimit = parseInt(limit) >= 2 ? parseInt(limit) : '';
    const eventsExist = isAlreadyCached(event, req.query);
    if (eventsExist) {
      return res.json(eventsExist.data);
    }
    // the mixpanel return string !!
    const response = await axios.get(
      `https://data.mixpanel.com/api/2.0/export?to_date=${formattedTo}&from_date=${formattedFrom}&event=${encodedEvent}&limit=${verifiedLimit}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${process.env.MIXPANEL_SECRET}`,
        },
      },
    );

    const eventsArray = manipulateRowData(response.data);
    const results = manipulateEvents(eventsArray);
    if (results && Array.isArray(results) && results.length) {
      cachedEvents[event] = { data: results, lastCached: Date.now(), query: req.query };
    }
    res.json(results);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

module.exports = mixpanelRoute;
