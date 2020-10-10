const  normalizeDate = (dateTime) =>  {
    //"2020-10-04T12:00:00.000Z";
    const date = dateTime.split("T")[0];
    return date;
  }


  module.exports = normalizeDate;