'use strict';

var TRACKED_ISSUES = [];

function Tracker() {};

Tracker.prototype.updateIssues = function(data) {
  var issue = {
    date: data.date,
    details: data.details,
    dueDate: false,
  };
  TRACKED_ISSUES.unshift(issue);
};

module.exports = new Tracker();
