// Requiring our models and passport as we've configured it
let db = require("../models");
let passport = require("../config/passport");
const axios = require('axios');
const { Sequelize } = require("../models");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // Movie Routes
  // Route to get a specific movie
  app.get("/api/movies/:movie", function (req, res) {
    db.Movies.findAll({
      where: {
        title: req.params.movie,
      }
    }).then((data) => res.json(data));
  });

  // Route to get movies on Netflix
  app.get("/api/movie/netflix/:Netflix", function (req, res) {
    db.Movies.findAll({
      limit: 5,
      order: Sequelize.literal('rand()'),
      where: {
        netflix: req.params.Netflix,
      },

    }).then((data) => {
      res.json(data);
    });
  });

  // Route to get movies on Hulu
  app.get("/api/movie/hulu/:Hulu", function (req, res) {
    db.Movies.findAll({
      limit: 5,
      order: Sequelize.literal('rand()'),
      where: {
        hulu: req.params.Hulu,
      },

    }).then((data) => {
      res.json(data);
    });
  });

  // Route to get movies on Amazon Prime
  app.get("/api/movie/prime/:Prime", function (req, res) {
    db.Movies.findAll({
      limit: 5,
      order: Sequelize.literal('rand()'),
      where: {
        prime_video: req.params.Prime,
      },

    }).then((data) => {
      res.json(data);
    });
  });

  // Route to get movies on Disney Plus
  app.get("/api/movie/disney/:Disney", function (req, res) {
    db.Movies.findAll({
      limit: 5,
      order: Sequelize.literal('rand()'),
      where: {
        disney_plus: req.params.Disney,
      },

    }).then((data) => {
      res.json(data);
    });
  });

  // Tv Show Routes
  // Route to get a specific TV Show
  app.get("/api/tv/:title", function (req, res) {
    db.Tv.findAll({
      where: {
        title: req.params.title
      }
    }).then((data) => res.json(data));
  });

  // Route to get TV Shows on Netflix
  app.get("/api/tv/netflix/:Netflix", function (req, res) {
    db.Tv.findAll({
      limit: 5,
      order: Sequelize.literal('rand()'),
      where: {
        Netflix: req.params.Netflix,
      },

    }).then((data) => {
      res.json(data);
    });
  });

  // Route to get TV Shows on Hulu
  app.get("/api/tv/hulu/:Hulu", function (req, res) {
    db.Tv.findAll({
      limit: 5,
      order: Sequelize.literal('rand()'),
      where: {
        Hulu: req.params.Hulu,
      },

    }).then((data) => {
      res.json(data);
    });
  });

  // Route to get TV Shows on Prime Video
  app.get("/api/tv/prime/:Prime", function (req, res) {
    db.Tv.findAll({
      limit: 5,
      order: Sequelize.literal('rand()'),
      where: {
        Prime: req.params.Prime,
      },

    }).then((data) => {
      res.json(data);
    });
  });

  // Route to get TV Shows on Disney Plus
  app.get("/api/tv/disney/:Disney", function (req, res) {
    db.Tv.findAll({
      limit: 5,
      order: Sequelize.literal('rand()'),
      where: {
        Disney: req.params.Disney,
      },

    }).then((data) => {
      res.json(data);
    });
  });

  
  // Date Routes
  // Route to create a new date
  app.post("/api/stayin/date", function (req, res) {
    db.Date.create({
      movie: req.body.movie,
      day: req.body.day,
      tv: req.body.tv,
      recipe: req.body.recipe,
      UserId: req.body.UserId,
      stayIn: req.body.stayIn
    }).then((data) => res.json(data));
  });

  // Route to get all dates under a specific user
  app.get("/dates/:id", function (req, res) {
    db.Date.findAll({
      where: {
        userId: req.params.id
      }
    }).then((data) => {
      res.render("dates", { dates: data });
    });
  });

  // Route to remove a date 
  app.delete("/dates/:id", function (req, res) {
    db.Date.destroy({
      where: {
        id: req.params.id
      }
    }).then((data) => res.json(data));
  });

  // Route to update a date
  app.put("/dates/update/:id", function (req, res) {
    db.Date.update(
      {
        completed: true
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then((data) => res.json(data));
  });


  app.post("/api/entertainment", function (req, res) {
    console.log("Route hit!!!!!");
    // Verify we are grabbing the data from the form submission
    console.log(`Request Body:`);
    console.log(req.body)

    let searchQuery = req.body.location  // --> req.body.location
    let query = req.body.query;
    let modifiedQuery = query.replace(" ", /%20/g);
    let url = `https://api.yelp.com/v3/businesses/search?location=${searchQuery}&categories=${modifiedQuery}`;
    //let url = `https://api.yelp.com/v3/businesses/search?location=${searchQuery}&type=${modifiedQuery}`;
    console.log(`URL: ${url}`);
    // How are we making the REQUEST to YELP? Makes an async call for data
    const config = {
      headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` }
    };

    axios.get(url, config).then(function (response) {
      console.log("data response here")
      //console.log(response);

      // How do we pull out the most relevant information from the RESPONSE
      let results = [];
      let data = response.data.businesses; // ARRAY datatype
      for (let i = 0; i < 4; i++) {
        results.push(data[i])
      }

      console.log(results)
      res.json(results)
      // Pass the top 4 results to the VIEW

      // -- In the view -- //




    }).catch(function (err) {
      console.log(err);
    });
  });

  app.get('/test', (req, res) => {
    res.send("TESTING");
  });
};