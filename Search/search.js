// Get the elements from html page
var movieElement = document.getElementById('movie-container');
var pageNumber = 1;
var sorted = "popularity";

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

// Load this file as soon as webpage opens
window.onload = getMovies();

// This function will be used to populate the page once data is retrieved
function populatePage(movieInfo){
    var end;
    var date;
    var imagePath;
    
    // Loop through ten movies and display their information
    for(var i = 0; i < 15; i++){
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
            imagePath = "https://www.flaticon.com/svg/vstatic/svg/2471/2471920.svg?token=exp=1611251581~hmac=de61854b684b62a2e545eec824824a44";

        // Movie HTML information
        movieElement.innerHTML = movieElement.innerHTML +
        "<div class=\"single-movie-container\">" +
            "<img src=\"" + imagePath + "\"class=\"image\" id=\"image\">" +
            "<div class=\"info-container\" id=\"info-container\">" +
                "<div class=\"title\" id=\"title\">" + movieInfo[i].original_title + "</div>" +
                "<div class=\"date\" id=\"date\">Release Date: " + date + "</div>" +
                "<div class=\"info\" id=\"info\">" + movieInfo[i].overview.substring(0, 235) + end + "</div>" +
            "</div>" +
        "</div>";
    }
}

// Function will hit the TMDB api and get the horror movies data
function getMovies(){
    const Http = new XMLHttpRequest();
    // API url sorted in popularity by default --> primary_release_date is also another variable
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=0fc9b284e50c7c1b6f53c66f03c6cb58&language=en-US&" +
        "sort_by=" + sorted + ".desc&include_adult=false&include_video=false&page=1&page=" + pageNumber.toString() + "&with_genres=27"
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

// Function will get value of preferred sorted method and pass that into getMovies for API
function sortMovies(value){
    movieElement.innerHTML = "";
    pageNumber = 1;
    sorted = value;
    getMovies();
}

// Function that will be called when user wants to load more movies
function loadMore(){
    pageNumber = pageNumber + 1;
    getMovies();
}