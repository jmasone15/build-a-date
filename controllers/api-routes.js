// Requiring our models and passport as we've configured it
let db = require("../models");
let passport = require("../config/passport");
const axios = require('axios');

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

  app.get("/api/movies/:movie", function (req, res) {
    db.Movies.findAll({
      where: {
        title: req.params.movie,
      }
    }).then((data) => res.json(data));
  });

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

  app.get("/dates/:id", function (req, res) {
    db.Date.findAll({
      where: {
        userId: req.params.id
      }
    }).then((data) => {
      // console.log(data[0].dataValues);
      res.render("dates", { dates: data });
    });
  });

  app.delete("/dates/:id", function (req, res) {
    db.Date.destroy({
      where: {
        id: req.params.id
      }
    }).then((data) => res.json(data));
  });

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


  app.get("/api/entertainment", function (req, res) {
    console.log("Route hit!!!!!")
    let searchQuery = "Orlando"  // --> req.body.searchVal
    let url = `https://api.yelp.com/v3/businesses/search?location=${searchQuery}`;

    // How are we making the REQUEST to YELP? Makes an async call for data
    const config = {
      headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` }
    };

    axios.get(url, config).then(function (response) {
      console.log("data response here")
      console.log(response);
      res.json(response.data);
    }).catch(function (err) {
      console.log(err);
    });
  });

  app.get('/test', (req, res) => {
    res.send("TESTING");
  });
};