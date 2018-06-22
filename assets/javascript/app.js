$(document).ready(function() {
    
    var topics = [];
    
         function showMovie() {
    
        var x = $(this).data("search");
        console.log(x);
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=WFuxC2LZVzl8VwG1A8S9nnnOvu1tLW3J&limit=10";
    
        console.log(queryURL);
    
        //ajax call to gpihy API
        $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
                var results = response.data;
                console.log(results);
                for (var i = 0; i < results.length; i++) {
                
                var movieDiv = $("<div class='col-md-4'>");
    
                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var movieImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);

                //adding classes and data states to manipulate giphys and push them to display area
                movieImage.attr("src", staticSrc);
                movieImage.addClass("movieGiphy");
                movieImage.attr("data-state", "still");
                movieImage.attr("data-still", staticSrc);
                movieImage.attr("data-animate", defaultAnimatedSrc);
                movieDiv.append(p);
                movieDiv.append(movieImage);
                $("#gifDisplay").prepend(movieDiv);
    
            }
        });
    }

    //on click to kick off functionality
    $("#addMovie").on("click", function(event) {
        event.preventDefault();
        var newMovie = $("#horrorInput").val().trim();
        topics.push(newMovie);
        console.log(topics);
        $("#horrorInput").val('');
        displayButtons();
      });

    //making new buttons out of user searches
      function displayButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $('<button class="btn btn-primary">');
      a.attr("id", "movie");
      a.attr("data-search", topics[i]);
      a.text(topics[i]);
      $("#myButtons").append(a);
    }
  }


  displayButtons();

  $(document).on("click", "#movie", showMovie);

  $(document).on("click", ".netflixGiphy", pausePlayGifs);

  //function to toggle animate and pause giphys
  function pausePlayGifs() {
  	 var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}

});
    