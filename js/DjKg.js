"use strict";

(function($) {
    // Api Call
    $(function() {
        //knob functions
        $(".dial").knob();
        //add class to all dials
        $("canvas").addClass("volumeDial");
        //makes the dials the size we need
        $(".volumeDial").css("height", "35px");
        $(".volumeDial").css("width", "35px");

        //spotifys API call

        var resultsPlaceholder = document.getElementById('results');

        // get albums track information
        var getTracks = function(albumID) {
            $.ajax({
                url: 'https://api.spotify.com/v1/albums/' + albumID + '/tracks',
                data: {
                    q: albumID,
                    type: 'track'
                },
                success: function(callback) {
                    console.log(callback);
                    var trackarr = callback.items;
                    var emptytrackarr = [];
                    var previewurls = [];
                    for (var i = 0; i < trackarr.length; i++) {
                        emptytrackarr.push(trackarr[i]["name"]);
                        previewurls.push(trackarr[i]["preview_url"]);
                        var newRow = $("<tr>");
                        var newColumn = $("<td>");
                        var albumNames = $("<td>");
                        var urls = $("<td class='playingCssClass'hidden>");
                        newRow.append([i]);
                        $("#maintable").append(newRow);
                        newRow.append(newColumn, urls);
                        newColumn.append(emptytrackarr[i]);
                        urls.append(previewurls[i]);
                        console.log(previewurls[i]);
                    }
                    var newRow = $("<tr>");
                    var albumNames = $("<td>");
                    var newColumn = $("<td>");
                    $("#theadtable").append(newRow, albumNames, newColumn);
                    var tracknum = $("<th>Number</th>");
                    var tracknames = $("<th>Track</th>");
                    albumNames.append(tracknames);
                    newColumn.append(tracknum);
                    // trying to get sound on page
                    // var playingCssClass = 'playing';
                    var audioObject = null;
                    $("#maintable").on('click', function() {
                        audioObject = new Audio(previewurls[0]);
                        audioObject.play();

                        // audioObject.addEventListener('ended', function() {
                        //     target.classList.remove(playingCssClass);
                        // });
                        //
                        // audioObject.addEventListener('pause', function() {
                        //   audioObject.pause();
                        //     target.classList.remove(playingCssClass);
                        // });

                  });
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

                        var newRow = $("<tr class='rows'>");
                        var newColumn = $("<td>");
                        var albumNames = $("<td>");
                        var albumID = $("<td class='idgrab' hidden>");

                        $("#maintable").append(newRow);
                        newRow.append(newColumn, albumNames, albumID);
                        newColumn.append("<img class= 'albumArts' src=" + arr2[i] + ">");
                        albumNames.append(arr1[i]);
                        albumID.append(arr3[i]);
                    }
                    // click on Album Artwork to push picture up by turntables as well as being able to search tracks
                    $(".rows").on('click', function() {
                        $(".toptable").append($(this).html());
                    });
                    $(".albumArts").on('click', function() {
                        $("#search").toggle();
                      $("#albumID").val($(".idgrab").html());
                        // console.log($(".idgrab").html());
                        $("#hiddensearch").toggle();
                    });
                    $(".clearbutton").on('click', function(){
                      $(".toptable2").empty();
                      $(".toptable").empty();
                      $("#maintable").empty();
                      $('.albumID').empty();
                      $('.query').empty();
                    });
                    // console.log(response);
                }
            });
        };


        document.getElementById('search-form').addEventListener('submit', function(e) {
            e.preventDefault();
            searchAlbums(document.getElementById('query').value);
        }, false);

        document.getElementById('hiddensearch').addEventListener('submit', function(e) {
            e.preventDefault();
            $('#maintable').empty();
            $('#theadtable').empty();
            getTracks(document.getElementById('albumID').value);

        }, false);

        //add album art to right turntable2
        $(".s1").on('click', function(){
          $(".toptable2").append($(this).html());
          });

          $(".subfocus").on('click', function(){
            var audioObject2 = new Audio("https://p.scdn.co/mp3-preview/de8fecf22f44c90f93168b7ed2ff6d114045abf0");
            audioObject2.play();
          });

          $(".nero").on('click', function(){
            var audioObject3 = new Audio("https://p.scdn.co/mp3-preview/2371b8572cc7d7cd9970363fd3763e5876e89863");
            audioObject3.play();
          });

          $(".cashcash").on('click', function(){
            var audioObject4 = new Audio("https://p.scdn.co/mp3-preview/b6db4c5d640420e6579010e8ce66802fc2229e86");
            audioObject4.play();
          });

          $(".rush").on('click', function(){
            var audioObject5 = new Audio("https://p.scdn.co/mp3-preview/ac1926c98cd4566da7a5d9e76ff2165d37571564");
            audioObject5.play();
          });

          $(".zztop").on('click', function(){
            var audioObject6 = new Audio("https://p.scdn.co/mp3-preview/5be9776759c263721e1f75d03a12cc033a15fd99");
            audioObject6.play();
          });

          $(".pinkfloyd").on('click', function(){
            var audioObject7 = new Audio("https://p.scdn.co/mp3-preview/55f1d66ad03b6ddfe57bdba7b0c32b11e55f5187");
            audioObject7.play();
          });

          $(".tablepic").on('click', function(){
            var audioObject8 = new Audio("http://audiosoundclips.com/wp-content/uploads/2014/02/DJ-Scratch-3.mp3");
            audioObject8.play();
          });

          $(".soundeff").on('click', function(){
            var audioObject9 = new Audio("http://audiosoundclips.com/wp-content/uploads/2014/02/DJ-Lazer.mp3");
            audioObject9.play();
          });

          $(".soundeff2").on('click', function(){
            var audioObject10 = new Audio("http://audiosoundclips.com/wp-content/uploads/2014/02/DJ-Lazer-2.mp3");
            audioObject10.play();
          });

          $(".soundeff3").on('click', function(){
            var audioObject11 = new Audio("http://audiosoundclips.com/wp-content/uploads/2014/02/Pop.mp3");
            audioObject11.play();
          });

          $(".zepp").on('click', function(){
            var audioObject12 = new Audio("https://p.scdn.co/mp3-preview/c1f024eb57b569b926c8e68cab0a6056dc7d9654");
            audioObject12.play();
          });




        // Get track preview from within the albums that we just searched use this code to help you understand audio api!!





    }); // end of document ready
})(jQuery); // end of jQuery name space
