"use strict";

(function($){
  // Api Call
  $(function(){
// $.getJSON("http://spotify.com/?s=", function(data){
//   var items = [];
//     $.each( data, function( key, val ) {
//       $("<tr>").append($("<td>"), items);
//     });
// });

//knob functions
    $(".dial").knob({
      'min':-50,
      'max':50,

    });
    //add class to all dials
    $("canvas").addClass("volumeDial");
    //makes the dials the size we need
$(".volumeDial").css("height", "25px");
$(".volumeDial").css("width", "25px");
// $(".volumeDial").css("float-left");

//spotifys get album art
var resultsPlaceholder = document.getElementById('results');

var searchAlbums = function (query) {
  $.ajax({
    url: 'https://api.spotify.com/v1/search',
    data: {
      q: query,
      type: 'album'
    },
    success: function (response) {
      console.log(response);
      resultsPlaceholder.innerHTML = response;
    }
  });
};
document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault();
  searchAlbums(document.getElementById('query').value);
}, false);

  }); // end of document ready


})(jQuery); // end of jQuery name space
