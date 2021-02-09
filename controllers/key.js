// Yelp API to get businesses in Orlando.
var settings = {
  "url": "https://api.yelp.com/v3/businesses/search?location=Orlando",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "Bearer AVB06USC7n57m9GkLHC8apkhkkF1ROZLG-ed8_z20UUGbwJ4-toqeS89U_UGS0vFl7sGLj9ktsLH1cikq0w8FaAVlY5CVpluegYiD2W53_e0rNQswN8Z0DPv9owdYHYx"
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

