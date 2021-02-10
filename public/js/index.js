$(document).ready(function () {
  console.log('member.js loaded')
  // Sets up event listener to take user to their specific date paged based on who is logged in.
  const viewDatesLink = $(".viewDates");

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $("#member-name").text(`Welcome, ${data.email}`);
    $("#userId").append(data.id);
    console.log(data.id);
    viewDatesLink.attr("href", `dates/${data.id}`)
  });
});
