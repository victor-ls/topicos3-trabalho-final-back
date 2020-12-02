import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

import conn from "../../config/dbConnection";

mongoose.connect(conn.url);
autoIncrement.initialize(mongoose);

const ParkingSchema = new mongoose.Schema(
    {
        totalParkingPlaces: {
            type: Number,
            required: true
        },

        occupiedParkingPlaces: {
            type: Number,
            required: true
        },
        totalOccupiedParkingPlaces: {
            type: Number,
            required: true
        }
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