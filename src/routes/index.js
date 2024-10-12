const router = require("express").Router();

const { createMovie, createCinema, getCinemaHalls, 
    createShow ,deleteShow ,deleteShowByMovieName,createCinemaHall,updateShowSeats,
} = require("../controllers/admin.controller.js");

const {
    getShowByMovieName,
    getShowByDate,
    getShowByCity,
    getShowByCityAndDateAndMovie,
    getShowDetails,bookShow
} = require("../controllers/user.controller.js");

//checking if router is  working
router.route("/").get((req, res) => {
    res.send("BookYourShow route is working");
});

//Routes for Admin

//create a movie
router.route("/movie").post(createMovie);

//create a cinema

router.route("/cinema").post(createCinema);

//create a cinema hall
router.route("/cinemaHall").post(createCinemaHall);

//create a show
router.route("/show").post(createShow);

//cancelling or deleting a show
router.route("/delete-show/:id").delete(deleteShow);

//delete show by movie name
router.route("/delete-show-movie").delete(deleteShowByMovieName);

//update show seats
router.route("/show/:id").put(updateShowSeats);

//get cinema halls
router.route("/cinemaHalls").get(getCinemaHalls);


/**User Routes**/
//get shows by movie name
router.route("/shows/movie").get(getShowByMovieName);

//get shows by date
router.route("/shows/date").get(getShowByDate);

//get shows by city
router.route("/shows/city").get(getShowByCity);

//get Particular show by date, movie and city
router.route("/shows/date-movie-city").get(getShowByCityAndDateAndMovie);

router.route("/show/:id").get(getShowDetails);

router.route("/show/booking/:id").post(bookShow);
module.exports = router;
