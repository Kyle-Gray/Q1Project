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
    $(".dial").knob();
    //add class to all dials
    $("canvas").addClass("volumeDial");
    //makes the dials the size we need
$(".volumeDial").css("height", "25px");
$(".volumeDial").css("width", "25px");

//spotifys get album
// var resultsPlaceholder = document.getElementById('results');
var newRow = $("<tr>");
var tdText = $("<td>");
var searchAlbums = function (query) {
  $.ajax({
    url: 'https://api.spotify.com/v1/search',
    data: {
      q: query,
      type: 'album'
    },
    success: function (response) {
      console.log(response);
      return (newRow.append(tdText, response), newRow.append(tdText,response));
    }
  });
};
document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault();
  searchAlbums(document.getElementById('query').value);
}, false);

  }); // end of document ready
})(jQuery); // end of jQuery name space
