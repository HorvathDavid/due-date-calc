'use strict';

// load issues into memory -> temporary solution, just for the presentation
var _TRACKED_ISSUES = [];

function Tracker() {};

/**
* @method loadIssues
* @return {Object} Promise
*/
Tracker.prototype.loadIssues = function() {
  return new Promise(function(resolve, reject) {
    if (_TRACKED_ISSUES.length) {
      resolve(_TRACKED_ISSUES);
    } else {
      resolve(['No entry']);
    }
  }.bind(this));
};

/**
* @method updateIssues
* @param {Object} formData
* @return {Object} Promise
*/
Tracker.prototype.updateIssues = function(data) {
  return new Promise(function(resolve, reject) {
    if (data) {
      var date = new Date('Mon Oct 19 2015 13:12:30 GMT+0200 (Central Europe Daylight Time)');
      var dueDate = this.calculateDueDate(date, data.timeSpan);
      var issue = {
        name: data.issue,
        date: this.transformDate(date),
        timeSpan: data.timeSpan,
        dueDate: dueDate,
      };
      _TRACKED_ISSUES.unshift(issue);
      resolve();
    } else {
      reject();
    }
  }.bind(this));
};

/**
* @method calculateDueDate
* @param {Date} issue date
* @param {Number} the time span for due date, in hours
* @return {function} transformDate(date)
*/
Tracker.prototype.calculateDueDate = function(date, timeSpan) {
  var dueDate = new Date(date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var weekDay = date.getDay();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var spanDays = Math.floor(timeSpan / 8);
  console.log(spanDays);
  var remainigHours = timeSpan % 8;

  // SET HOURS
  if ((hours + remainigHours) > 17) {
    spanDays += 1;
    remainigHours = remainigHours - (17 - hours);
    dueDate.setHours(8 + remainigHours);
  } else {
    dueDate.setHours(dueDate.getHours() + remainigHours);
  }

  // SET DAYS
  if ((weekDay + spanDays) > 5) {
    var i = 0;

    // the counter will contain weekends
    var counter = 0;
    while (i < spanDays) {
      var currentDay = weekDay;
      var dayCounter = [0,1,2,3,4,5,6];
      if (!(counter % 7 === 5 || counter % 7 === 6)) {
        i++;
      }

      counter++;
    }

    dueDate.setDate(dueDate.getDate() + counter);
  } else {
    dueDate.setDate(dueDate.getDate() + spanDays);
  }

  return this.transformDate(dueDate);
};

/**
* @method calculateDueDate
* @param {Date} issue date
* @return {String} date
*/
Tracker.prototype.transformDate = function(date) {
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
};

module.exports = new Tracker();
