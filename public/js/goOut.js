// console.log("goOut Functionality attached");
// $(document).ready(function () {
//     console.log("stayIn.js loaded");
//    // $('.dropdown-toggle').dropdown()

//     $.get("/api/user_data").then(function (data) {
//         $("#userId").text(data.id);
//         console.log(data.id);
//     });
//     const restaurantSearch = $("#restaurantSearch");
//     restaurantSearch.on("click", function (event) {
//         event.preventDefault();
//         let location = $("input#location").val().trim();
//         let query = $("input#query").val().trim();
//         let modifiedQuery = query.replace(" ", /%20/g);
//         // $.post('/api/entertainment', {
//         //     location: location,
//         //     query: query,

//         // }).then(function (data) {
//         //     console.log(data.businesses.name)
//         //     const url = 
//         // })
//         $.ajax({
//             method: "GET", 
//             dataType: "json",
//             url: `http://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${location}&categories=${modifiedQuery}`,
//             headers: { Authorization: `Bearer AVB06USC7n57m9GkLHC8apkhkkF1ROZLG-ed8_z20UUGbwJ4-toqeS89U_UGS0vFl7sGLj9ktsLH1cikq0w8FaAVlY5CVpluegYiD2W53_e0rNQswN8Z0DPv9owdYHYx` },
//             success: function(res) {
//                 console.log(res)
//             }
//         })
//     })


// })