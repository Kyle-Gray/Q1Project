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


        var getTracks = function(albumID){
          $.ajax({
            url: 'https://api.spotify.com/v1/albums/'+ albumID +'/tracks',
            data: {
              q: albumID,
              type: 'track'
            },
            success: function (callback){
              console.log(callback);
            }
          });
        };

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
                    var arr3 = [];
                    var albumArray = response.albums.items;
                    for (var i = 0; i < albumArray.length; i++) {
                      var albumArtArray = albumArray[i]["images"];
                      arr1.push(albumArray[i]["name"]);
                      arr2.push(albumArtArray[2]["url"]);
                      arr3.push(albumArray[i]["id"]);
                      // console.log(arr1);

                      var newRow = $("<tr>");
                      var newColumn = $("<td>");
                      var albumNames = $("<td>");
                      var albumID = $("<td>");
                      $("#maintable").append(newRow);
                      newRow.append(newColumn, albumNames, albumID);
                       newColumn.append("<img class= 'albumArts' src=" + arr2[i] + ">");
                       albumNames.append(arr1[i]);
                       albumID.append(arr3[i]);
                    }
                    $(".albumArts").on('click', function(){
                      // console.log($(this).text());
                      $("#search").toggle();
                      $("#hiddensearch").toggle();
                    });

                    console.log(response);
                    // resultsPlaceholder.innerHTML = response;
                }
            });
        };


document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    searchAlbums(document.getElementById('query').value);
  }, false);

document.getElementById('hiddensearch').addEventListener('submit', function(e) {
      e.preventDefault();
      getTracks(document.getElementById('albumID').value);
    }, false);
// click on Album Artwork to push picture up by turntables as well as being able to search tracks






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
