const moment = require("moment");
module.exports = {
  DesLength: function(str) {
    const SubString = str.substring(0, 120);
    return SubString.concat("....");
  },
  RemoveHtml : function(str) {
     return str.replace(/<(?:.|\n)*?>/gm,'')
  },
  DateFormat : function(date,format) {
   return moment(date).format(format);
  }
};
