const { Sequelize } = require('sequelize');

const { Op } = Sequelize;

module.exports = function (req, res, next) {
  const { challengeName, categories, labels } = req.query;

  const conditionArray = []; // to hold all the conditions

  if (challengeName) { // if a search query for a name was sent
    const firstWordCondition = { name: { [Op.like]: `${challengeName}%` } }; // accept names that start with the search query
    const otherWordsCondition = { name: { [Op.like]: `% ${challengeName}%` } }; // accept names with the search query starting any word
    const secondLetterCondition = { name: { [Op.like]: `_${challengeName}%` } }; // accept names that has the search query on the second letter of the first word
    const secondLetterWordsCondition = { name: { [Op.like]: `% _${challengeName}%` } }; // accept names that has the search query on the second letter of any word
    const name = firstWordCondition || firstWordCondition
      ? { [Op.or]: [firstWordCondition, otherWordsCondition, secondLetterCondition, secondLetterWordsCondition] } : null; // accept names that match at least one of the conditions
    conditionArray.push(name); // add this condition to the array
  }
  if (categories) { // if a category filter was sent
    const list = categories.split(','); // the list arrives as a string
    conditionArray.push({ category: { [Op.in]: list } }); // accept challenges with a category in that list
  }

  const condition = { // accepts challenges that pass all conditions
    [Op.and]: conditionArray,
  };
  req.condition = condition; // passes condition on in the request
  req.labels = labels && labels.split(',');
  next();
};
