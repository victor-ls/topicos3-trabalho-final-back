import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import Parking from "../models/Parking"
import conn from "../../config/dbConnection";
import ParkingSpace from "../models/ParkingSpace.js";
//import ParkingSpaceController from "./ParkingSpaceController";
//let parkingSpace = new ParkingSpaceController();

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

        if (!(name && parkingSpacesTotal)) {
            return res.status(422).json({ message: "Nome e o total de vagas são obrigatórios" })
        }

        try {

            //cria o estacionamento
            const parking = await Parking.create(req.body)

            //cria todas as vagas do estacionamento
            for (var i = 0; i <= parkingSpacesTotal-1; i++) {
                var parkingSpace = new ParkingSpace({
                    isFree: true,
                    numericID: i+1,
                    parkingLot_id: parking._id,
                    history: [],
                })
                console.log(parkingSpace)
                await ParkingSpace.create(parkingSpace)
            }
            

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

    async checkParkingLot_ParkingSpaces(req, res) {

        if (!req.params.id) {
            return res.status(400).json({ message: "É necessário passar o ID do estacionamento" })
        }
        const parkingLotToCheck = await Parking.findOne({
            _id: req.params.id
        })

        if (!parkingLotToCheck) {
            return res.status(422).json({ message: "Estacionamento não encontrado" })
        }

        try {
            const parking = await ParkingSpace.find({ parkingLot_id: req.params.id })
            return res.status(200).json(parking)
        } catch (error) {
            return res.status(500).json({ message: `Erro no servidor! ${error}` })
        }

    }

    async createParkingSpace(req, res) {

        if (!req.params.id) {
            return res.status(400).json({ message: "É necessário passar o ID do estacionamento" })
        }
        const parkingLotToCheck = await Parking.findOne({
            _id: req.params.id
        })

        if (!parkingLotToCheck) {
            return res.status(422).json({ message: "Estacionamento não encontrado" })
        }

        try {

            const parkingSpaces = await ParkingSpace.find({ parkingLot_id: req.params.id })

            var parkingSpace = new ParkingSpace({
                isFree: true,
                numericID: parkingSpaces.length+1,
                parkingLot_id: req.params.id,
                history: [],
            })
            console.log(parkingSpace)
            await ParkingSpace.create(parkingSpace)
            
            return res.status(200).json({ message: "Vaga Criada!" })
        } catch (error) {
            return res.status(500).json({ message: `Erro no servidor! ${error}` })
        }
    }

    async delete(req, res) {
        if (!req.params.id) {
            return res.status(400).json({ message: "É necessário passar o ID do motorista" })
        }
        try {
            await ParkingSpace.deleteMany({
                parkingLot_id: req.params.id
            })
            await Parking.deleteOne({
                _id: req.params.id
            })
        } catch (error) {
            return res.status(500).json({ message: `Erro no servidor! ${error}` })
        }
        return res.json({ message: "O estacionamento foi excluído" })
    }

    async helloWorld(req, res) {
        try {

            return res.status(200).json({ message: "HELLO WORLD" })
        } catch (error) {
            return res.status(500).json({ message: `Erro no servidor! ${error}` })
        }
    }
 

}
/*
if (!req.params.id) {
    return res.status(400).json({ message: "É necessário passar o ID do motorista" })
}

const driverToUpdate = await Driver.findOne({
    _id: req.params.id
})

if (!driverToUpdate) {
    return res.status(422).json({ message: "Motorista não encontrado" })
}

try {
    await Driver.update(req.body)

} catch (error) {
    return res.status(500).json({ message: `Erro no servidor! ${error}` })
}

return res.status(200).json({ message: "Dados do motorista atualizados com sucesso" })
*/


export default new ParkingController()