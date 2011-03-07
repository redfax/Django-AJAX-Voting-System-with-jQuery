$(function(){
  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; ++i) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length+1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
      }
      if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
        // Only send the token to relative URLs i.e. locally.
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
      }
    }
  });

  $('a.good').click(function(){
    // get the id
    the_id = $(this).attr('id');

    // fadeout the vote-count
    $("span#votes_count"+the_id).fadeOut("fast");

    $.post("/vote/", {
             post_id: the_id,
             user_vote: 'up'
           },
           function(data){
             alert(data);
           });

  });

  $('a.fuckyou').click(function(){
    // get the id
    the_id = $(this).attr('id');

    //show the spinner
    // $(this).parent().html("<img src='images/spinner.gif' />");

    // fadeout the vote-count
    $("span#votes_count"+the_id).fadeOut("fast");

    // the main ajax request
    $.post("/vote/", {
             post_id: the_id,
             user_vote: 'down'
           },
          function(data){
            alert(data);
          });

    // $.ajax({
    //   type: 'POST',
    //   // data: "user_vote=down&post_id="+$(this).attr("id"),
    //   url: "/vote",
    //   success: function(msg) {
    //     $("span#votes_count"+the_id).html(msg);
    //     //fadein the vote count
    //     $("span#votes_count"+the_id).fadeIn();
    //     // remove the spinner
    //     // $("span#vote_buttons"+the_id).remove();
    //   }
    // });
  });
});
