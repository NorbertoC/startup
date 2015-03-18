//https://accounts.spotify.com/authorize?client_id=44c3556462f74f88b2311d82e12ff63d&redirect_uri=http:%2F%2Flocalhost:8080%2F&response_type=token

$(document).ready(function() {

  var API = {
        accessToken: 'BQBO4h7pcfxrZO7R2-YGAwkj3Tpx31VfqnXeRaNcViqxpGvomVwiS5DH-RR6Gd6RJ8oNvTxPxOc3qJ4ztq1YnySTrzfDa0NzlB3wVhAAYmAPQWS4qgd1NRGMs3-KpnSlg2MSFOqBmlLsTX8V0vW6YcEr0sT5NTK6bbZs70yFWN79umdhfwqIaqwdYRbsyzmu2TaJAlcYt_h5dPoZfh1lM_JkwQIO7ogaTrqoU84QFv3FS13IsiIX',
        base: 'https://api.spotify.com'
      },
      req = function (endpoint) {
        $.ajax({
          url: endpoint,
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + API.accessToken
          }
        }).done(res);
      },
      res = function (data) {
        console.log(data);
      };

  req(API.base + '/v1/me');

  
  // Populate select with user playlists
  $.ajax({
    url: API.base + '/v1/users/11178249265/playlists',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + API.accessToken
    }
  }).done(function(response) {
    $.each(response.items, function(key, item){
      $('#list').append('<option value="' + item.id + '">' + item.name + '</option>');
    });
  });

  // Search tracks
  $('#search').click(function() {
    var query = $('#query').val();
    var params = {q: query, type: 'track'};


    $.get('https://api.spotify.com/v1/search', params, function(response) {
        $.each(response.tracks.items, function(index, item) {
            var albumImg = '<img src="' + item.album.images[1].url + '" />';
//            $('#resultados').append('<input type="checkbox" value="' + item.id + '"/> ' + albumImg + item.name + '</br>');
            $('#resultados').append('<div class="tracks">' + albumImg  + '<input type="checkbox" value="' + item.id + '"/> ' +  '<span class="tracksText">' + item.name + '</span>' + '</br>' + '</div>');
        });
    });
  });

  // Create a new playlist
  $('#create').click(function() {
    var name = $('#playlist').val();
    var options = { "name": name, "public": true};
    
    $.ajax({
      url: API.base + '/v1/users/11178249265/playlists',
      method: 'POST',
      dataType: 'json',
      data: JSON.stringify(options),
      headers: {
        'Authorization': 'Bearer ' + API.accessToken
      }
    }).done(function(response) {
      alert('Playlist: ' + response.name + ' creada correctamente');
    });
  });

  // Add tracks to selected playlist
  $('#add-tracks').click(function() {
    var tracks = $('input:checked');
    var playlist_id = $('#list').val();
    var url = API.base + '/v1/users/11178249265/playlists/' + playlist_id + '/tracks';
    var trackUris = [];
    
    $.each(tracks, function(key, track) {
      trackUris.push('spotify:track:' + track.value);
    });

    var options = {"uris": trackUris};

    $.ajax({
      url: url,
      method: 'POST',
      dataType: 'json',
      data: JSON.stringify(options),
      headers: {
        'Authorization': 'Bearer ' + API.accessToken
      }
    }).done(function(response) {
      alert('Tracks agregados correctamente!');
    });
  });
});
