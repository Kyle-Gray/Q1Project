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
                        var urls = $("<td hidden>");
                        newRow.append([i]);
                        $("#maintable").append(newRow);
                        newRow.append(newColumn, urls);
                        newColumn.append(emptytrackarr[i]);
                        urls.append(previewurls[i]);
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
                    var playingCssClass = 'playing';
                    var audioObject = null;
                    document.addEventListener('click', function(e) {
                        var target = e.target;
                        audioObject = new Audio(previewurls[0]);
                        audioObject.play();
                        target.classList.add(playingCssClass);

                        audioObject.addEventListener('ended', function() {
                            target.classList.remove(playingCssClass);
                        });

                        audioObject.addEventListener('pause', function() {
                            target.classList.remove(playingCssClass);
                        });
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
                        var albumID = $("<td hidden>");

                        $("#maintable").append(newRow);
                        newRow.append(newColumn, albumNames, albumID);
                        newColumn.append("<img class= 'albumArts' src=" + arr2[i] + ">");
                        albumNames.append(arr1[i]);
                        albumID.append(arr3[i]);
                    }
                    $(".rows").on('click', function() {
                        $(".toptable").append($(this).html());
                        console.log($(this).html());
                    });
                    $(".albumArts").on('click', function() {
                        $("#search").toggle();
                        $("#hiddensearch").toggle();
                    });

                    $(".toptable").on('click', function() {
                        $(".toptable").empty();
                    });
                    // console.log(response);
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
            $('#maintable').empty();
            $('#theadtable').empty();
            // $('.album').empty();
            // $('.id').empty();
            getTracks(document.getElementById('albumID').value);

        }, false);





        // click on Album Artwork to push picture up by turntables as well as being able to search tracks






        // Get track preview from within the albums that we just searched use this code to help you understand audio api!!
        // var playingCssClass = 'playing';
        // var audioObject = null;
        // document.getElementById().addEventListener('click', function (e) {
        //     var target = e.target;
        // if (target !== null && target.classList.contains('cover')) {
        //     if (target.classList.contains(playingCssClass)) {
        //         audioObject.pause();
        //     } else {
        //         if (audioObject) {
        //             audioObject.pause();
        //         }
        //             getTracks(target.getAttribute('data-album-id'), function (data) {
        //                 audioObject = new Audio(data.tracks.items[0].preview_url);
        //                 audioObject.play();
        //                 target.classList.add(playingCssClass);
        //                 audioObject.addEventListener('ended', function () {
        //                     target.classList.remove(playingCssClass);
        //                 });
        //                 audioObject.addEventListener('pause', function () {
        //                     target.classList.remove(playingCssClass);
        //                 });
        //             });
        //         }
        //     }
        // });




    }); // end of document ready
})(jQuery); // end of jQuery name space
