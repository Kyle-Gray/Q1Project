"use strict";

(function($){
  // Api Call
  $(function(){
$.getJSON("http://spotify.com/?s=", function(data){
  var items = [];
    $.each( data, function( key, val ) {
      $("<tr>").append($("<td>"), items);
    });
});

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


  }); // end of document ready
})(jQuery); // end of jQuery name space
