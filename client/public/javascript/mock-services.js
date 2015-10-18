$(function() {
  $('.submit').click(function(e) {
    e.preventDefault();
    console.log($('form'));
    $('form').submit(function(resp) {
      console.log(resp);
    });

    return;
  });

});
