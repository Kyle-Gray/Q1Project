"use strict";

(function($) {
    // Api Call
    $(function() {
        //knob functions
        $(".dial").knob();
        //add class to all dials
        $("canvas").addClass("volumeDial");
        //makes the dials the size we need
        $(".volumeDial").css("height", "25px");
        $(".volumeDial").css("width", "25px");

        //spotifys API call

        var resultsPlaceholder = document.getElementById('results');


        var searchAlbums = function(query) {
            $.ajax({
                url: 'https://api.spotify.com/v1/search',
                data: {
                    q: query,
                    type: 'album'
                },
                success: function(response) {
                  // to get albums out of the object
                    var arr1 = [];
                    var arr2 = [];
                    var albumArray = response.albums.items;
                    for (var i = 0; i < albumArray.length; i++) {
                      var albumArtArray = albumArray[i]["images"];

                      arr1.push(albumArray[i]["name"]);
                      arr2.push(albumArtArray[2]["url"]);
                      // console.log(arr1);

                      var newRow = $("<tr>");
                      var newColumn = $("<td>");
                      var albumNames = $("<td>");
                      $("#maintable").append(newRow);
                      newRow.append(newColumn, albumNames);
                       newColumn.append("<img src=" + arr2[i] + ">");
                       albumNames.append(arr1[i]);

                    }
              
                    console.log(response);
                    resultsPlaceholder.innerHTML = response;
                }
            });
        };


document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    searchAlbums(document.getElementById('query').value);
  }, false);

// Get tracks from within the albums that we just searched

        // var fetchTracks = function(albumId, callback) {
        //     $.ajax({
        //         url: 'https://api.spotify.com/v1/albums/' + albumId,
        //         success: function(response) {
        //             callback(response);
        //         }
        //     });
        // };
        // resultsPlaceholder.addEventListener('click', function(e) {
        //     var target = e.target;
        //     fetchTracks(target.getAttribute('data-album-id'));
        // });

    }); // end of document ready
})(jQuery); // end of jQuery name space
