const adminServices = require('../services/admin.service.js');

const createMovie = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const movie = await adminServices.createMovie(req.body);
        res.status(201).json({
            message: "Movie created successfully",
            success: true,
            data: movie
        });

    } catch (error) {
        console.log("Error in creating movie-AdminController:", error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

const createCinema = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const cinema = await adminServices.createCinema(req.body)
        res.status(201).json({
            message: "Cinema created successfully",
            success: true,
            data: cinema
        })
    } catch (error) {
        console.log("Error in creating cinema-AdminController:", error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

const createShow = async (req, res) => {
    try {
        const show = await adminServices.createShow(req.body);
        console.log("Show:", show);
        res.status(201).json({
            message: "Show created successfully",
            success: true,
            data: show
        });

    } catch (error) {
        console.log("Error in creating show-AdminController:", error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

const createCinemaHall = async (req, res) => {
    try {
        const cinemaHall = await adminServices.createCinemaHall(req.body);
        res.status(201).json({
            message: "Cinema Hall created successfully",
            success: true,
            data: cinemaHall
        })
    } catch (error) {
        console.log("Error in creating cinema hall-AdminController:", error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}
const deleteShow = async (req, res) => {
    try {
        const deletedShow = await adminServices.deleteShow(req.params.id);
        res.status(200).json({
            message: "Show deleted successfully",
            success: true,
            data: deletedShow
        })
    } catch (error) {
        console.log("Error in deleting show-AdminController:", error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }

}
const deleteShowByMovieName = async(req,res) => {
    try {
        const deletedShows = await adminServices.deleteShowByMovieName(req.body);
        res.status(200).json({
            message: "Show deleted successfully",
            success: true,
            data: deletedShows
        })
    } catch (error) {
        console.log("Error in deleting show-AdminController:", error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}
const getCinemaHalls = async(req,res) => {
    try {
        const cinemaHalls = await userServices.getCinemaHalls(req.body);
        res.status(200).json({
            message: "Cinema Halls fetched successfully",
            success: true,
            data: cinemaHalls
        })
    } catch (error) {
        console.log("Error in fetching cinema halls-AdminController:", error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

const updateShowSeats = async(req,res) => {
    try {
        const id = req.params.id;
        const show = await adminServices.updateShowSeats(id,req.body);
        res.status(200).json({
            message: "Show seats updated successfully",
            success: true,
            data: show
        })
    } catch (error) {
        console.log("Error in updating show seats-AdminController:", error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

module.exports = { 
    
    createMovie, createCinema, 
    createShow, deleteShow, getCinemaHalls, 
    deleteShowByMovieName ,createCinemaHall,
    updateShowSeats
};