import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import Driver from "../models/Driver"
import conn from "../../config/dbConnection";

mongoose.connect(conn.url);
autoIncrement.initialize(mongoose);

const ParkingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        cnpj: {
            type: Number,
            required: true
        },
        parkingSpacesTotal: {
            type: Number,
            required: true
        },
        parkingSpacesOccupied: {
            type: Number,
            required: true
        },

    },
    {
        versionKey: false,
        timestamps: true,
    }
);

ParkingSchema.plugin(autoIncrement.plugin, {
    model: "Parking",
    field: "id",
    startAt: 1,
    incrementBy: 1,
});

export default mongoose.model("Parking", ParkingSchema);