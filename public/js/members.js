$(document).ready(function() {
  console.log('member.js loaded')
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  let searchBtnTv = $("#searchBtnTv");

  searchBtnTv.on("click", function(event){
    event.preventDefault();
    let userInput = $("input#tvsearch").val().trim();
    console.log(userInput);
  
    
    $.get(`/api/${userInput}`, function(data){
      console.log(data);
      $("#tvInfo").append("<h4>Title: " + data[0].title + "<h4>");
      $("#tvInfo").append("<h4>Year: " + data[0].year + "<h4>");
    });

    $.get(`/api/${userInput}/1`, function(data){
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        $("#tvInfo").append("<h3>Title: " + data[i].title + "<h3>");
        $("#tvInfo").append("<h4>Year: " + data[i].year + "<h4>");
        
      }
      
    });

   
  });


});
