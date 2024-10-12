const { Movie } = require("../models/movie.js");
const { Show } = require("../models/show.js");
const { CinemaHall } = require("../models/cinemaHalls.js");
const { Cinema } = require("../models/cinema.js");
const { Seat } = require("../models/Seat.js");
const {Booking} = require("../models/booking.js")
const mongoose = require("mongoose")
class UserServices{
    async getShowByMovieName(data){
        try {
            const movie = await Movie.findOne({title:data.movieName});
            const shows = await Show.find({movieId:movie._id}).populate("movieId").populate("cinemaId").populate("cinemaHallId");
            console.log("Shows:",shows);
            shows.forEach((show)=>{
                console.log("show")
            })
            return shows;
        } catch (error) {
            console.log("Error in getting show by movie name-AdminServiceLayer:", error);
            throw new Error(error.message)
        }
    }
    async getShowByDate(data){
        try {
            const shows = await Show.find({date:data.date}).populate("movieId").populate("cinemaId").populate("cinemaHallId");
            console.log("Shows:",shows);
            return shows;
        } catch (error) {
            console.log("Error in getting show by date-AdminServiceLayer:", error);
            throw new Error(error.message)
        }
    }
    async getShowByCity(data){
        try {
            const cinemas = await Cinema.find({city:data.city});
            console.log("Cinemas:",cinemas);
            let allShows =[];
            for(const cinema of cinemas){
                const shows = await Show.find({cinemaId:cinema._id}).populate("movieId").populate("cinemaId");
                allShows.push(shows);
                console.log("Shows:",shows);
            }
            allShows.pop();
            console.log("Shows:",allShows);
            return allShows;
        }
        catch (error) {
            console.log("Error in getting show by city-AdminServiceLayer:", error);
            throw new Error(error.message)
        }
    }
    async getShowByCityAndDateAndMovie(data){
        try {
            const movie = await Movie.findOne({title:data.movieName});
            const cinemas = await Cinema.find({city:data.city});
            let allShows=[];
            for(const cinema of cinemas){
                const shows = await Show.find({cinemaId:cinema._id,date:data.date,movieId:movie._id}).populate("movieId").populate("cinemaId").populate("cinemaHallId");
                if(shows) allShows.push(shows);
            }
            allShows.pop()
            console.log("AllShows:",allShows);
            return allShows;
        } catch (error) {
            console.log("Error in getting particular show-AdminServiceLayer:", error);
            throw new Error(error.message)
        }
    }

    async getShowDetails(id){
        try {
            const seatsCollection = await Seat.find({showId:id});
            for(const seat of seatsCollection){
                console.log("Seat:",seat.status,seat.seatNo,seat.price);
            }
            return seatsCollection;

        } catch (error) {
            console.log("Error in getting show by id-AdminServiceLayer:", error);
            throw new Error(error.message)
            
        }
    }
    async bookShow(id, data) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const seatIds = data.seatIds;
    
            // Check if seats are available
            for (const seatId of seatIds) {
                console.log("SeatId:", seatId);
                console.log("ShowId:", id);
                const seat = await Seat.findOne({ _id: seatId, showId: id }).session(session);
                if (!seat) throw new Error("Seat not found");
                if (seat.status === "booked") {
                    throw new Error("One or more seats are not available (already booked)!");
                }
                if (seat.status === "locked") {
                    const currentTime = new Date();
                    const seatUpdatedAt = new Date(seat.updatedAt);
                    const diffInMinutes = (currentTime - seatUpdatedAt) / (1000 * 60);
                    if (diffInMinutes > 10) {
                        throw new Error("One or more seats are locked and unavailable!");
                    }
                }
            }
    
            // Lock the seats temporarily for booking
            let costOfTickets = 0;
            for (const seatId of seatIds) {
                const seat = await Seat.findByIdAndUpdate(seatId, { status: "locked" }, { session, new: true });
                costOfTickets += seat.price;
                console.log("seat status:", seat.status);
            }
    
            // Confirm booking by marking seats as "booked"
            for (const seatId of seatIds) {
                await Seat.findByIdAndUpdate(seatId, { status: "booked" }, { session, new: true });
            }
    
            const numberOfSeats = seatIds.length;
    
            // Create the booking
            const booking = await Booking.create([{
                numberOfSeats: numberOfSeats,
                bookingStatus: "successful",
                price: costOfTickets,
                seatIds: seatIds,
                showId: id
            }], { session });
    
            // Commit transaction
            await session.commitTransaction();
            session.endSession();
    
            console.log("Booking:", booking);
            return booking;
    
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.log("Error booking show:", error);
            throw new Error(error.message);
        }
    }
    
};

const userServices = new UserServices();
module.exports = userServices ;