$(document).ready(function() {
    $("section").fadeIn(1000);
    $(".alias").focus();

    $('.myButton').on('click', welcome);

    function welcome() {
      var alias = $('.alias').val();
      var url = 'http://bootcamp.aws.af.cmasd/welcome/' + alias;

      $.get(url).done(function(data) {
        console.log(data);

        if (data.response) {
          $('section').html(data.response).css('color', 'green');
        } else {
          $('section').html(data).css('color', 'red');
        }
      });
    }

    $.get('http://localhostasdasd:3000/search', {'q': 'html5'})
      .done(function(data) {
        console.log(data);
        $.each(data.statuses, function(key, value) {
          var template = '<article>' +
            '<div class="user">' + value.user.screen_name + '</div>' +
            '<div class="avatar"><img src="' + value.user.profile_image_url + '"/></div>' +
            '<div class="text">' + value.text + '</div>' +
            '<div class="date">' + value.created_at + '</div>' +
            '<hr /></article>';

          $('.tweets').append(template);
          console.log(value);
        });
      })
      .fail(function(error) {
        console.log(error);
      })
      .always(function(data2) {
        console.log(data2)
      })
  //});
});
