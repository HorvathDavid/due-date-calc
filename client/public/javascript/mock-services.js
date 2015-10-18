'use strict';

function reloadPage(data) {
  console.info('system reload');
  console.info(data);
  document.location.reload(true);
};

$(function() {

  $.getJSON('http://localhost:8888/load/', function(data) {
    var issues = Array.prototype.slice.call(data);
    var $issueTable = $('.issueTable');
    issues.forEach(function(issue) {
      if (issue.name) {
        $issueTable.append('<tr>' + '<td>' +  issue.name + '</td><td>' +  issue.date + '</td><td>' +  issue.timeSpan + '</td><td>' +  issue.dueDate + '</td></tr>');
      } else {
        $issueTable.append('<tr><td>' + issue + '</td></tr>');
      }
    });
  });

  $('button').click(function(e) {
    e.preventDefault();

    var issueName = $('#issueName').val();
    var timeSpan = $('#timeSpan').val();

    if (!issueName || !timeSpan) {
      return;
    }

    $.ajax({
      type: 'POST',
      url: 'http://localhost:8888/issue/',
      data: {
        issue: issueName,
        timeSpan: timeSpan,
      },
      success: reloadPage(),
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    });
  });
});
