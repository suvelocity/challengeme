// generate temporary Password
function generatePassword() {
  const length = 8;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let retVal = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

function validDateNum(data) {
  const parsedInt = parseInt(data);
  if (isNaN(parsedInt)) {
    return Date.now();
  }
  return parsedInt;
}

module.exports = {
  generatePassword, validDateNum,
};
