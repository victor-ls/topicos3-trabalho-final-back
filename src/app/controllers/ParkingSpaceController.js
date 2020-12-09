import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import ParkingSpace from "../models/ParkingSpace.js"
import Parking from "../models/Parking"
import conn from "../../config/dbConnection";

mongoose.connect(conn.url);
autoIncrement.initialize(mongoose);

class ParkingSpaceController {
    async index(req, res) {
        try {
            const parkingPlace = await ParkingSpace.findOne()//{ parkingLot.id: req.params.id })

            return res.status(200).json(parkingPlace)
        } catch (error) {
            return res.status(500).json({ message: `Erro no servidor! ${error}` })
        }
    }

    async storeMany(qdt, id) {
        for (var i = 0; i <= qdt; i++) {
            var parkingSpace = new ParkingSpace({
                isFree: true,
                numericID: i+1,
                parkingLot_id: id,
                history: [],
            })
            console.log(parkingSpace)
            await ParkingSpace.create(parkingSpace)
        }

    }


    /*
        async storeMany(req, res) {
        console.log(req.body)
        //const { isFree } = req.body
        console.log(req.parkingLot)

        try {
            for (var i = 0; i <= req.params.numberOfSpaces; i++) {
                var parkingSpace = new ParkingSpace({
                    ...req.body,
                    parkingLot: req.parkingLot
                })
                console.log(parkingSpace)
                await ParkingSpace.create(parkingSpace)
            }
            return res.status(200).json({ message: "Vagas criadas" })
        } catch (error) {
            return res.status(500).json({ message: `Erro no servidor! ${error}` })

        }
    }
    */

}

export default new ParkingSpaceController()