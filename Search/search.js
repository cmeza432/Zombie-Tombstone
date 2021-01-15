// Load this file as soon as webpage opens
window.onload = getMovies();

// Function will hit the TMDB api and get the horror movies data
function getMovies(){
    const Http = new XMLHttpRequest();
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=0fc9b284e50c7c1b6f53c66f03c6cb58&language=en-US&sort_by=poplarity.desc&include_adult=false&include_video=false&page=1&with_genres=27"
    // When the state changes, parse data into json and call the populating page function
    Http.onreadystatechange=function(){
        if (Http.readyState==4 && Http.status==200){
            var movieInfo = JSON.parse(Http.responseText);
            populatePage(movieInfo.results);
        }
    }
    Http.open("GET", url);
    Http.send();
}

// This function will be used to populate the page once data is retrieved
function populatePage(movieInfo){
    // Get the elements from html page
    var movieElement = document.getElementById('movie-container');
    var end;

    // Loop through ten movies and display their information
    for(var i = 0; i < 10; i++){
        // Check movie info overview length to add ...
        if(movieInfo[i].overview.length > 340)
            end = "...";
        else
            end = "";

        // Check the release date if null enter that
        if(movieInfo[i].release_date == "")
            movieInfo[i].release_date = "N/A";

        movieElement.innerHTML = movieElement.innerHTML +
        "<div class=\"single-movie-container\">" +
            "<img src=\"/images/NoImage.png\"class=\"image\" id=\"image\">" +
            "<div class=\"info-container\" id=\"info-container\">" +
                "<div class=\"title\" id=\"title\">" + movieInfo[i].original_title + "</div>" +
                "<div class=\"date\" id=\"date\">" + movieInfo[i].release_date + "</div>" +
                "<div class=\"info\" id=\"info\">" + movieInfo[i].overview.substring(0, 340) + end + "</div>" +
            "</div>" +
        "</div>";
    }
}