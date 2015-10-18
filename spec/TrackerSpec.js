'use strict';

describe('Tracker', function() {
  var Tracker = require('../server/util/Tracker');

  it('should load issues', function() {
    Tracker.loadIssues();
    expect(Tracker._TRACKED_ISSUES).toBeTruthy();
  });

  it('should update issues', function() {
    Tracker.updateIssues();
    expect(Tracker._TRACKED_ISSUES).toBeTruthy();
  });

  it('should calculateDueDate', function() {
    Tracker.calculateDueDate(new Date('Mon Oct 19 2015 13:12:30 GMT+0200 (Central Europe Daylight Time)'), 100);
    expect(Tracker._TRACKED_ISSUES).toBeTruthy();
  });

  it('should load issues', function() {
    Tracker.transformDate(new Date('Mon Oct 19 2015 13:12:30 GMT+0200 (Central Europe Daylight Time)'));
    expect(Tracker._TRACKED_ISSUES).toBeTruthy();
  });
});
