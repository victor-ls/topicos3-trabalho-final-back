import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import Driver from "../models/ParkingSpace.js"
import conn from "../../config/dbConnection";

mongoose.connect(conn.url);
autoIncrement.initialize(mongoose);

class ParkingSpaceController {
    async index(req, res) {
        try {
            const parkingPlace = await parkingPlace.findOne({ _id: req.params.id })

            return res.status(200).json(driver)
        } catch (error) {
            return res.status(500).json({ message: `Erro no servidor! ${error}` })
        }
    }