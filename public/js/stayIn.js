$(document).ready(function () {
    console.log("stayIn.js loaded");
    $('.dropdown-toggle').dropdown()

    // GET request to grab the user's id so we can assign the created date to them.
    $.get("/api/user_data").then(function (data) {
        $("#userId").text(data.id);
        console.log(data.id);
    });


    // Movies Search JS
    // Event Listener to search for movies
    const selectMovieBtn = $("#searchMovie");
    selectMovieBtn.on("click", function (event) {
        event.preventDefault();
        $("#select").attr("style", "display: none;");
        $("#movieSearch").removeAttr("style");
    });

    // Event Listeners to search for movies by streaming Service
    const netflixM = $("#netflixM");
    netflixM.on("click", function (event) {
        event.preventDefault();
        // Set the hidden span on the page to the desired streaming service, to be pulled from later to make date.
        $("#userStream").text("netflix");
        let userStream = "Netflix"
        // Call search function for specific streaming service
        streamMResults(userStream);
    });
    const huluM = $("#huluM");
    huluM.on("click", function (event) {
        event.preventDefault();
        // Set the hidden span on the page to the desired streaming service, to be pulled from later to make date.
        $("#userStream").text("hulu");
        let userStream = "Hulu"
        // Call search function for specific streaming service
        streamMResults(userStream);
    });
    const primeM = $("#primeM");
    primeM.on("click", function (event) {
        event.preventDefault();
        // Set the hidden span on the page to the desired streaming service, to be pulled from later to make date.
        $("#userStream").text("prime");
        let userStream = "Prime"
        // Call search function for specific streaming service
        streamMResults(userStream);
    });
    const disneyM = $("#disneyM");
    disneyM.on("click", function (event) {
        event.preventDefault();
        // Set the hidden span on the page to the desired streaming service, to be pulled from later to make date.
        $("#userStream").text("disney");
        let userStream = "Disney"
        // Call search function for specific streaming service
        streamMResults(userStream);
    });

    // Event Listener to search for a specific movie by title
    const searchmTitleBtn = $("#searchMTitle");
    searchmTitleBtn.on("click", function (event) {
        event.preventDefault();
        // Grabs value of the input the user searched for.
        let title = $("input#mtitleInput").val().trim();
        $("#m").removeAttr("style");
        $("#mConfirm").removeAttr("style");

        // GET request for specific movie title
        $.get(`/api/movies/${title}`, function (data) {
            console.log(data);
            if (data.length === 0) {
                alert("No movies found.")
                window.location.reload();
            }
            // Else ifs to show the user which streaming service houses their desired movie
            else if (data[0].netflix === true) {
                $("#mResults").removeAttr("style")
                $("#mTitle").append(data[0].title);
                $("#mIMDb").append(data[0].IMDb);
                $("#mGenres").append(data[0].genres);
                $("#mYear").append(data[0].year);
                $("#mStream").append("Netflix");
            }
            else if (data[0].hulu === true) {
                $("#mResults").removeAttr("style")
                $("#mTitle").append(data[0].title);
                $("#mIMDb").append(data[0].IMDb);
                $("#mGenres").append(data[0].genres);
                $("#mYear").append(data[0].year);
                $("#mStream").append("Hulu");
            }
            else if (data[0].prime_video === true) {
                $("#mResults").removeAttr("style")
                $("#mTitle").append(data[0].title);
                $("#mIMDb").append(data[0].IMDb);
                $("#mGenres").append(data[0].genres);
                $("#mYear").append(data[0].year);
                $("#mStream").append("Prime Video");
            }
            else if (data[0].disney_plus === true) {
                $("#mResults").removeAttr("style")
                $("#mTitle").append(data[0].title);
                $("#mIMDb").append(data[0].IMDb);
                $("#mGenres").append(data[0].genres);
                $("#mYear").append(data[0].year);
                $("#mStream").append("Disney Plus");
            }
            else {
                $("#mResults").removeAttr("style")
                $("#mTitle").append(data[0].title);
                $("#mIMDb").append(data[0].IMDb);
                $("#mGenres").append(data[0].genres);
                $("#mYear").append(data[0].year);
            }
        });
    });

    // Function to do a GET request by desired streaming service
    function streamMResults(stream) {
        console.log(stream);
        $("#mStream").removeAttr("style");

        // GET request to get 5 random movies from the desired streaming service
        $.get(`/api/movie/${stream}/1`, function (data) {
            console.log(data);
            $("#mStreamResults").removeAttr("style")
            for (let i = 0; i < data.length; i++) {
                $("#mStreamResults").append(`
                <a href= "#" class="streamMTitle">${data[i].title}</a>
                <p class="msIMDB"><strong>IMDb Rating: ${data[i].IMDb}</strong></p>
                <br>
                `)
            }

            // Add Event Listeners to all of the newly appended movie titles.
            const selectTitleLink = document.querySelectorAll(".streamMTitle");
            if (selectTitleLink) {
                selectTitleLink.forEach((link) => {
                    link.addEventListener("click", (event) => {
                        const selectedTitle = event.target.text;
                        console.log(selectedTitle);
                        $("#mStreamConfirm").removeAttr("style");
                        $("#selectedsTitleM").append(selectedTitle);
                        $("#userMovie").text(selectedTitle);
                    });
                });
            }
        });
    }

    // Event Listeners that adds the selected movie to the date
    const addMovie = $("#addMovie");
    addMovie.on("click", function (event) {
        event.preventDefault();
        let userMovie = $("input#mtitleInput").val().trim();
        $("#tvOrMovie").text("movie");
        $("#userMovie").text(userMovie);
        $("#entertain").append(userMovie);
        $("#date").removeAttr("style");
    });
    const addsMovie = $("#addsMovie");
    addsMovie.on("click", function (event) {
        event.preventDefault();
        let usersMovie = $("#selectedsTitleM").text();
        $("#tvOrMovie").text("movie");
        $("#userMovie").text(usersMovie);
        $("#entertain").append(usersMovie);
        $("#date").removeAttr("style");
    });



    // TV Show Search JS
    // Event Listener to search for TV Shows
    const selectTvBtn = $("#searchTv");
    selectTvBtn.on("click", function (event) {
        event.preventDefault();
        $("#select").attr("style", "display: none;");
        $("#tvSearch").removeAttr("style");
    });

    // Event Listener to search for a specific TV Show by title
    const searchtTitleBtn = $("#searchTTitle");
    searchtTitleBtn.on("click", function (event) {
        event.preventDefault();
        // Grabs value of the input the user searched for.
        let title = $("input#ttitleInput").val().trim();
        $("#t").removeAttr("style");
        $("#tConfirm").removeAttr("style");

        // GET request for specific TV Show title
        $.get(`/api/tv/${title}`, function (data) {
            console.log(data);
            if (data.length === 0) {
                alert("No TV shows found.")
                window.location.reload();
            }
            else if (data[0].Netflix === true) {
                $("#tResults").removeAttr("style")
                $("#tTitle").append(data[0].title);
                $("#selectedTitle").append(data[0].title);
                $("#tIMDB").append(data[0].IMDB);
                $("#tYear").append(data[0].year);
                $("#tStream").append("Netflix");
            }
            else if (data[0].Hulu === true) {
                $("#tResults").removeAttr("style")
                $("#tTitle").append(data[0].title);
                $("#selectedTitle").append(data[0].title);
                $("#tIMDB").append(data[0].IMDB);
                $("#tYear").append(data[0].year);
                $("#tStream").append("Hulu");
            }
            else if (data[0].Prime === true) {
                $("#tResults").removeAttr("style")
                $("#tTitle").append(data[0].title);
                $("#selectedTitle").append(data[0].title);
                $("#tIMDB").append(data[0].IMDB);
                $("#tYear").append(data[0].year);
                $("#tStream").append("Prime Video");
            }
            else if (data[0].Disney === true) {
                $("#tResults").removeAttr("style")
                $("#tTitle").append(data[0].title);
                $("#selectedTitle").append(data[0].title);
                $("#tIMDB").append(data[0].IMDB);
                $("#tYear").append(data[0].year);
                $("#tStream").append("Disney Plus");
            } else {
                $("#tResults").removeAttr("style")
                $("#tTitle").append(data[0].title);
                $("#selectedTitle").append(data[0].title);
                $("#tIMDB").append(data[0].IMDB);
                $("#tYear").append(data[0].year);
            }
        });
    });

    // Event Listeners to search for TV Shows by streaming Service
    const netflix = $("#netflix");
    netflix.on("click", function (event) {
        event.preventDefault();
        // Set the hidden span on the page to the desired streaming service, to be pulled from later to make date.
        $("#userStream").text("netflix");
        let userStream = "Netflix"
        // Call search function for specific streaming service
        streamTVResults(userStream);
    });
    const hulu = $("#hulu");
    hulu.on("click", function (event) {
        event.preventDefault();
        // Set the hidden span on the page to the desired streaming service, to be pulled from later to make date.
        $("#userStream").text("hulu");
        let userStream = "Hulu"
        // Call search function for specific streaming service
        streamTVResults(userStream);
    });
    const prime = $("#prime");
    prime.on("click", function (event) {
        event.preventDefault();
        // Set the hidden span on the page to the desired streaming service, to be pulled from later to make date.
        $("#userStream").text("prime");
        let userStream = "Prime"
        // Call search function for specific streaming service
        streamTVResults(userStream);
    });
    const disney = $("#disney");
    disney.on("click", function (event) {
        event.preventDefault();
        // Set the hidden span on the page to the desired streaming service, to be pulled from later to make date.
        $("#userStream").text("disney");
        let userStream = "Disney"
        // Call search function for specific streaming service
        streamTVResults(userStream);
    });

    // Function to do a GET request by desired streaming service
    function streamTVResults(stream) {
        console.log(stream);
        $("#tStream").removeAttr("style");

        // GET request to get 5 random TV Shows from the desired streaming service
        $.get(`/api/tv/${stream}/1`, function (data) {
            console.log(data);
            $("#tStreamResults").removeAttr("style")
            for (let i = 0; i < data.length; i++) {
                $("#tStreamResults").append(`
                <a href= "#" class="streamTitle">${data[i].title}</a>
                <p class="tsIMDB"><strong>IMDb Rating: ${data[i].IMDB}</strong></p>
                <br>
                `)
            }

            // Add Event Listeners to all of the newly appended TV Show titles.
            const selectTitleLink = document.querySelectorAll(".streamTitle");
            if (selectTitleLink) {
                selectTitleLink.forEach((link) => {
                    link.addEventListener("click", (event) => {
                        const selectedTitle = event.target.text;
                        console.log(selectedTitle);
                        $("#tStreamConfirm").removeAttr("style");
                        $("#selectedsTitle").append(selectedTitle);
                        $("#userTv").text(selectedTitle);
                    });
                });
            }
        });
    }

    // Event Listeners that adds the selected movie to the date
    const addTv = $("#addTv");
    addTv.on("click", function (event) {
        event.preventDefault();
        let userTv = $("#selectedTitle").text();
        $("#tvOrMovie").text("tv");
        $("#userTv").text(userTv);
        $("#entertain").append(userTv);
        $("#date").removeAttr("style");
    });
    const addsTv = $("#addsTv");
    addsTv.on("click", function (event) {
        event.preventDefault();
        let usersTv = $("#selectedsTitle").text();
        $("#tvOrMovie").text("tv");
        $("#userTv").text(usersTv);
        $("#entertain").append(usersTv);
        $("#date").removeAttr("style");
    });



    // Recipe Search API JS
    const foodKey = "0e0296678d63dc0895ac10e48c8b9d7a";
    const foodId = "196d44a2";

    // Event Listener to search for a recipe by ingredient
    const searchRecipeBtn = $("#searchRecipe");
    searchRecipeBtn.on("click", function (event) {
        event.preventDefault();
        // Grabs the search value to put into the API search
        let ingredients = $("input#ingredientInput").val().trim();
        $("#r").removeAttr("style");
        $("#rConfirm").removeAttr("style");

        // AJAX Call to get back a recipe
        $.ajax({
            type: "GET",
            url: `https://api.edamam.com/search?q=${ingredients}&app_id=${foodId}&app_key=${foodKey}&from=0&to=100`,
            success: function (res) {
                console.log(res);

                // Randomizes the recipe from an array of recipes with the desired ingredients
                let num = Math.floor(Math.random() * res.hits.length);
                // Appends recipe data to page
                $("#rResults").removeAttr("style")
                $("#rTitle").append(res.hits[num].recipe.label);
                $("#rImg").attr("src", res.hits[num].recipe.image);
                $("#rLink").attr("href", res.hits[num].recipe.url);
            }
        });
    });

    // Event Listener that adds the desired recipe to the date
    const addRecipe = $("#addRecipe");
    addRecipe.on("click", function (event) {
        event.preventDefault();
        let userRecipe = $("#rTitle").text();
        $("#userRecipe").text(userRecipe);
        $("#food").append(userRecipe);
        $("#date").removeAttr("style");
    });



    // Build Date JS 
    // Event Listener that takes in all of the saved date parameters and does a POST request to send the date to the database under the specific user who created it.
    const buildDate = $("#build");
    buildDate.on("click", function (event) {
        event.preventDefault();
        let day = $("#day").val();
        let recipe = $("#userRecipe").text();
        let movie = $("#userMovie").text();
        let tv = $("#userTv").text();
        let id = $("#userId").text();
        let tvOrMovie = $("#tvOrMovie").text();

        if (tvOrMovie === "movie") {
            $.post(`/api/stayIn/date`, {
                movie: movie,
                day: day,
                recipe: recipe,
                UserId: id,
                stayIn: true
            }).then(function (data) {
                alert("Date saved!");
                console.log(data);
                window.location.replace("/index");
            });
        } else if (tvOrMovie === "tv") {
            $.post(`/api/stayIn/date`, {
                day: day,
                tv: tv,
                recipe: recipe,
                UserId: id,
                stayIn: true
            }).then(function (data) {
                alert("Date saved!");
                console.log(data);
                window.location.replace("/index");
            });
        } else {
            alert("Please select an entertainment for your date.");
        }

    });

    // Restart Button
    const restart = document.querySelectorAll(".restart");
    if (restart) {
        restart.forEach((button) => {
            button.addEventListener("click", (event) => {
                window.location.reload();
            });
        });
    }
});