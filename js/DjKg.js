"use strict";

(function($){
  // Api Call
  $(function(){
$.getJSON("http://spotify.com/?s=");

//knob functions
    $(".dial").knob({
      'width':100%,
      'height':50px
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
