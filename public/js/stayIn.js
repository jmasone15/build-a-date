$(document).ready(function () {
    console.log("stayIn.js loaded");

    // GET request to grab the user's id so we can assign the date to them.
    $.get("/api/user_data").then(function (data) {
        $("#userId").text(data.id);
        console.log(data.id);
    });

    const searchTitleBtn = $("#searchTitle");
    searchTitleBtn.on("click", function (event) {
        event.preventDefault();
        let title = $("input#titleInput").val().trim();
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
        $("#userMovie").text(userMovie);
        $("#entertain").append(userMovie);
        $("#date").removeAttr("style");
    });

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

    const buildDate = $("#build");
    buildDate.on("click", function (event) {
        event.preventDefault();
        let day = $("#day").val();
        let recipe = $("#userRecipe").text();
        let movie = $("#userMovie").text();
        let id = $("#userId").text();

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
    });
});







const restart1 = $("#restart1");
restart1.on("click", function () {
    window.location.reload();
});
const restart2 = $("#restart2");
restart2.on("click", function () {
    window.location.reload();
});
const restart3 = $("#restart3");
restart3.on("click", function () {
    window.location.reload();
});