const moment = require("moment");
module.exports = {
  DesLength: function(str) {
    const SubString = str.substring(0, 120);
    return SubString.concat("....");
  },
  RemoveHtml: function(str) {
    return str.replace(/<(?:.|\n)*?>/gm, "");
  },
  DateFormat: function(date, format) {
    return moment(date).format("MM-DD-YYYY");
  },
  EditButton: function(StoryID,UserID, LoginedUserID) {
    if (UserID == LoginedUserID) {
      return `<a href="/story/edit/${StoryID}" class="btn btn-dark">Edit</a>`;
    } else {
      return '';
    }
  },
  CheckStoryStatus : function(Status){
     if(Status  == "public") {
      return `<option value="public" selected>Public</option>
      <option value="private">Private</option>
      <option value="draft">Draft</option>`;
     } else if(Status == 'private') {
      return `<option value="public" >Public</option>
      <option value="private" selected>Private</option>
      <option value="draft">Draft</option>`;
     } else {
      return `<option value="public" >Public</option>
      <option value="private">Private</option>
      <option value="draft" selected>Draft</option>`;
     }
  }
};
