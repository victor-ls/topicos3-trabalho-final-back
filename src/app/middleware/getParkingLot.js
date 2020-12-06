import Parking from "../models/Parking.js"

const getParkingLot = async (req, res, next) => {

    try {
        const parkingLot = await Parking.findOne({ _id: req.params.parkingLotId })
        console.log(parkingLot)
        req.parkingLot = parkingLot

        next()

    } catch (error) {
        return res.status(500).json({ message: `Erro no servidor! ${error}` })
    }
}

module.exports = getParkingLot