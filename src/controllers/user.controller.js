const userServices = require('../services/user.service.js');

const getShowByMovieName = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const show = await userServices.getShowByMovieName(req.body);
        res.status(200).json({
            message: "Show fetched successfully",
            success: true,
            data: show
        })
    } catch (error) {
        console.log("Error in fetching show-AdminController:", error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}
const getShowByDate = async (req, res) => {
    try {
        const show = await userServices.getShowByDate(req.body);
        res.status(200).json({
            message: "Show fetched successfully by Date",
            success: true,
            data: show
        })
    } catch (error) {
        console.log("Error in fetching show-AdminController:", error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}
const getShowByCity = async (req, res) => {
    try {
        const show = await userServices.getShowByCity(req.body);
        res.status(200).json({
            message: "Show fetched successfully by City",
            success: true,
            data: show
        })
    } catch (error) {
        console.log("Error in fetching show-AdminController:", error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}
const getShowByCityAndDateAndMovie = async (req, res) => {
    try {
        const show = await userServices.getShowByCityAndDateAndMovie(req.body);
        res.status(200).json({
            message: "Show fetched successfully by City, Date and Movie",
            success: true,
            data: show
        })
    } catch (error) {
        console.log("Error in fetching show-AdminController:", error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}
const getShowDetails = async (req, res) => {
    try {
        const show = await userServices.getShowDetails(req.params.id);
        res.status(200).json({
            message: "Show fetched successfully",
            success: true,
            data: show
        })
    } catch (error) {
        console.log("Error in fetching show-AdminController:", error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

const bookShow = async(req,res)=>{
    try {
        const booking = await userServices.bookShow(req.params.id,req.body);
        res.status(200).json({
            message: "Show booked successfully",
            success: true,
            data: booking
        })
    } catch (error) {
        console.log("Error in booking show-AdminController:", error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

module.exports = {
    getShowByMovieName,
    getShowByDate,
    getShowByCity,
    getShowByCityAndDateAndMovie,
    getShowDetails,
    bookShow
}