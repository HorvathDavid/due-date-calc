'use strict';

var _TRACKED_ISSUES = [];

/**
* @method calculateDueDate
* @param {Date} issue date
* @return {String} date
*/
function transformDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = year + '.' + month + '.' + day + '. ' + hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

/**
* @method calculateDueDate
* @param {Date} issue date
* @param {Number} the time span for due date
* @return {function} transformDate(date)
*/
function calculateDueDate(date, timeSpan) {
  var date = date;
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var spanDays = Math.floor(timeSpan / 8);
  var remainigHours = timeSpan % 8;
  if ((hours + remainigHours) > 17) {
    spanDays += 1;
  }
  date.setDate(day + spanDays);
};

function Tracker() {};

Tracker.prototype.loadIssues = function() {
  return new Promise(function(resolve, reject) {
    if (_TRACKED_ISSUES.length) {
      resolve(_TRACKED_ISSUES);
    } else {
      resolve(['No entry']);
    }
  }.bind(this));
};

Tracker.prototype.updateIssues = function(data) {
  return new Promise(function(resolve, reject) {
    if (data) {
      var issue = {
        name: data.issue,
        date: transformDate(new Date()),
        timeSpan: data.timeSpan,
        dueDate: calculateDueDate(new Date(), data.timeSpan),
      };
      _TRACKED_ISSUES.unshift(issue);
      resolve();
    } else {
      reject();
    }
  }.bind(this));
};

module.exports = new Tracker();
