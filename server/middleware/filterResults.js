const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

module.exports = function(req,res,next){
  const {challengeName,categories,labels} = req.query;

  const conditionArray = []
  if(challengeName){
    const firstWordCondition = {name: { [Op.like]: `${challengeName}%`} }
    const otherWordsCondition = {name: { [Op.like]: `% ${challengeName}%`} }
    const secondLetterCondition = {name: { [Op.like]: `_${challengeName}%`} }
    const secondLetterWordsCondition = {name: { [Op.like]: `% _${challengeName}%`} }
    const name = firstWordCondition ||  firstWordCondition ? 
    { [Op.or]: [firstWordCondition,otherWordsCondition,secondLetterCondition,secondLetterWordsCondition] } : null
    conditionArray.push(name)
  }
  if(categories){
    // console.log(categories)
    const list = categories.split(',')
    conditionArray.push({category : {[Op.in]:list} })
  }

  const condition = {
    [Op.and]: conditionArray
  }
  req.condition = condition
  req.labels = labels && labels.split(',')
  next()
}
// module.exports = function(req,res,next){
//   const challengeName = req.query.challengeName;
//   if(challengeName){
//     const firstWordCondition = challengeName ? {name: { [Op.like]: `${challengeName}%`} } : null;
//     const otherWordsCondition = challengeName ? {name: { [Op.like]: `% ${challengeName}%`} } : null;
//     const secondLetterCondition = challengeName ? {name: { [Op.like]: `_${challengeName}%`} } : null;
//     const secondLetterWordsCondition = challengeName ? {name: { [Op.like]: `% _${challengeName}%`} } : null;
//     const condition = firstWordCondition ||  firstWordCondition ? 
//     { [Op.or]: [firstWordCondition,otherWordsCondition,secondLetterCondition,secondLetterWordsCondition] } : null
//     req.condition = condition
//   }

//   next()
// }