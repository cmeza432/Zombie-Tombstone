// Date values for conversion
var months = [
    {"month" : "January"},
    {"month" : "February"},
    {"month" : "March"},
    {"month" : "April"},
    {"month" : "May"},
    {"month" : "June"},
    {"month" : "July"},
    {"month" : "August"},
    {"month" : "September"},
    {"month" : "October"},
    {"month" : "November"},
    {"month" : "December"}
]

// Get the elements from html page
var movieElement = document.getElementById('info');
var movieInfo;

// This function will be used to populate the page once data is retrieved
function showRecommendation(movieInfo){
    var end;
    var date;
    
    var i = Math.floor(Math.random() * (movieInfo.length - 0)) + 0;

    // Check movie info overview length to add ...
    if(movieInfo[i].overview.length > 235)
        end = "...";
    else
        end = "";

    // Check the release date if null enter that
    if(movieInfo[i].release_date == "" || typeof movieInfo[i].release_date == 'undefined')
        date = movieInfo[i].release_date = "N/A";
    else{
        // Convert the date information to easier date format
        var year = movieInfo[i].release_date.substring(0,4);
        var day = movieInfo[i].release_date.substring(8);
        var month = movieInfo[i].release_date.substring(5, 7);
        date = months[parseInt(month) - 1]['month'] + " " + day + ", " + year;
    }

    // Check for image path, if null return default image
    if(movieInfo[i].poster_path != null)
        imagePath = "https://www.themoviedb.org/t/p/w94_and_h141_bestv2" + movieInfo[i].poster_path;
    else
        imagePath = "images/notFound.png";

    // Movie HTML information
    movieElement.innerHTML =
    "<div class=\"single-movie-container\">" +
        "<img src=\"" + imagePath + "\"class=\"image\" id=\"image\">" +
        "<div class=\"info-container\" id=\"info-container\">" +
            "<div class=\"movie-title\" id=\"title\">" + movieInfo[i].original_title + "</div>" +
            "<div class=\"date\" id=\"date\">Release Date: " + date + "</div>" +
        "</div>" + 
        "<div class=\"info\" id=\"info\">" + movieInfo[i].overview.substring(0, 235) + end + "</div>" +
    "</div>";
}

// Function will hit the TMDB api and get the horror movies data
function getMovies(){
    // Randomize page
    var page = Math.floor(Math.random() * (500 - 0)) + 0; 
    // Save the url with page variable to cycle through all 500 pages
    const Http = new XMLHttpRequest();
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=0fc9b284e50c7c1b6f53c66f03c6cb58&language=en-US&" + 
        "sort_by=popularity.desc&include_adult=false&include_video=false&page=" + page + "&with_genres=27"
    // When the state changes, parse data into json and call the populating page function
    Http.onreadystatechange=function(){
        if (Http.readyState==4 && Http.status==200){
            movieInfo = JSON.parse(Http.responseText);
            showRecommendation(movieInfo.results);
        }
    }
    Http.open("GET", url);
    Http.send();
}