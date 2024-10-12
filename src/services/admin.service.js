const { Movie } = require("../models/movie.js");
const { Show } = require("../models/show.js");
const { CinemaHall } = require("../models/cinemaHalls.js");
const { Cinema } = require("../models/cinema.js");
const { Seat } = require("../models/Seat.js");
class AdminServices {

    async createMovie(data) {
        try {

            console.log("Data:", data);
            let check = await Movie.findOne({ title: data.title.trim() });
            if(check){
                return check;
            }
            let movie = await Movie.create([data]);
            return movie;

        } catch (error) {
            console.log("Error in creating movie-AdminServiceLayer:", error);
        }
    }
    async createCinemaHall(data){
        try {
            const cinema = await Cinema.findOne({ name: data.cinemaName.trim() ,city:data.city.trim()});
            console.log("Cinema:",cinema);
            const cinemaHall = await CinemaHall.create({
                name:data.cinemaHallName,
                cinemaId:cinema._id,
            });
            return cinemaHall;
        } catch (error) {
            console.log("Error in creating cinema hall-AdminServiceLayer:", error);
        }
    }
    async createCinema(data) {
        try {
            let check = await Cinema.findOne({ name: data.cinemaName.trim() ,city:data.city.trim()});
            if(check){
                return check
            }
            const cinema = await Cinema.create({
                name: data.cinemaName,
                city: data.city,
            });
            console.log("Cinema:", cinema);
            return cinema;
        } catch (error) {
            console.log("Error in creating cinema-AdminServiceLayer:", error);
        }
    }

    async createShow(data) {
        try {
            console.log("Data:", data);
            let movie = await Movie.findOne({ title: data.movieName.trim() });
            let cinema = await Cinema.findOne({ name: data.cinemaName.trim() ,city:data.city.trim()});

            if (!movie) {
                throw new Error("Movie not found");
            }
            if (!cinema) {
                throw new Error("Cinema not found");
            }
            let cinemaHall = await CinemaHall.findOne({ name: data.cinemaHallName.trim() },{cinemaId:cinema._id});

            if (!cinemaHall) {
                throw new Error("Cinema not found");
            }
            const tempShow = await Show.create({
                movieId: movie._id,
                cinemaId: cinema._id,
                cinemaHallId: cinemaHall._id,
                date: new Date(data.date),
                startTime: new Date(data.startTime),
                endTime: new Date(data.endTime),
            });

            const seats = await Seat.insertMany(
                data.seats.map((seat)=>{
                    return {
                        seatNo:seat.seatNo,
                        status:seat.status,
                        price:seat.price,
                        showId:tempShow._id
                    }
                })
            )
            const seatIds = seats.map(seat=>seat._id);
            const show = Show.findByIdAndUpdate(tempShow._id,{seats:seatIds},{new:true});
            return show;

        } catch (error) {
            console.log("Error in creating show-AdminServiceLayer:", error);
        }
    }

    async deleteShow(id) {
        try {
            const show = await Show.findByIdAndDelete(id);
            return show;
        } catch (error) {
            console.log("Error in deleting show-AdminServiceLayer:", error);
        }
    }

    async deleteShowByMovieName(data){
        try {
            console.log(data.movieName);
            const movie = await Movie.findOne({title:data.movieName});
            console.log("Movie:",movie._id);console.log("Movie:",movie);
            const shows = await Show.find({movieId:movie._id})
            shows.forEach(async (show)=>{
                const deletedShow = await Show.findByIdAndDelete(show._id);
                console.log("Deleted Show:",deletedShow);
            })
            return shows;
        } catch (error) {
            console.log("Error in deleting show by movie name-AdminServiceLayer:", error);
            throw new Error(error.message)
        }
    }

    async getCinemaHalls(data){
        try {
            const cinema = await Cinema.findOne({name:data.cinemaName ,city:data.city});
            const cinemaHalls = await CinemaHall.find({cinemaId:cinema._id});
            console.log("Cinema Halls:",cinemaHalls);
            return cinemaHalls;
        } catch (error) {
            console.log("Error in getting cinema halls-AdminServiceLayer:", error);
            throw new Error(error.message)
            
        }
    }
    async updateShowSeats(id,data){
        try {
            const seats = await Seat.insertMany(
                data.seats.map((seat)=>{
                    return {
                        seatNo:seat.seatNo,
                        status:seat.status,
                        price:seat.price,
                        showId:id
                    }
                })
            )
            const seatIds = seats.map(seat=>seat._id);
            console.log("SeatIds:",seatIds);
            const show = await Show.findByIdAndUpdate(id,{seats:seatIds},{new:true});
            console.log("Show:",show);
            return show;
        } catch (error) {
            console.log("Error in updating show-AdminServiceLayer:", error);
            throw new Error(error.message)
            
        }
    }
};
const adminServices = new AdminServices();
module.exports = adminServices;
