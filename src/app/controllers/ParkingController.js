import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import Parking from "../models/Parking"
import conn from "../../config/dbConnection";

mongoose.connect(conn.url);
autoIncrement.initialize(mongoose);

class ParkingController {
    async index(req, res) {
        try {
            const parking = await Parking.find()

            return res.status(200).json(parking)
        } catch (error) {
            return res.status(500).json({ message: `Erro no servidor! ${error}` })
        }
    }

    async store(req, res) {
        console.log('entrou')
        const { name, parkingSpacesTotal, parkingSpacesOccupied } = req.body
        console.log('entrou')

        const parking = await Parking.findOne({ _id: req.params.id }).select('-_id')

        if (parking) {
            return res.status(400).json({ message: "Motorista já está cadastrado" })
        }

        if (!(name && parkingSpacesTotal && parkingSpacesOccupied)) {
            return res.status(422).json({ message: "Nome, total de vagas e total de vagas ocupadas são obrigatórios" })
        }

        try {
            const parking = await Parking.create(req.body)

            return res.status(201).json(parking)
        } catch (error) {
            return res.status(500).json({ message: `Erro no servidor! ${error}` })
        }
    }

    async checkParkingLot(req, res) {
        try {
            const parking = await Parking.findOne({ _id: req.params.id })

            return res.status(200).json(parking)
        } catch (error) {
            return res.status(500).json({ message: `Erro no servidor! ${error}` })
        }
    }
}


export default new ParkingController()