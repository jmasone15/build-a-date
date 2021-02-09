$(document).ready(function () {
    console.log("stayIn.js loaded");
    $('.dropdown-toggle').dropdown()

    // GET request to grab the user's id so we can assign the date to them.
    $.get("/api/user_data").then(function (data) {
        $("#userId").text(data.id);
        console.log(data.id);
    });

    // Movies Search JS
    const selectMovieBtn = $("#searchMovie");
    selectMovieBtn.on("click", function (event) {
        event.preventDefault();
        $("#select").attr("style", "display: none;");
        $("#movieSearch").removeAttr("style");
    });
    const searchmTitleBtn = $("#searchmTitle");
    searchmTitleBtn.on("click", function (event) {
        event.preventDefault();
        let title = $("input#mtitleInput").val().trim();
        $("#m").removeAttr("style");
        $("#mConfirm").removeAttr("style");

        $.get(`/api/movies/${title}`, function (data) {
            console.log(data);
            if (data.length === 0) {
                alert("No movies found.")
                window.location.reload();
            } else {
                $("#mResults").removeAttr("style")
                $("#mTitle").append(data[0].title);
                $("#mIMDb").append(data[0].IMDb);
                $("#mGenres").append(data[0].genres);
                $("#mYear").append(data[0].year);
            }
        });
    });
    const addMovie = $("#addMovie");
    addMovie.on("click", function (event) {
        event.preventDefault();
        let userMovie = $("input#titleInput").val().trim();
        $("#tvOrMovie").text("movie");
        $("#userMovie").text(userMovie);
        $("#entertain").append(userMovie);
        $("#date").removeAttr("style");
    });



    // TV Show Search JS
    const selectTvBtn = $("#searchTv");
    selectTvBtn.on("click", function (event) {
        event.preventDefault();
        $("#select").attr("style", "display: none;");
        $("#tvSearch").removeAttr("style");
    });
    const searchtTitleBtn = $("#searchTTitle");
    searchtTitleBtn.on("click", function (event) {
        event.preventDefault();
        let title = $("input#ttitleInput").val().trim();
        $("#t").removeAttr("style");
        $("#tConfirm").removeAttr("style");

        $.get(`/api/tv/${title}`, function (data) {
            console.log(data);
            if (data.length === 0) {
                alert("No TV shows found.")
                window.location.reload();
            } else {
                $("#tResults").removeAttr("style")
                $("#tTitle").append(data[0].title);
                $("#selectedTitle").append(data[0].title);
                $("#tIMDB").append(data[0].IMDB);
                $("#tYear").append(data[0].year);
            }
        });
    });
    const netflix = $("#netflix");
    netflix.on("click", function (event) {
        event.preventDefault();
        $("#userStream").text("netflix");
        let userStream = "Netflix"
        streamResults(userStream);
    });
    const hulu = $("#hulu");
    hulu.on("click", function (event) {
        event.preventDefault();
        $("#userStream").text("hulu");
        let userStream = "Hulu"
        streamResults(userStream);
    });
    const prime = $("#prime");
    prime.on("click", function (event) {
        event.preventDefault();
        $("#userStream").text("prime");
        let userStream = "Prime"
        streamResults(userStream);
    });
    const disney = $("#disney");
    disney.on("click", function (event) {
        event.preventDefault();
        $("#userStream").text("disney");
        let userStream = "Disney"
        streamResults(userStream);
    });
    function streamResults(stream) {
        console.log(stream);
        $("#tStream").removeAttr("style");

        $.get(`/api/${stream}/1`, function (data) {
            console.log(data);
            $("#tStreamResults").removeAttr("style")
            for (let i = 0; i < data.length; i++) {
                $("#tStreamResults").append(`
                <a href= "#" class="streamTitle">${data[i].title}</a>
                <p class="tsIMDB"><strong>IMDb Rating: ${data[i].IMDB}</strong></p>
                <br>
                `)
            }

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


    
    // Recipe Search JS
    const foodKey = "0e0296678d63dc0895ac10e48c8b9d7a";
    const foodId = "196d44a2";
    const searchRecipeBtn = $("#searchRecipe");
    searchRecipeBtn.on("click", function (event) {
        event.preventDefault();
        let ingredients = $("input#ingredientInput").val().trim();
        $("#r").removeAttr("style");
        $("#rConfirm").removeAttr("style");

        $.ajax({
            type: "GET",
            url: `https://api.edamam.com/search?q=${ingredients}&app_id=${foodId}&app_key=${foodKey}&from=0&to=100`,
            success: function (res) {
                console.log(res);
                let num = Math.floor(Math.random() * res.hits.length);
                $("#rResults").removeAttr("style")
                $("#rTitle").append(res.hits[num].recipe.label);
                $("#rImg").attr("src", res.hits[num].recipe.image);
                $("#rLink").attr("href", res.hits[num].recipe.url);
            }
        });
    });
    const addRecipe = $("#addRecipe");
    addRecipe.on("click", function (event) {
        event.preventDefault();
        let userRecipe = $("#rTitle").text();
        $("#userRecipe").text(userRecipe);
        $("#food").append(userRecipe);
        $("#date").removeAttr("style");
    });

    // Build Date JS
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